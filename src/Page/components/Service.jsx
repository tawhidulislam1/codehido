import React from 'react';
import { GrHostMaintenance } from 'react-icons/gr';
import Card from '../../Commonents/Card';

const Service = () => {
    const services = [
        {
            "title": "Support & Maintenance",
            "description": "Support & Maintenance involves the ongoing management, monitoring, and...",
            "icon": GrHostMaintenance,
        },
        {
            "title": "Project Management",
            "description": "Project Management involves the planning, organization, and execution...",
            "icon": GrHostMaintenance,

        },
        {
            "title": "Software Development",
            "description": "Software Development involves the creation of custom applications, pro...",
            "icon": GrHostMaintenance,

        },
        {
            "title": "E-commerce Solutions",
            "description": "E-commerce Solutions involve the development of online platforms that...",
            "icon": GrHostMaintenance,
        }]
    return (
        <div>
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Our Services
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                            We deliver reliable, high-quality solutions to help your business grow.
                        </p>
                    </div>

                    {/* Card Grid */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service, idx) => (
                            <Card service={service} key={idx}></Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Service;