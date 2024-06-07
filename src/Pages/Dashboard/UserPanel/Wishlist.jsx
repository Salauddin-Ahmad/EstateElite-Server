import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wishlisted } = useQuery({
    queryKey: "wishlist",
    queryFn: async () => {
      const res = await axiosSecure.get("/wishlist");
      console.log(res.data);
      return res.data;
    },
  });
  console.log(wishlisted)

  return (
    <>
      <div className="mx-3 my-3">
        <h1 className="text-2xl">Wishlisted Items: {wishlisted?.length}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
    {wishlisted?.map(wishlist => (
        <div 
        className="card border space-y-1 rounded-md mx-3" 
        key={wishlist._id}>
        <h1>{wishlist?.propertie?.title}</h1>
       </div>
    ))}



      </div>
    </>
  );
};
export default Wishlist;
