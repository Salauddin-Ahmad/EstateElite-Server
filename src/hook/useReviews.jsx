import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useReviews = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const response = await axiosSecure.get('/reviewsAll');
      return response.data;
    }
  });
};

export default useReviews;
