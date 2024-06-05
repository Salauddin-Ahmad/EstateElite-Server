// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../hook/useAxiosSecure";
// import useAxiosPublic from "../../hook/useAxiosPublic";

// const  PropertyDetails = () => {
//     const {id} = useParams();

//     console.log(id)
//     const axiosSecure = useAxiosSecure();
//     const axiosPublic = useAxiosPublic();

//     const {data: propertie, isLoading, isError} = useQuery({
//         queryKey: ['propertie'],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/propertie/${id}`);
//             console.log(res.data);
//         }
//     })

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error loading properties</div>;
//     }


//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2">
//             <div>
//                 <img src={propertie.propertyImage} alt={propertie.title} />
//             </div>
//             <div>
//                 {/* <h1>{propertie.title}</h1>
//                 <p>{propertie.description}</p>
//                 <p>{propertie.price}</p>
//                 <p>{propertie.location}</p>
//                 <p>{propertie.priceRangeMin}</p>
//                 <p>{propertie.priceRangeMax}</p>
//                 <p>{propertie.agentName}</p>
//                 <p>{propertie.agentImage}</p>
//                 <p>{propertie.verificationStatus}</p>
//                 <p>{propertie.createdAt}</p>
//                 <p>{propertie.updatedAt}</p>
//                 <p>{propertie._id}</p> */}
//             </div>
//         </div>
//     );
// };

// export default PropertyDetails;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';

const PropertyDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: propertie, isLoading, isError } = useQuery({
        queryKey: ['propertie', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/propertie/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading property details</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div>
                <img src={propertie.propertyImage} alt={propertie.title} className="w-full h-auto object-cover" />
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-2">{propertie.title}</h1>
                <p className="mb-2">{propertie.description}</p>
                <p className="mb-2"><strong>Price:</strong> ${propertie.price}</p>
                <p className="mb-2"><strong>Location:</strong> {propertie.location}</p>
                <p className="mb-2"><strong>Price Range:</strong> ${propertie.priceRangeMin} - ${propertie.priceRangeMax}</p>
                <div className="flex items-center mb-2">
                    <img src={propertie.agentImage} alt={propertie.agentName} className="w-10 h-10 rounded-full mr-2" />
                    <span>{propertie.agentName}</span>
                </div>
                <p className="mb-2 flex gap-2"><strong>Verification Status:</strong><span className='bg-green-200 px-1 rounded-sm'> {propertie.verificationStatus}</span></p>
                <p className="mb-2"><strong>ID:</strong> {propertie._id}</p>
            </div>
        </div>
    );
};

export default PropertyDetails;
