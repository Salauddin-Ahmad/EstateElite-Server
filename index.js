const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// image uploader for express
// const multer = require("multer");
// const path = require('path');
// const fs = require("fs");

const port = process.env.PORT || 5000;

// Ensure the uploads directory exists
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// Set up Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Directory where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filename
//   },
// });

// Initialize Multer with the storage configuration
// const upload = multer({ storage: storage });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
  origin: [
    "*",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://estateelite-fdfad.web.app",
    "https://estateelite-fdfad.firebaseapp.com"
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iu3pv7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // MARK: COLLECTION
    const userCollection = client.db("EstateElite").collection("users");
    const propertyCollection = client
      .db("EstateElite")
      .collection("Properties");
    const reviewCollection = client.db("EstateElite").collection("reviews");
    const wishlistCollection = client
      .db("EstateElite")
      .collection("wishlisted");
    const propertyBought = client.db("EstateElite").collection("bought");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;

      const tokenPayload = {
        email: user.email,
        displayName: user.displayName, // Ensure displayName is included
      };
      const token = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    });

    // middleware
    const verifyToken = (req, res, next) => {
      console.log("inside verify token", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // use verify admin after verifytoken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      next();
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
    };

    // verify agent middleware
    const verifyAgent = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAgent = user?.role === "agent";
      if (!isAgent) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // MARK: User Related

    // post reviews with property id for reference
    app.post("/propertieReview", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      console.log(result);
      res.send(result);
    });

    // MARK:REVIEWS
    // get the reviews matched by id for that specific property
    app.get("/reviews/:id", async (req, res) => {
      const propertyId = req.params.id;
      const query = { propertyId: propertyId };
      const reviews = await reviewCollection.find(query).toArray();
      console.log(reviews);
      res.send(reviews);
    });

    app.get("/allReviews/:email", async (req, res) => {
      const email = req.params.email;
      const reviews = await reviewCollection.find({ email: email }).toArray();
      res.send(reviews);
    });

    // delete single review by Id
    app.delete("/deleteReviews/:id", async (req, res) => {
      const reviewId = req.params.id;
      const query = { _id: new ObjectId(reviewId) };
      const result = await reviewCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    // post wishlisted properties
    app.post("/propertiesWishlist/:email", async (req, res) => {
      try {
        const wishlist = req.body;
        const email = req.params.email;
        const propertieId = wishlist.propertieId;

        console.log(propertieId);

        const existingWishlistProperty = await wishlistCollection.findOne({
          propertieId,
          email,
        });

        const existingBoughtProperty = await propertyBought.findOne({
          propertieId,
          email,
        });

        if (existingWishlistProperty || existingBoughtProperty) {
          // Property already exists in one of the collections for this user
          res.status(406).send({
            message:
              "This property is already in your wishlist or has been bought.",
          });
          return;
        }

        // Insert the new wishlist entry
        const result = await wishlistCollection.insertOne(wishlist);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error adding to wishlist", error });
      }
    });

    app.get("/wishlist/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const wishlists = await wishlistCollection.find(query).toArray();
      console.log(wishlists)
      res.send(wishlists);
    });


    // get single wishlisted item by id
    app.get("/wishlisted/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { propertieId: id };
      const wishlist = await wishlistCollection.findOne(query);
      // console.log(wishlist)
      res.send(wishlist);
    });

    // delete wishlisted items with id
    app.delete("/wishlistdelete/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { propertieId: id };
      console.log(id);
      console.log(query);
      const result = await wishlistCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });

    // MARK:property bought

    // post all the offered properties to propertyBought collection
    app.post("/propertyOffers", async (req, res) => {
      const bought = req.body;
      const result = await propertyBought.insertOne(bought);
      console.log(result);
      res.send(result);
    });

    // get all the propertyBought for user
    app.get("/propertyBought/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { buyerEmail: email };
      const bought = await propertyBought.find(query).toArray();
      console.log(bought)
      res.send(bought);
    });

    // get all rquested properties associated with a specific agent's email
    app.get("/propertyBoughts/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      try {
        // Query to filter by agentEmail
        const query = { agentEmail: email };
        const properties = await propertyBought.find(query).toArray();

        // Send the filtered data
        res.send(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).send({ error: "Failed to fetch properties." });
      }
    });


    // accepted rejected check
    app.patch("/requestedProp", async (req, res) => {
      const { id, propertieId, status } = req.body;
      try {
        // Find the property with the given id and propertieId
        const property = await propertyBought.findOne({ Id: id, propertieId });

        if (!property) {
          return res.status(404).json({ message: "Property not found" });
        }

        // Update the status of the specific property
        await propertyBought.updateOne({ Id: id }, { $set: { status } });

        if (status === "accepted") {
          // Reject other properties with the same propertieId and different buyerEmail
          await propertyBought.updateMany(
            {
              propertieId: propertieId,
              buyerEmail: { $ne: property.buyerEmail },
            },
            { $set: { status: "rejected" } }
          );
        }

        res.status(200).json({ message: "Status updated successfully" });
      } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
      }
    });

    // get all users from db for showing
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });


    // get a user info by email from db
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const result = await userCollection.findOne({ email })
      res.send(result)
    })

    // save the  user on db
    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesn't exist
      // you can do this many ways (1. email unique, 2. upsert
      // 3. simple checking

      const query = { emails: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // MARK:ADMIN rleated

    // check if the user is admin or not
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    // set the admin
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: { role: "admin" },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    // delete a user from the db
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // updating verication satuts with admin
    app.patch(
      "/updateStatus/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const { verificationStatus } = req.body;
        console.log(
          `Updating property ID: ${id} to status: ${verificationStatus}`
        ); // Log data being received
        const filter = { _id: new ObjectId(id) };
        const update = { $set: { verificationStatus } };
        const result = await propertyCollection.updateOne(filter, update);
        console.log("Update result:", result);
        if (result.modifiedCount === 1) {
          res.send({ success: true, message: "Property status updated" });
        } else {
          res.status(400).send({
            success: false,
            message: "Failed to update property status",
          });
        }
      }
    );

    // get all the reviews
    app.get("/reviewsAll", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Patch route to update a property by _id for advertisement
    app.patch("/properties/:id", async (req, res) => {
      const { id } = req.params;
      const updateData = req.body;

      try {
        // Find the property by _id and update it with new values from req.body
        const result = await propertyCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Property not found" });
        }
        res
          .status(200)
          .send({ message: "Property updated successfully", result });
      } catch (error) {
        console.error("Error updating property", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // Get route to fetch advertised properties by advertiser email
    app.get("/advertised", async (req, res) => {
      try {
        const properties = await propertyCollection
          .find({ "advertisement": "true" })
          .limit(9)
          .toArray();
        res.send(properties);
        console.log(properties)
      } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // MARK:Agent
    // set the agent
    app.patch("/users/agent/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "agent",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Check if agent or not
    app.get("/users/agent/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let agent = false;
      if (user) {
        agent = user?.role === "agent";
      }
      res.send({ agent });
    });

    // Add Property || all commented codes are replaced with imgbb from multer
    app.post(
      "/add-property",
      verifyToken,
      verifyAgent,
      // upload.single("propertyImage"),
      async (req, res) => {
        try {
          const {
            title,
            location,
            priceRangeMin,
            priceRangeMax,
            agentName,
            verificationStatus,
            agentImage,
            propertyImage,
          } = req.body;
          const agentEmail = req.decoded.email;
          // const propertyImage = req.file ? req.file.path : "";
          // const propertyImage = req.file ? `/uploads/${req.file.filename}` : "";

          const newProperty = {
            title,
            location,
            propertyImage,
            agentImage,
            verificationStatus,
            agentName,
            agentEmail,
            priceRangeMin: parseFloat(priceRangeMin),
            priceRangeMax: parseFloat(priceRangeMax),
          };

          const result = await propertyCollection.insertOne(newProperty);
          res.send(result);
        } catch (error) {
          res.status(500).json({ message: "Error adding property", error });
        }
      }
    );

    // delete properties
    app.delete(
      "/deleteProperty/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await propertyCollection.deleteOne(query);
        res.send(result);
      }
    );

    // get all properties
    app.get("/properties", verifyToken, async (req, res) => {
      const result = await propertyCollection.find().toArray();
      res.send(result);
    });

    // get all properties which is verified
    app.get("/propertiesVerified", async (req, res) => {
      const result = await propertyCollection
        .find({ verificationStatus: "verified" })
        .toArray();
      res.send(result);
    });

    // get one property by id
    app.get("/propertie/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertyCollection.findOne(query);
      res.send(result);
    });

    // update the propertie by id
    app.patch(
      "/updateProperty/:id",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: req.body,
        };
        const result = await propertyCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Estate Server is running ");
});

app.listen(port, () => {
  console.log(`Estate Server is sitting on port ${port}`);
});
