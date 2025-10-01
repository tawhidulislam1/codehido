import React from "react";

const projects = [
    {
        id: 1,
        title: "Roktho Bondhon",
        description: "A blood donation platform for donors, volunteers, and admins.",
        image: "https://via.placeholder.com/600x400",
        link: "https://rokto-bondhon-5512e.web.app/",
        tech: ["React", "Firebase", "MongoDB"],
    },
    {
        id: 2,
        title: "Bistro Boss",
        description: "Restaurant management system with online food ordering & payments.",
        image: "https://via.placeholder.com/600x400",
        link: "https://bistro-boss-3f8f9.web.app",
        tech: ["React", "Tailwind", "Stripe"],
    },
    {
        id: 3,
        title: "Donation Hub",
        description: "A responsive app to facilitate charitable donations.",
        image: "https://via.placeholder.com/600x400",
        link: "https://a-crowd-funding-applicat-7547d.web.app/",
        tech: ["React", "JavaScript", "CSS"],
    },
    {
        id: 4,
        title: "ToDo Task Manager",
        description: "Manage daily tasks with a modern, intuitive interface.",
        image: "https://via.placeholder.com/600x400",
        link: "https://todo-task-df621.web.app/",
        tech: ["React", "Node.js", "MongoDB"],
    },
];

const Portfolio = () => {
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
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                    >
                        {/* Image */}
                        <div className="relative group">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <a
                                href={project.link}
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
                            <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">{project.description}</p>

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#E6F0FF] text-[#2974FF] px-3 py-1 rounded-full text-xs font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
