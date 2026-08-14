// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Service = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/service');
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-20 text-[#2974FF]">Loading services...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 text-red-500">Failed to load services.</div>;
    }

    return (
        <section className="py-20 bg-[#F5FAFF]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-[#0F172A] mb-12">
                    Our <span className="text-[#2974FF]">Services</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={service._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={service.image || 'https://images.unsplash.com/photo-1581090700227-6f5b7d3b38d1?auto=format&fit=crop&w=400&q=80'}
                                alt={service.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-6 text-left">
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-[#475569] mb-6">{service.description}</p>

                                <Link to={`/services/${service._id}`}>
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block px-5 py-2 rounded-lg bg-[#2974FF] text-white font-medium shadow-md hover:bg-[#1558D6] transition-all duration-300 cursor-pointer"
                                    >
                                        Read More
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;
