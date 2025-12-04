import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ViewPortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const AxiosPublic = useAxiosPublic();

    // Fetch single project
    const { data: project, isLoading, isError } = useQuery({
        queryKey: ['portfolio', id],
        queryFn: async () => {
            const res = await AxiosPublic.get(`/dashboard/portfolio/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-20">Loading...</div>;
    if (isError) return <div className="text-center py-20 text-red-500">Failed to load project.</div>;

    const techTags = project.technology ? project.technology.split(',') : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-50 min-h-screen py-16 px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
            >

                {/* Project Image */}
                {project.image && (
                    <motion.img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-80 object-cover"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                )}

                {/* Project Info */}
                <motion.div
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
                    <p className="text-gray-700 mb-4">{project.details}</p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {techTags.map((tag, index) => (
                            <motion.span
                                key={index}
                                className="bg-[#E6F0FF] text-[#2974FF] px-3 py-1 rounded-full text-xs font-medium"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {tag.trim()}
                            </motion.span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4">
                        {project.live && (
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                Live Project
                            </motion.a>
                        )}
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                GitHub
                            </motion.a>
                        )}
                        {project.server && (
                            <motion.a
                                href={project.server}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                Server
                            </motion.a>
                        )}
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <motion.button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            Back
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ViewPortfolio;
