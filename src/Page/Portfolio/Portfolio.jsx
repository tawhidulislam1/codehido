import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Portfolio = () => {
    const AxiosPublic = useAxiosPublic();
    const { data: projects = [] } = useQuery({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/dashboard/portfolio');
            return res.data;
        },
    });

    console.log(projects);

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">My Portfolio</h2>
                <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                    A showcase of projects I’ve built with modern technologies.
                </p>
            </div>

            {/* Portfolio Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => {
                    const techTags = project.technology ? project.technology.split(',') : [];
                    const projectLink = project.live || project.github || project.server || "#";

                    return (
                        <div
                            key={project._id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            {/* Image */}
                            <div className="relative group">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <a
                                    href={projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300"
                                >
                                    <span className="text-white font-medium text-lg bg-[#2974FF] px-4 py-2 rounded-lg shadow">
                                        View Project
                                    </span>
                                </a>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                                <p className="text-gray-600 text-sm mt-2">{project.details}</p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {techTags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#E6F0FF] text-[#2974FF] px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Portfolio;
