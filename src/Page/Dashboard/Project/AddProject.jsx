import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";

const normalizeDevelopers = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === "object") {
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.result)) return payload.result;
        if (Array.isArray(payload.users)) return payload.users;
    }
    return [];
};

export default function AddProject() {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        details: "",
        price: "",
        referenceProject: "",
        duration: "",
        stack: "",
        status: "30%",
        assignedDevelopers: [],
    });

    const [isAdmin] = useAdmin();

    const { data: developers = [] } = useQuery({
        queryKey: ["developer-options"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user", { params: { role: "developer" } });
            return normalizeDevelopers(res.data);
        },
    });

    const handleCheckbox = (id) => {
        setFormData((prev) => {
            const exists = prev.assignedDevelopers.includes(id);
            return {
                ...prev,
                assignedDevelopers: exists
                    ? prev.assignedDevelopers.filter((item) => item !== id)
                    : [...prev.assignedDevelopers, id],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const stack = formData.stack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        if (!formData.name || !formData.details || formData.price === "" || !formData.duration || !stack.length || !formData.status) {
            Swal.fire({
                title: "Required fields missing",
                text: "Name, details, price, duration and stack are required.",
                icon: "warning",
            });
            return;
        }

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stack,
                assignedDevelopers: formData.assignedDevelopers,
                referenceProject: formData.referenceProject || null,
            };
            // Only include status if creator is admin; backend will enforce otherwise.
            if (isAdmin) payload.status = formData.status;

            await axiosSecure.post("/project", payload);

            Swal.fire({
                title: "Project created!",
                text: "The new project was added successfully.",
                icon: "success",
                timer: 1400,
                showConfirmButton: false,
            });
            navigate("/dashboard/project");
        } catch (error) {
            Swal.fire({
                title: "Create failed",
                text: error?.response?.data?.message || error.message,
                icon: "error",
            });
        }
    };

    return (
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#E6F0FF] bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Project</p>
                    <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">Add Project</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">Project name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="Project name"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">Details</label>
                        <textarea
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            rows={5}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="Project details"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="2500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Duration</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="3 months"
                        />
                    </div>

                    {isAdmin && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="30%">30%</option>
                                <option value="50%">50%</option>
                                <option value="75%">75%</option>
                                <option value="90%">90%</option>
                                <option value="revision">Revision</option>
                                <option value="complete">Complete</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">Stack</label>
                        <input
                            type="text"
                            value={formData.stack}
                            onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">Reference project URL</label>
                        <input
                            type="url"
                            value={formData.referenceProject}
                            onChange={(e) => setFormData({ ...formData, referenceProject: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="mb-3 block text-sm font-medium text-slate-700">Assigned developers</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {developers.length === 0 ? (
                            <p className="text-sm text-slate-500">No developer users found.</p>
                        ) : (
                            developers.map((dev) => (
                                <label key={dev._id} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.assignedDevelopers.includes(dev._id)}
                                        onChange={() => handleCheckbox(dev._id)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    {dev.name || dev.email || dev._id}
                                </label>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/project")}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-xl bg-[#2974FF] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1558D6]"
                    >
                        Save Project
                    </button>
                </div>
            </form>
        </div>
    );
}
