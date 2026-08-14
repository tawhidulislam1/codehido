import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const fallbackSlides = [
    {
        id: 1,
        title: "Empowering Your Digital Journey.",
        subtitle: "CodeHido Tech Solutions",
        description:
            "Unlock the potential of technology with BugBuild's innovative solutions crafted to elevate your business to new heights.",
        btnText: "Discover More",
        btnLink: "https://bugbuild.com/about-us",
        videoLink: "https://www.youtube.com/watch?v=SZEflIVnhH8",
        imgSrc: "https://bugbuild.com/frontend/img/banner/banner-4.png",
    },
    {
        id: 2,
        title: "Innovate Your Digital Future.",
        subtitle: "CodeHido Software Solutions",
        description:
            "Partner with us for cutting-edge software solutions tailored to your business requirements, empowering you to thrive in the digital landscape.",
        btnText: "Discover More",
        btnLink: "https://bugbuild.com/about-us",
        videoLink: "https://www.youtube.com/watch?v=SZEflIVnhH8",
        imgSrc: "https://bugbuild.com/frontend/img/banner/banner-3.png",
    },
];

const Hero = () => {
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ["content-hero"],
        queryFn: async () => {
            const res = await axiosPublic.get("/content/hero");
            return res.data;
        },
        retry: false,
    });

    const slides = Array.isArray(data) && data.length ? data : fallbackSlides;

    return (
        <div className="relative header overflow-hidden">
            <Swiper
                modules={[Navigation, EffectFade, Autoplay]}
                navigation
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="swiper"
            >
                {slides.map(
                    ({
                        id,
                        title,
                        subtitle,
                        description,
                        btnText,
                        btnLink,
                        videoLink,
                        imgSrc,
                    }) => (
                        <SwiperSlide key={id}>
                            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-8 md:px-8 lg:px-10 gap-8">
                                
                                {/* Text Content */}
                                <div className="md:w-1/2 text-center md:text-left animate-fadeIn">
                                    <span className="text-blue-600 font-semibold text-lg md:text-xl">
                                        {subtitle}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                                        {title}
                                    </h1>
                                    <p className="text-gray-700 mb-6 max-w-lg mx-auto md:mx-0 text-sm sm:text-base">
                                        {description}
                                    </p>

                                    <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
                                        <a
                                            href={btnLink}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                                        >
                                            {btnText}
                                        </a>
                                        <a
                                            href={videoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                            title="Watch Video"
                                        >
                                            <i className="fas fa-play"></i>
                                        </a>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="md:w-1/2 flex justify-center animate-slideIn">
                                    <img
                                        src={imgSrc}
                                        alt="banner"
                                        className="w-full max-w-md sm:max-w-lg h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
           
        </div>

    );
};

export default Hero;
