import  { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Compoents/Utils";

const AddProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(8000000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const image_url = await imageUpload(propertyImage);
      console.log("Image URL:", image_url);

      const payload = {
        title,
        location,
        propertyImage: image_url,
        agentName: user?.displayName,
        agentImage: user?.photoURL,
        agentEmail: user?.email,
        priceRangeMin: priceMin,
        priceRangeMax: priceMax,
        verificationStatus: "pending",
      };

      console.log("Payload:", payload);

      const response = await axiosSecure.post("/add-property", payload);

      console.log("Backend response:", response.data);

      if (response.data.insertedId ) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Property added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add property!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error uploading property:", error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error adding property!',
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Property Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Property Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="propertyImage"
            className="block font-medium text-gray-700"
          >
            Property Image:
          </label>
          <input
            type="file"
            id="propertyImage"
            onChange={(e) => setPropertyImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Agent Name:</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Agent Email:
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="priceMin" className="block font-medium text-gray-700">
            Minimum Price:
          </label>
          <input
            type="number"
            id="priceMin"
            min="0"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="priceMax" className="block font-medium text-gray-700">
            Maximum Price:
          </label>
          <input
            type="number"
            id="priceMax"
            min="0"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
