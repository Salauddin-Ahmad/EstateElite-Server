import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Sliders = () => {
  return (
    <div className="mb-5">


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