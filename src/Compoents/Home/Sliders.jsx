import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Sliders = () => {
  return (
    <div className="mb-5">
<h1 className="lg:text-3xl text-center pt-8 font- font-bold">
Discover your perfect home with the help of our experienced experts.
</h1>
      <p className="w-[90%] mx-auto mt-3 ">
      Welcome to EstateElite, your premier destination for luxury real estate. Explore our exclusive listings and find your dream home today. Our experts are ready to help you find your dream home. Your perfect home is just a click away!
      </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop={true}
        loopAdditionalSlides={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/SQ9fky6S/austin-distel-jp-Hw8ndw-J-Q-unsplash.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/W4K0cKtq/avi-waxman-f9q-Zu-Ko-ZYo-Y-unsplash.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/CLHCnmr9/scott-graham-5f-Nm-Wej4t-AA-unsplash.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "5px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/CxhGGkW5/digital-marketing-agency-ntwrk-g39p1k-Djv-SY-unsplash.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "2px"
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.postimg.cc/hjdTDr7y/ronnie-george-9g-Gv-NWBe-Oq4-unsplash.jpg"
            alt=""
            style={{
              width: "100%",
              height: "80vh",
              marginTop: "20px",
              borderRadius: "2px"
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Sliders;