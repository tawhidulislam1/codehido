import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Blog = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/blog');
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-20 text-[#2974FF]">Loading blogs...</div>;
    if (isError) return <div className="text-center py-20 text-red-500">Failed to load blog posts.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">Our Blog</h2>
                <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                    Insights, updates, and ideas from our team and the projects we build.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                    >
                        <div className="relative group">
                            <img
                                src={blog.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'}
                                alt={blog.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <Link to={`/blog/${blog._id}`} className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                                <span className="text-white font-medium text-lg bg-[#2974FF] px-4 py-2 rounded-lg shadow">
                                    Read More
                                </span>
                            </Link>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-900">{blog.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">
                                {blog.content?.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
