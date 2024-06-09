import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {data : allReviews = []} = useQuery({
        queryKey:'allReviews',
        queryFn: async () => {
            const res = await axiosSecure.get('/allReviews');
            console.log(res.data);
            return res.data;
        }
    })
    return (
        <div>
            <h1 className="text-2xl">Total reviews: {allReviews.length}</h1>
        </div>
    );
};

export default MyReviews;