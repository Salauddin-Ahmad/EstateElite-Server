import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all reviews
  const { data: reviewsAll, isLoading, isError } = useQuery({
    queryKey: ['reviewsAll'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviewsAll');
      return res.data;
    }
  });

  // Mutation to delete a review
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/deleteReviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
      Swal.fire({
        title: 'Deleted!',
        text: 'Review deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Failed to delete review. ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
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
      <h1 className="text-2xl font-bold mb-6">Total Reviews: {reviewsAll?.length}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2  pt-1">
        {reviewsAll.map((review) => (
          <div key={review._id} className="bg-slate-100 p-4 border-2 border-slate-200 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img src={review.photo} alt={review.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="text-gray-900 font-semibold">{review.name}</p>
                <p className="text-gray-500">{review.email}</p>
                <p className="text-gray-500">{review.reviewerEmail}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4"><span className='font-bold'>Review:</span> {review.review}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
