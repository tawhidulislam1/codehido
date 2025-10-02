/* eslint-disable no-unused-vars */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import "swiper/css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, BrightTech",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "CodeHido transformed our online presence with a sleek and functional design. The team was professional, creative, and always ahead of deadlines.",
      rating: 5,
    },
    {
      name: "Michael Lee",
      role: "Founder, UrbanHive",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      quote:
        "Their expertise in development is unmatched. They delivered exactly what we envisioned — and more!",
      rating: 5,
    },
    {
      name: "Emily Carter",
      role: "Marketing Director, NovaCorp",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "An outstanding team that truly understands design, usability, and business needs. Highly recommend!",
      rating: 4,
    },
    {
      name: "David Kim",
      role: "CTO, InnovateX",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      quote:
        "Excellent communication, great design sense, and flawless execution. Highly satisfied with the results.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F4FF] to-[#E6F0FF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl font-bold text-center text-[#0F172A] mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our <span className="text-[#2974FF]">Clients Say</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Real Client <span className="text-[#2974FF]">Stories</span>
            </h2>

            <p className="text-lg text-gray-700 mb-4">
              Client Feedback on Our Software Solutions
            </p>

            <p className="text-gray-500 mb-8">
              How responsive and helpful are your customer service
              representatives? Do customers feel their questions and concerns
              are being addressed in a timely and effective manner?
            </p>

            <div className="mb-8">
              <p className="whitespace-normal text-4xl md:text-5xl font-extrabold text-[#2974FF]">
                99.9%{" "}
                <span className="block md:inline text-gray-700 font-medium text-lg md:text-xl">
                  Customer Satisfaction • Based on 950+ Reviews • 56,530
                  Objective Resources
                </span>
              </p>
            </div>

            <a
              href="/testimonial"
              className="inline-block px-6 py-3 bg-[#2974FF] text-white font-medium rounded-full shadow-md hover:bg-[#1558D6] transition-all"
            >
              See All Reviews
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000 }}
            >
              {testimonials.map((t, idx) => {
                const rating = Math.max(0, Math.min(t.rating || 0, 5));
                return (
                  <SwiperSlide key={idx}>
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-xl transition-transform duration-300 hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <img
                        src={t.image}
                        alt={`Photo of ${t.name}`}
                        loading="lazy"
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#2974FF]/20 mb-4"
                      />

                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">{t.role}</p>

                      <p className="text-gray-600 italic mb-4">"{t.quote}"</p>

                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: rating }).map((_, i) => (
                          <FaStar key={`filled-${i}`} className="text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                          <FaStar key={`empty-${i}`} className="text-gray-300" />
                        ))}
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
