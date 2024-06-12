import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const AdvertisedLists = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['advertised'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertised`);
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching properties</div>;

  return (
<>

<div>
    <h1 className="text-3xl font-bold font-sans text-center my-8">Top Trending Properties </h1>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {properties?.map(property => (
        <div key={property._id} className="card border  border-slate-300 bg-slate-100 ">
          <img 
          className="rounded-t-xl w-auto h-40"
          src={property.propertyImage}
           alt={property.title} />
          <div className="p-3">
            <h2 className="font-bold text-xl">{property.title}</h2>
            <p><span className="font-semibold">Location: </span>{property.location}</p>
            <p><span className="font-semibold">Price range: </span>${property.priceRangeMin} - ${property.priceRangeMax}</p>
            <p><span className="font-semibold">Status: </span>{property.verificationStatus}</p>
            <Link to={`/property/${property._id}`}>
            <button className="btn bg-slate-400" >
             View Details
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div></>
  );
};

export default AdvertisedLists;
