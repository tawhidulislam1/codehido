import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function EditTeamMember() {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPublic.get(`/dashboard/team/${id}`);
            reset(res.data);
        };

        fetchData();
    }, [axiosPublic, id, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: data.name,
                role: data.role,
                image: data.image,
                details: data.details,
                facebook: data.facebook,
                twitter: data.twitter,
                linkedin: data.linkedin,
            };

            const res = await axiosSecure.put(`/dashboard/team/${id}`, payload);

            if (res.data.modifiedCount > 0 || res.data.acknowledged) {
                Swal.fire({
                    title: "Success!",
                    text: "Team Member Updated Successfully.",
                    icon: "success",
                    timer: 1500,
                });
                navigate("/dashboard/team");
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error",
            });
        }
    };

    return (
        <div className="w-full flex justify-center py-10">
            <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Edit Team Member
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Role</label>
                        <input
                            type="text"
                            {...register("role", { required: true })}
                            placeholder="Frontend Developer, UI/UX Designer..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            {...register("image", { required: true })}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Details</label>
                        <input
                            type="text"
                            {...register("details", { required: true })}
                            placeholder="I am frontend developer i do work from..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-700 mt-4">
                        Social Links
                    </h3>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Facebook URL
                        </label>
                        <input
                            type="text"
                            {...register("facebook")}
                            placeholder="https://facebook.com/username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Twitter URL
                        </label>
                        <input
                            type="text"
                            {...register("twitter")}
                            placeholder="https://twitter.com/username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            LinkedIn URL
                        </label>
                        <input
                            type="text"
                            {...register("linkedin")}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        Update Member
                    </button>
                </form>
            </div>
        </div>
    );
}
