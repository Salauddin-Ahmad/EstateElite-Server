import AdvertiseProperty from "../../Pages/Dashboard/Admin/Advertise/AdvertiseProperty";
import AdvertisedLists from "../AdvertisedLists/AdvertisedLists";
import Testimonials from "../Testimonials/Testimonials";
import WhyUS from "../WhyUS";
import Sliders from "./Sliders";

const Home = () => {
    return (
        <div>
            <Sliders></Sliders>
            <AdvertisedLists></AdvertisedLists>
            <Testimonials></Testimonials>
            <WhyUS></WhyUS>
        </div>
    );
};

export default Home;