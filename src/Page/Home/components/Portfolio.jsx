import { useState } from "react";

const Portfolio = () => {
    const categories = ["All", "Web Design", "Development", "Branding"];

    const projects = [
        {
            title: "Creative Website Design",
            desc: "A sleek, modern design for a startup.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Web Design",
        },
        {
            title: "E-commerce Development",
            desc: "Fully functional online store with payment integration.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Development",
        },
        {
            title: "Brand Identity",
            desc: "Complete branding package for a corporate client.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Branding",
        },
        {
            title: "Portfolio Website",
            desc: "Personal website showcasing creative work.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Web Design",
        },
        {
            title: "Web App Development",
            desc: "Custom SaaS dashboard for business analytics.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Development",
        },
        {
            title: "Logo & Stationery",
            desc: "Branding kit for a new business.",
            image: "https://bugbuild.com/frontend/img/banner/banner-4.png",
            category: "Branding",
        },
    ];

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">

                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-[#0F172A] mb-12">
                    Recent <span className="text-[#2974FF]">Projects</span>
                </h2>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-[#2974FF] text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(({ title, desc, image }, idx) => (
                        <div
                            key={idx}
                            className="relative group rounded-xl overflow-hidden shadow-lg"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center px-4">
                                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                                <p className="text-gray-200 text-sm mb-4">{desc}</p>
                                <a
                                    href="#"
                                    className="px-4 py-2 bg-[#2974FF] text-white rounded-lg shadow hover:bg-[#1558D6] transition-all"
                                >
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Portfolio;