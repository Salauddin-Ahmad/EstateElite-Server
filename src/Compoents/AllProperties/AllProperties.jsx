import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hook/useAxiosSecure';

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: properties, isLoading, isError } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/propertiesVerified');
            console.log(res.data)
            return res.data;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading properties</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {properties.map((property) => (
                <div key={property.id} className="bg-slate-100 border-2 border-slate-300 shadow-lg rounded-lg overflow-hidden">
                    <img src={property.propertyImage} alt={property.title} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                        <p className="text-gray-600 mb-2">{property.location}</p>
                        <div className="flex items-center mb-2">
                            <img src={property.agentImage} alt={property.agentName} className="w-10 h-10 rounded-full mr-2"/>
                            <span className="text-gray-800">{property.agentName}</span>
                        </div>

                        {/* no use here cause all the props are already vrified */}
                        <div className="mb-2">
                            <span className={`inline-block px-2 py-1 text-sm rounded ${property.verificationStatus ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {property.verificationStatus ? 'Verified' : 'Not Verified'}
                            </span>
                        </div>
                        <p className="text-gray-800 font-semibold mb-4">${property.priceRangeMin}- {property.priceRangeMax}</p>

                        <Link to={`/property/${property._id}`} className="inline-block px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-400">
                            Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllProperties;
