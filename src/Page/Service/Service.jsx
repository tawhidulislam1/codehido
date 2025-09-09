// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const services = [
    {
        image: "https://images.unsplash.com/photo-1581090700227-6f5b7d3b38d1?auto=format&fit=crop&w=400&q=80",
        title: "Web Development",
        description:
            "Build responsive, scalable, and modern websites tailored to your business needs.",
    },
    {
        image: "https://images.unsplash.com/photo-1564866657312-1a70c68c91eb?auto=format&fit=crop&w=400&q=80",
        title: "UI/UX Design",
        description:
            "Craft intuitive and beautiful designs that improve user experience and engagement.",
    },
    {
        image: "https://images.unsplash.com/photo-1581090461287-9b0c4cbf85ff?auto=format&fit=crop&w=400&q=80",
        title: "Mobile App Development",
        description:
            "Develop native and cross-platform mobile applications for iOS and Android.",
    },
];

const Service = () => {
    return (
        <section className="py-20 bg-[#F5FAFF]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-[#0F172A] mb-12">
                    Our <span className="text-[#2974FF]">Services</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 object-cover"
                            />

                            {/* Content */}
                            <div className="p-6 text-left">
                                <h3 className="text-2xl font-semibold text-[#0F172A] mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-[#475569] mb-6">{service.description}</p>

                                {/* Read More Button */}
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block px-5 py-2 rounded-lg bg-[#2974FF] text-white font-medium shadow-md hover:bg-[#1558D6] transition-all duration-300"
                                >
                                    Read More
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Service;
