import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Keyboard,
  Mousewheel,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import SubscriptionCard from "../../../shared/PriceingCard";

const priceing = [
  {
    id: "starter",
    name: "Starter",
    carRange: "1-10 Cars",
    price: 10,
    features: [
      "+5% Of The Daily Rate For Each Booking",
      "+10% Of The Daily Rate If The Customer Books A Car With The Driver",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    carRange: "11-20 Cars",
    price: 15,
    features: [
      "+5% Of The Daily Rate For Each Booking",
      "+10% Of The Daily Rate If The Customer Books A Car With The Driver",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    carRange: "21-30 Cars",
    price: 20,
    features: [
      "+5% Of The Daily Rate For Each Booking",
      "+10% Of The Daily Rate If The Customer Books A Car With The Driver",
    ],
    isPopular: true,
  },
  {
    id: "premium",
    name: "Premium",
    carRange: "31+ Cars",
    price: 25,
    features: [
      "+5% Of The Daily Rate For Each Booking",
      "+10% Of The Daily Rate If The Customer Books A Car With The Driver",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    carRange: "50+ Cars",
    price: 35,
    features: [
      "+3% Of The Daily Rate For Each Booking",
      "+8% Of The Daily Rate If The Customer Books A Car With The Driver",
    ],
  },
];

const Priceing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const swiperRef = useRef(null); // <-- NEW
  const [subscribetionType, setSubscribetionType] = useState("monthly");

  //   const onToggle = (index) => {
  //     const newPlayingIndex = playingIndex === index ? null : index;
  //     setPlayingIndex(newPlayingIndex);

  //     if (swiperRef.current?.autoplay) {
  //       if (newPlayingIndex !== null) {
  //         swiperRef.current.autoplay.stop();
  //       } else {
  //         swiperRef.current.autoplay.start();
  //       }
  //     }
  //   };

  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-[#F3F5F9]">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold text-[#413535] mb-4">
          Pricing and Packages
        </h2>
        <p className="text-lg lg:text-xl text-[#8C7F7F] mb-8">
          Choose a plan that fits your salon's needs.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex bg-[#B4BBDF] rounded-lg p-1">
          <button
            onClick={() => setSubscribetionType("monthly")}
            className={`px-6 py-2 rounded-md text-sm  transition-all hover:cursor-pointer font-semibold ${
              subscribetionType === "monthly"
                ? "bg-[#0B2088] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSubscribetionType("yearly")}
            className={`px-6 py-2 rounded-md text-sm  transition-all hover:cursor-pointer font-semibold ${
              subscribetionType === "yearly"
                ? "bg-[#0B2088] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="w-full px-4 md:px-20 lg:px-40 max-w-7xl">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          keyboard={{ enabled: true }}
          //   navigation={true}
          autoplay={{ delay: 4000 }}
          modules={[
            EffectCoverflow,
            Navigation,
            Keyboard,
            Mousewheel,
            Autoplay,
          ]}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // <-- Capture swiper instance
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 4,
            slideShadows: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
          className="w-full"
        >
          {priceing.map((price, index) => {
            const [ref, inView] = useInView({ threshold: 0.6 });
            const isPlaying = activeIndex === index && inView;

            return (
              <SwiperSlide key={index} className="flex justify-center">
                <div ref={ref}>
                  <div className="card bg-white flex flex-row-reverse rounded-xl shadow-lg p-4 max-w-[350px] min-w-[300px] h-[500px] text-left space-x-4 space-x-reverse">
                    <div className="w-full flex flex-col justify-between space-y-2">
                      <SubscriptionCard
                        data={price}
                        subscribetionType={subscribetionType}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Priceing;
