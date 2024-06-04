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
  origin: ["http://localhost:5173", "http://localhost:5174"],
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
    const propertyCollection = client.db("EstateElite").collection("Properties");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;

      const tokenPayload = {
        email: user.email,
        displayName: user.displayName // Ensure displayName is included
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

    // user related api
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // save the  user on db
    app.post("/users", async (req, res) => {
      const user = req.body;
      // insert email if user doesn't exist
      // you can do this many ways (1. email unique, 2. upsert
      // 3. simple checking

      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // MARK:ADMIN

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
      }
    );

    // Add Property || all commented codes are replaced with imgbb from multer
    app.post(
      "/add-property",
      verifyToken,
      verifyAgent,
      // upload.single("propertyImage"),
      async (req, res) => {
        try {
          const { title, location, priceRangeMin, priceRangeMax, verificationStatus, agentImage, image_url } = req.body;
          const agentName = req.decoded.displayName;
          const agentEmail = req.decoded.email;
          // const propertyImage = req.file ? req.file.path : "";
          // const propertyImage = req.file ? `/uploads/${req.file.filename}` : "";

          const newProperty = {
            title,
            location,
            image_url,
            agentImage,
            verificationStatus,
            agentName,
            agentEmail,
            priceRangeMin: parseFloat(priceRangeMin),
            priceRangeMax: parseFloat(priceRangeMax),
           
          };

          const result = await propertyCollection.insertOne(newProperty);
          res.status(201).json({
            message: "Property added successfully",
            propertyId: result.insertedId,
          });
        } catch (error) {
          res.status(500).json({ message: "Error adding property", error });
        }
      }
    );

    // get all properties
    app.get("/properties",verifyToken, async (req, res) => {
      const result = await propertyCollection.find().toArray();
      res.send(result);
    });

    // delete properties
    app.delete("/deleteProperty/:id", verifyToken, verifyAgent, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertyCollection.deleteOne(query);
      res.send(result);
    });


    // get one property by id
    app.get("/propertie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertyCollection.findOne(query);
      res.send(result);
    });


    // update the propertie by id
    app.patch("/updateProperty/:id", verifyToken, verifyAgent, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: req.body,
      };
      const result = await propertyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });



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
