import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useAdmin from "../../../../hook/useAdmin";
import useAuth from "../../../../hook/useAuth";


const AdvertiseProperty = () => {
    const [isAdmin] = useAdmin();
    const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
    const email = user.email;
    console.log(email)

  const fetchVerifiedProperties = async () => {
    const response = await axiosSecure.get("/propertiesVerified");
    return response.data;
  };

  // Use queryKey and queryFn for fetching data
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["propertiesVerified"],
    queryFn: fetchVerifiedProperties,
  });

  // Mutation for updating the advertisement status
  const mutation = useMutation({
    mutationFn: (propertyId) =>
      axiosSecure.patch(`/properties/${propertyId}`, { advertisement: "true", advertiserEmail: email }),
    onSuccess: () => {
      queryClient.invalidateQueries(["propertiesVerified"]);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Advertise Properties</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Price Range</th>
            <th className="border px-4 py-2">Agent Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td className="border px-4 py-2">
                <img
                  src={property.propertyImage}
                  alt={property.title}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{property.title}</td>
              <td className="border px-4 py-2">Min {property.priceRangeMin} <br />  
                Max {property.priceRangeMax}</td>
              <td className="border px-4 py-2">{property.agentName}</td>
              <td className="border px-4 py-2">
                {property.advertisement ? (
                  <span>Advertised</span>
                ) : (
                  <button
                    onClick={() => mutation.mutate(property._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Advertise
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseProperty;
