import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";

const OfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch property details for the offer
  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlisted/${id}`);
      // console.log(property)
      return res.data;
    },
  });

  // State for holding max price and min price
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
    if (property) {
      setMinPrice(property.propertie.priceRangeMin);
      setMaxPrice(property.propertie.priceRangeMax);
    }
  }, [property]);

  // Mutation to submit the offer
  const submitOfferMutation = useMutation({
    mutationFn: async (offerData) => {
      offerData.buyedAt = new Date().toISOString(); // Adding the buyedAt timestamp
      offerData.email = user?.email;
      const res = await axiosSecure.post("/propertyOffers", offerData);
      return res.data;
    },


    // refech after adding to propertyBought and delete from wishlist
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries(["propertyOffers", user?.email]);
      Swal.fire({
        title: "Success!",
        text: "Your offer has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      
      // Delete the wishlisted item after submitting the offer
      try {
        const deleteRes = await axiosSecure.delete(`/wishlisted/${variables.propertieId}`);
        console.log(deleteRes.data);
      } catch (err) {
        console.log(err)
      }

      navigate("/dashboard/propertyBought");
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

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    if (
     minPrice < property?.propertie?.priceRangeMin ||
      maxPrice > property?.propertie?.priceRangeMax
    ) {
      Swal.fire({
        title: "Error",
        text: "The offered amount must be within the price range.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const offerData = {
      Id: property._id,
      propertieId: property?.propertieId,
      propertyTitle: property?.propertie?.title,
      propertyLocation: property?.propertie?.location,
      propertyImage: property?.propertie?.propertyImage,
      agentImage: property?.propertie?.agentImage,
      agentName: property?.propertie?.agentName,
      agentEmail: property?.propertie?.agentEmail,
      offeredMin: minPrice,
      offeredMax: maxPrice,
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      status: "pending",
    };

    try {
      await submitOfferMutation.mutateAsync(offerData);
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Error! " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading property details</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Make an Offer</h1>
      <form onSubmit={handleOfferSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            value={property?.propertie?.title}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Property Location
          </label>
          <input
            type="text"
            value={property?.propertie?.location}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Agent
          </label>
          <div className="flex items-center gap-4 border border-gray-300 w-full shadow-sm rounded-l-full rounded-md ">
            <img
              className="h-10 w-10 rounded-full "
              src={property?.propertie?.agentImage}
              alt=""
            />
            <p>{property?.propertie?.agentName}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Selling Status
          </label>
          <input
            type="text"
            value={property?.status === "pending" ? "Pending" : "Accepted"}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <label htmlFor="offer-price">Offer Price</label>
        <div className="flex gap-2 mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2">
          <input
            type="number"
            defaultValue={property?.propertie?.priceRangeMin}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-l-md"
          />
          <span className="self-center"> - </span>
          <input
            type="number"
            defaultValue={property?.propertie?.priceRangeMax}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-r-md"
          />
        </div>

        <div className="flex gap-2 my-4">
          <button type="submit" className="btn btn-primary">
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferPage;
