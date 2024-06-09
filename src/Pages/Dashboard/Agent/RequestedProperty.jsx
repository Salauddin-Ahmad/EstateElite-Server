// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hook/useAxiosSecure";
// import Swal from "sweetalert2";
// import useAuth from "../../../hook/useAuth";

// const RequestedProperty = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch requested properties
//   const {
//     data: requested = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["requested"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/propertyBought/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email, // Fetch only when the user's email is available
//   });

//   console.log(requested)


//   // Mutation to update the property status
//   const updateStatusMutation = useMutation({
//     mutationFn: async ({ id, status }) => {
//       const res = await axiosSecure.patch(`/requestedProp`, {id, status });
//       console.log(res.data)
//       return res.data;
//     },

//     onSuccess: () => {
//       queryClient.invalidateQueries(["requested"]);
//       Swal.fire({
//         title: "Success!",
//         text: "Status updated successfully.",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         title: "Oops...",
//         text: "Error! " + error.message,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     },
//   });

//   const handleStatusChange = (id, status) => {
//     updateStatusMutation.mutate({ id, status });
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading data</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">
//         Requested Property: {requested.length}
//       </h1>
//       <table className="border-collapse border w-full">
//         <thead>
//           <tr>
//             <th className="border p-2">Property Title</th>
//             <th className="border p-2">Property Location</th>
//             <th className="border p-2">Buyer Email</th>
//             <th className="border p-2">Buyer Name</th>
//             <th className="border p-2">Offered Price</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requested.map((property) => (
//             <tr key={property._id}>
//               <td className="border p-2 hover:text-blue-500">
//                 {property.propertyTitle}
//               </td>
//               <td className="border p-2 hover:text-blue-500">
//                 {property.propertyLocation}
//               </td>
//               <td className="border p-2">{property.buyerEmail}</td>
//               <td className="border p-2">{property.buyerName}</td>
//               <td className="border p-2">
//                 <span>max</span> ${property.offeredMax} min $
//                 {property.offeredMin}
//               </td>
//               <td className="border p-2">{property.status}</td>
//               <td className="border p-2">
//                 {property.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         handleStatusChange(property.Id, "accepted")
//                       }
//                       className="btn btn-success"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleStatusChange(property.Id, "rejected")
//                       }
//                       className="btn btn-danger"
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestedProperty;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";

const RequestedProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch requested properties
  const {
    data: requested = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["requested"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/propertyBought/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Fetch only when the user's email is available
  });

  console.log(requested);

  // Mutation to update the property status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, propertieId, status }) => {
      const res = await axiosSecure.patch(`/requestedProp`, { id, propertieId, status });
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requested"]);
      Swal.fire({
        title: "Success!",
        text: "Status updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Oops...",
        text: "Error! " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleStatusChange = (id, propertieId, status) => {
    updateStatusMutation.mutate({ id, propertieId, status });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Requested Property: {requested.length}
      </h1>
      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border p-2">Property Title</th>
            <th className="border p-2">Property Location</th>
            <th className="border p-2">Buyer Email</th>
            <th className="border p-2">Buyer Name</th>
            <th className="border p-2">Offered Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requested.map((property) => (
            <tr key={property._id}>
              <td className="border p-2 hover:text-blue-500">
                {property.propertyTitle}
              </td>
              <td className="border p-2 hover:text-blue-500">
                {property.propertyLocation}
              </td>
              <td className="border p-2">{property.buyerEmail}</td>
              <td className="border p-2">{property.buyerName}</td>
              <td className="border p-2">
                <span>max</span> ${property.offeredMax} min $
                {property.offeredMin}
              </td>
              <td className={`border p-2 ${property.status === 'accepted' ? 'text-green-500' : property.status === 'rejected' ? 'text-red-600' : 'text-gray-500'}`}>
                {property.status}
              </td>
              <td className="border p-2">
                {property.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(property.Id, property.propertieId, "accepted")
                      }
                      className="btn btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(property.Id, property.propertieId, "rejected")
                      }
                      className="btn  bg-red-600 "
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedProperty;


