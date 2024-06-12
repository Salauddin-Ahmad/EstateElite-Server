import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://estate-elite-server.vercel.app'
});
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;