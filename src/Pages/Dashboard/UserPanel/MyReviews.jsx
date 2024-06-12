import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch user's reviews
  const { data: allReviews = [], isLoading, isError } = useQuery({
    queryKey: ["allReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allReviews/${user?.email}`);
      console.log(res.data)
      return res.data;
    },
    enabled: !!user?.email, // Fetch only when the user's email is available
  });

  // Mutation to delete a review
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/deletereviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allReviews", user?.email]);
      Swal.fire({
        title: "Deleted!",
        text: "Review has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Oops...",
        text: "Error! " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleDelete = (id) => {
    deleteReviewMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-3">Total reviews: {allReviews.length}</h1>
      <div className="space-y-4">
        {allReviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{review.title}</h2>
            <p className="text-gray-500"><span className="font-bold">Agent:</span> {review.agentName}</p>
            <p className="text-gray-500"><span className="font-bold">Reviewed on:</span> {new Date(review.reviewTime).toLocaleDateString()}</p>
            <p className="mt-2 text-gray-500"><span className="font-bold">Review: </span>{review.review}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
