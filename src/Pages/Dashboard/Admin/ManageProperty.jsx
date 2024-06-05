import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from 'sweetalert2';

const ManageProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const fetchProperties = async () => {
    const { data } = await axiosSecure.get('/properties');
    console.log(data)
    return data;
  };

  const updatePropertyStatus = async ({ id, verificationStatus }) => {
    const { data } = await axiosSecure.patch(`/updateStatus/${id}`, { verificationStatus });
    console.log(data)
    return data;
  };

  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const mutation = useMutation({
    mutationFn: updatePropertyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
    }
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error loading properties</h2>;

  const handleVerify = (id) => {
    mutation.mutate({ id, verificationStatus: 'verified' }, {
      onSuccess: () => {
        Swal.fire('Success', 'Property verified successfully!', 'success');
      },
      onError: () => {
        Swal.fire('Error', 'Failed to verify property', 'error');
      }
    });
  };

  const handleReject = (id) => {
    mutation.mutate({ id, verificationStatus: 'rejected' }, {
      onSuccess: () => {
        Swal.fire('Success', 'Property rejected successfully!', 'success');
      },
      onError: () => {
        Swal.fire('Error', 'Failed to reject property', 'error');
      }
    });
  };

  return (
    <div>
      <h2 className="text-center text-2xl">Manage Properties</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/6 py-2">Property Title</th>
            <th className="w-1/6 py-2">Property Location</th>
            <th className="w-1/6 py-2">Agent Name</th>
            <th className="w-1/6 py-2">Agent Email</th>
            <th className="w-1/6 py-2">Price Range</th>
            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td className="border px-4 py-2">{property.title}</td>
              <td className="border px-4 py-2">{property.location}</td>
              <td className="border px-4 py-2">{property.agentName}</td>
              <td className="border px-4 py-2">{property.agentEmail}</td>
              <td className="border px-4 py-2">{property.priceRangeMin} - {property.priceRangeMax}</td>
              <td className="border px-4 py-2">
                {property.verificationStatus == 'pending' ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleVerify(property._id)}
                    >
                      Verify
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleReject(property._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={property?.verificationStatus === 'verified' ? 'text-green-500' : 'text-red-500'}>
                    {property?.verificationStatus?.charAt(0).toUpperCase() + property?.verificationStatus?.slice(1)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperty;

