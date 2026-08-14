import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const AxiosPublic = useAxiosPublic();

    const { data: blog, isLoading, isError } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await AxiosPublic.get(`/blog/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <div className="text-center py-20 text-[#2974FF]">Loading blog...</div>;
    if (isError || !blog) return <div className="text-center py-20 text-red-500">Failed to load blog post.</div>;

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
                {blog.coverImage && (
                    <motion.img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-80 object-cover"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                )}

                <motion.div
                    className="p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
                    <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

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

export default BlogDetails;
