import AdvertisedLists from "../AdvertisedLists/AdvertisedLists";
import FAQSection from "../FAQSection";
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
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;