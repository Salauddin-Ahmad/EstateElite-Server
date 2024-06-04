// import { useState } from "react";
// import useAxiosSecure from "../../../hook/useAxiosSecure";
// import { useLoaderData, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const UpdatePropertyForm = () => {
//   const property = useLoaderData();
//   const {id} = useParams();
//   console.log(property)
//   console.log(id)
//   const axiosSecure = useAxiosSecure();
//   const [locations, setLocation] = useState("");
//   const [title, setTitle] = useState("");
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");

//   const [propertyImage, setPropertyImage] = useState(null);

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     // Check if propertyImage is changed
//   if (propertyImage) {
//     formData.append('image', propertyImage);
//   } else {
//     // If propertyImage is not changed, append the existing image URL from useLoaderData
//     formData.append('image', property.propertyImage);
//   }
//     formData.append('title', title || property.title);
//     formData.append('location', locations || property.location);
//     formData.append('priceRangeMin', priceMin || property.priceRangeMin);
//     formData.append('priceRangeMax', priceMax || property.priceRangeMax);
//     try {
//         const response = await axiosSecure.patch(`/updateProperty/${property._id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
    
//         if (response.data.modifiedCount == 1) {
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Property updated successfully!",
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//           // Alternatively, you can redirect to another page
//         } else {
//             Swal.fire({
//                 position: "top-end",
//                 icon: "warning",
//                 title: "No changes were made!",
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//           // Handle the case where no changes were made
//         }
//       } catch (error) {
//         Swal.fire({
//             position: 'top-end',
//             icon: 'error',
//             title: 'Error adding property!',
//             text: error.message,
//             showConfirmButton: false,
//             timer: 1500
//           });
//         // Show error message or handle error
//       }
//     };


//   return (
//     <div>
//       <h2 className="text-2xl">Update Property</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="propertyImage">Property Image</label>
//           <input
//             type="file"
//             id="propertyImage"
//             name="propertyImage"
//             onChange={(e) => setPropertyImage(e.target.files[0])}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="title">Property Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             defaultValue={property.title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="location" className="block font-medium text-gray-700">
//             Property Location:
//           </label>
//           <input
//             type="text"
//             id="location"
//             defaultValue={property.location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Agent Name:</label>
//           <input
//             type="text"
//             value={property.agentName}
//             readOnly
//             className="w-full px-4 py-2 border rounded-md bg-gray-100"
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">
//             Agent Email:
//           </label>
//           <input
//             type="email"
//             value={property.agentEmail}
//             readOnly
//             className="w-full px-4 py-2 border rounded-md bg-gray-100"
//           />
//         </div>

//         <div>
//           <label htmlFor="priceRangeMin">Price Range (Min)</label>
//           <input
//             type="number"
//             id="priceRangeMin"
//             name="priceRangeMin"
//             defaultValue={property.priceRangeMin}
//             onChange={(e) => setPriceMin(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md bg-gray-100"
//           />
//         </div>
//         <div>
//           <label htmlFor="priceRangeMax">Price Range (Max)</label>
//           <input
//             type="number"
//             id="priceRangeMax"
//             name="priceRangeMax"
//             defaultValue={property.priceRangeMax}
//             onChange={(e) => setPriceMax(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md bg-gray-100"
//           />
//         </div>
//         <div className="items-center text-center my-2">
//           <button className="btn btn-primary" type="submit">
//             Confirm Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdatePropertyForm;


import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Compoents/Utils";

const UpdatePropertyForm = () => {
  const property = useLoaderData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [locations, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [propertyImage, setPropertyImage] = useState(null);

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setLocation(property.location);
      setPriceMin(property.priceRangeMin);
      setPriceMax(property.priceRangeMax);
    }
  }, [property]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     if (propertyImage) {
//       formData.append('image', propertyImage);
//     } else {
//       formData.append('image', property.propertyImage);
//     }

//     formData.append('title', title);
//     formData.append('location', locations);
//     formData.append('priceRangeMin', priceMin);
//     formData.append('priceRangeMax', priceMax);

//     console.log({
//       title,
//       location: locations,
//       priceRangeMin: priceMin,
//       priceRangeMax: priceMax,
//       propertyImage
//     });

//     try {
//       const response = await axiosSecure.patch(`/updateProperty/${property._id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.modifiedCount === 1) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Property updated successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       } else {
//         Swal.fire({
//           position: "top-end",
//           icon: "warning",
//           title: "No changes were made!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         position: 'top-end',
//         icon: 'error',
//         title: 'Error updating property!',
//         text: error.message,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        let propertyImageUrl = property.propertyImage;
        if (propertyImage) {
            propertyImageUrl = await imageUpload(propertyImage);
        }

        const payload = {
            title: title || property.title,
            location: locations || property.location,
            priceRangeMin: priceMin || property.priceRangeMin,
            priceRangeMax: priceMax || property.priceRangeMax,
            propertyImage: propertyImageUrl,
        };

        const response = await axiosSecure.patch(`/updateProperty/${property._id}`, payload);

        if (response.data.modifiedCount === 1) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Property updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "No changes were made!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    } catch (error) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error updating property!',
            text: error.message,
            showConfirmButton: false,
            timer: 1500,
        });
    }
};

  return (
    <div>
      <h2 className="text-2xl">Update Property</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="propertyImage">Property Image</label>
          <input
            type="file"
            id="propertyImage"
            name="propertyImage"
            onChange={(e) => setPropertyImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="title">Property Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Property Location:
          </label>
          <input
            type="text"
            id="location"
            value={locations}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Agent Name:</label>
          <input
            type="text"
            value={property.agentName}
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
            value={property.agentEmail}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="priceRangeMin">Price Range (Min)</label>
          <input
            type="number"
            id="priceRangeMin"
            name="priceRangeMin"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="priceRangeMax">Price Range (Max)</label>
          <input
            type="number"
            id="priceRangeMax"
            name="priceRangeMax"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="items-center text-center my-2">
          <button className="btn btn-primary" type="submit">
            Confirm Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePropertyForm;
