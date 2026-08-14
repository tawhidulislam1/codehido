// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ServicesDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const AxiosPublic = useAxiosPublic();

    const { data: service, isLoading, isError } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await AxiosPublic.get(`/service/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <div className="text-center py-20 text-[#2974FF]">Loading service details...</div>;
    if (isError || !service) return <div className="text-center py-20 text-red-500">Failed to load service details.</div>;

    const featureList = [
        { title: "High Performance", desc: "Lightning-fast delivery for smooth user experience." },
        { title: "Secure & Scalable", desc: "Built for reliability, growth, and long-term business value." },
        { title: "Modern UI/UX", desc: "Clean, engaging design that makes your brand memorable." },
    ];

    return (
        <div style={{ backgroundColor: "#F5FAFF", color: "#0F172A" }} className="min-h-screen">
            <section className="relative overflow-hidden py-28">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <span style={{ color: "#2974FF" }} className="font-semibold uppercase tracking-wide text-sm">
                            Premium Service
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p style={{ color: "#475569" }} className="text-lg md:text-xl mb-8">
                            {service.description}
                        </p>
                        <button
                            style={{
                                background: "linear-gradient(to right, #2974FF, #1558D6)",
                                color: "#FFFFFF"
                            }}
                            className="px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                        >
                            Get a Free Consultation
                        </button>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            >
                                Back
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative w-full md:w-auto"
                    >
                        <div
                            style={{
                                background: service.image
                                    ? `url(${service.image}) center/cover no-repeat, linear-gradient(to right, #2974FF, #1558D6)`
                                    : "linear-gradient(to right, #2974FF, #1558D6)"
                            }}
                            className="w-full h-64 md:h-96 rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute -top-16 -left-16 w-40 h-40 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: "#E6F0FF" }}></div>
                            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-30 animate-pulse" style={{ backgroundColor: "#E6F0FF" }}></div>
                        </div>
                    </motion.div>

                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
                {featureList.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-white rounded-3xl shadow-xl p-8 border hover:shadow-2xl transition"
                        style={{ borderColor: "#CBD5E1" }}
                    >
                        <h3 style={{ color: "#0F172A" }} className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p style={{ color: "#475569" }}>{feature.desc}</p>
                    </motion.div>
                ))}
            </section>

            <section className="text-center py-24" style={{ background: "linear-gradient(to right, #2974FF, #1558D6)", color: "#FFFFFF" }}>
                <motion.h2
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold mb-6"
                >
                    Ready to Launch Your Next Digital Solution?
                </motion.h2>
                <p style={{ color: "#E6F0FF" }} className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
                    Let’s collaborate to bring your vision to life with a strategy-first solution tailored to your business.
                </p>
                <button
                    style={{ backgroundColor: "#FFFFFF", color: "#1558D6" }}
                    className="px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-[#E6F0FF] transition"
                >
                    Start Your Project
                </button>
            </section>

        </div>
    );
};

export default ServicesDetails;
