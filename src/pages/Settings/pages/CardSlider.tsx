import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImageSlider() {
    const [slides, setSlides] = useState([
        {
            id: 1,
            image: "/carPoster.png",
            alt: "Car Rental Promotion 1",
        },
        {
            id: 2,
            image: "/carPoster.png",
            alt: "Car Rental Promotion 2",
        },
        {
            id: 3,
            image: "/carPoster.png",
            alt: "Car Rental Promotion 3",
        },
        {
            id: 4,
            image: "/carPoster.png",
            alt: "Car Rental Promotion 4",
        },
    ]);

    const swiperRef = useRef(null);

    const handleRemoveSlide = (slideId) => {
        setSlides((prev) => prev.filter((slide) => slide.id !== slideId));
    };

    // Pause autoplay on mouse enter
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
        }
    };

    // Resume autoplay on mouse leave
    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start();
        }
    };

    return (
        <div className="w-full mx-auto p-4">
            <div
                className="rounded-lg overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: ".swiper-button-prev-custom",
                        nextEl: ".swiper-button-next-custom",
                    }}
                    // pagination={{
                    //     clickable: true,
                    //     bulletClass: "swiper-pagination-bullet",
                    //     bulletActiveClass: "swiper-pagination-bullet-active",
                    // }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                    }}
                    className="relative"
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative">
                            <div className="relative w-full min-h-64 sm:h-80 md:min-h-80 group">
                                <img
                                    src={slide.image || "/placeholder.svg"}
                                    alt={slide.alt}
                                    className="w-full h-full rounded-md"
                                />
                                <button
                                    onClick={() => handleRemoveSlide(slide.id)}
                                    className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-opacity duration-200 shadow-lg
      opacity-0 group-hover:opacity-100 pointer-events-none hover:cursor-pointer group-hover:pointer-events-auto"
                                    aria-label="Remove slide"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom hover:cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="swiper-button-next-custom hover:cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </Swiper>

                {slides.length === 0 && (
                    <div className="flex items-center justify-center h-64 bg-gray-100">
                        <p className="text-gray-500 text-lg">No slides available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
