import  { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAdmin from "../../hook/useAdmin";
import useAgent from "../../hook/useAgent";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const PropertyDetails = () => {
  // const [isAdmin] = useAdmin();
  // const [isAgent] = useAgent();

  const [review, setReview] = useState("");
  const { user, isLoading: userLoading } = useAuth();
  // console.log(user?.email)
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch property details
  const { data: propertie, isLoading: propertyLoading, isError: propertyError } = useQuery({
    queryKey: ["propertie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/propertie/${id}`);
      return res.data;
    }
  });

  // Post propertie details to wishlisted collection
  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post(`/propertiesWishlist/${user?.email}`, { 
        propertie,
        propertieId: id,
        email: user?.email,
        status: "pending"
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Property has been added to your wishlist.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      const status = error.response?.status;
      if (status === 406){
        Swal.fire({
          title: "Oops...",
          text: "You have already added this property to your wishlist or bought it.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Oops...",
          text: "Error! " + error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  });

  // Fetch reviews
  const { data: reviews, isLoading: reviewsLoading, isError: reviewsError } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    }
  });

  // Handle review submission
  const mutation = useMutation({
    mutationFn: async (newReview) => {
      const res = await axiosSecure.post("/propertieReview", newReview);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]); // Refetch reviews after a new review is added
      setReview("");
    },
    onError: (error) => {
      Swal.fire({
        title: "Oops...",
        text: "Error! " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL || user?.photoUrl,
      title: propertie.title,
      agentName: propertie.agentName,
      reviewTime: new Date().toISOString(),
      review,
      propertyId: id,
    };
    mutation.mutate(reviewData);
  };

  const handleAddWishlist = () => {
    addToWishlistMutation.mutate();
  };

  if (propertyLoading || reviewsLoading) {
    return <div>Loading...</div>;
  }

  if (propertyError || reviewsError) {
    return <div>Error loading data</div>;
  }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-200 my-4 ">
        <div>
          <img
            src={propertie.propertyImage}
            alt={propertie.title}
            className="w-full rounded-md max-h-80 object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold mb-2">{propertie.title}</h1>
          <p className="mb-2">{propertie.description}</p>

          <p className="mb-2">
            <strong>Location:</strong> {propertie.location}
          </p>
          <p className="mb-2">
            <strong>Price Range:</strong> ${propertie.priceRangeMin} - $
            {propertie.priceRangeMax}
          </p>
          <div className="flex items-center mb-2">
            <img
              src={propertie.agentImage}
              alt={propertie.agentName}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>{propertie.agentName}</span>
          </div>
          <p className="mb-2 flex gap-2">
            <strong>Verification Status:</strong>
            <span className="bg-green-200 px-1 rounded-sm">
              {" "}
              {propertie.verificationStatus}
            </span>
          </p>
          <button onClick={handleAddWishlist} className="btn btn-primary">Add to wishlist</button>
        </div>
      </div>

      {/* Property Review section */}
      <div className="ml-3">
        <h1 className="text-2xl mb-2">Total Reviews: {reviews?.length}</h1>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border rounded-md mb-6">
              <h1 className="text-2xl my-8 ml-3">{review.review}</h1>
              <div className="flex items-center">
                <img className="w-10 h-10 rounded-full" src={review.photo} alt="" />
                <p className="ml-3 mb-2">By: {review.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div>
        <form onSubmit={handleSubmit} className="mx-3 my-3">
          <textarea
            name="review"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full border py-2 border-blue-500 bg-blue-100 rounded-md shadow-sm p-2"
            rows="4"
            placeholder="Write your review here..."
            required
          ></textarea>
          <button type="submit" className="btn btn-primary mt-3">
            Add a Review
          </button>
        </form>
      </div>
    </>
  );
};

export default PropertyDetails;
