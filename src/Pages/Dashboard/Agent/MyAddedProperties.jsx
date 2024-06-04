import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyAddedProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data: properties = [], isLoading, error, refetch } = useQuery({
      queryKey: ["properties"],
      queryFn: async () => {
        const res = await axiosSecure.get("/properties");
        return res.data;
      },
    });
    
    console.log(properties)

    const handleDelete = async (id) => {
      try {
        await axiosSecure.delete(`/deleteProperty/${id}`);
        refetch();
        Swal.fire("Deleted!", "Property has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete property.", "error");
      }
    };
  
    const handleUpdate = async (id) => {
      
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error loading properties</div>;
    }
    const backendUrl = "http://localhost:5000"; //
  
    return (
      <div>
        <h2 className="text-3xl mb-4">All Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property._id} className="card border space-y-1 rounded-md">
                {/* for getting image from multer (file upload for express) */}
              <img  src={`${backendUrl}${property.propertyImage}`} alt={property.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{property.title}</h3>
                <p>Location: {property.location}</p>
                <p>
                    {`Price Range: ${property.priceRangeMin} - ${property.priceRangeMax}`}</p>
                <div className="flex items-center">
                    <img src={property.agentImage} alt={property.agentName} className="w-8 h-8 rounded-full mr-2" />
                  <p>{property.agentName}</p>
                </div>
                <p>{`Verification Status: ${property.verificationStatus}`}</p>

                {property.verificationStatus !== "rejected" && (
                  <button
                    onClick={() => handleUpdate(property._id)}
                    className="btn btn-primary mt-2"
                  >
                    Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-danger mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default MyAddedProperties;