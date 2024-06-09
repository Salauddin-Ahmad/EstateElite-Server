import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: propertyBought, isLoading, isError } = useQuery({
    queryKey: ["propertyBought"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/propertyBought/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bought properties</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Properties Bought: {propertyBought?.length}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {propertyBought?.map((property) => (
          <div key={property._id} className="border border-gray-300 rounded-md  shadow-sm">
             <img src={property.propertyImage} alt={property.propertyTitle} className="w-full h-48 object-cover rounded-md mb-4" />
           <div className="px-4 mb-3">
            <h2 className="text-xl font-semibold mb-2">{property.propertyTitle}</h2>
            <p className="text-gray-600 mb-2">Location: {property.propertyLocation}</p>
            <p className="text-gray-600 mb-2">Agent: {property.agentName}</p>
            <p className="text-gray-600 mb-2">Offered Amount: ${property.offeredMin} - ${property.offeredMax}</p>
            <p className={`font-semibold ${property.status === 'pending' ? 'text-yellow-500' : property.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </p>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
