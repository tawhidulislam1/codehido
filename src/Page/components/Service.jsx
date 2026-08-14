import React from 'react';
import { GrHostMaintenance } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import Card from '../../Commonents/Card';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Service = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['home-services'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/service');
            return res.data;
        },
    });

    const visibleServices = services.slice(0, 4).map((service) => ({
        ...service,
        icon: service.icon || GrHostMaintenance,
    }));

    return (
        <div>
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Our Services
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                            We deliver reliable, high-quality solutions to help your business grow.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8 text-blue-600">Loading services...</div>
                    ) : isError ? (
                        <div className="text-center py-8 text-red-500">Failed to load services.</div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleServices.map((service, idx) => (
                                <Card service={service} key={service._id || idx}></Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Service;