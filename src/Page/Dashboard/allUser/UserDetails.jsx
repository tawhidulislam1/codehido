import { ArrowLeft, Mail, ShieldCheck, UserCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const normalizeUser = (data) => {
    if (!data) return {};
    if (Array.isArray(data)) return data[0] || {};
    if (data.data && typeof data.data === "object") return data.data;
    if (data.result && typeof data.result === "object") return data.result;
    return data;
};

const getProfileImage = (user) => {
    if (!user || typeof user !== "object") return "";

    return (
        user.photoURL ||
        user.photo ||
        user.avatar ||
        user.avatarUrl ||
        user.image ||
        user.imageUrl ||
        user.profileImage ||
        ""
    );
};

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data, isPending, error } = useQuery({
        queryKey: ["dashboard-user", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${id}`);
            return normalizeUser(res.data);
        },
        enabled: !!id,
    });

    const profileImage = getProfileImage(data);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                    <p className="mt-4 text-sm font-medium text-slate-600">Loading user profile...</p>
                </div>
            </div>
        );
    }

    if (error || !data || Object.keys(data).length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
                <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-600">User not found</h2>
                    <p className="mt-2 text-slate-600">The requested user could not be loaded.</p>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/users")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Back to users
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
            <div className="mx-auto max-w-5xl">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/users")}
                    className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    title="Back to Users"
                    aria-label="Back to Users"
                >
                    <ArrowLeft size={16} />
                    Back to users
                </button>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    <section className="border-b border-slate-200 bg-slate-50 px-6 py-10 sm:px-8">
                        <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
                            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-100 shadow-md sm:mb-0 sm:h-28 sm:w-28">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={data.name || "User profile"}
                                        className="h-full w-full object-cover"
                                        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.innerHTML = '<div class=\"flex h-full w-full items-center justify-center text-blue-600\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21a8 8 0 0 0-16 0\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg></div>'; }}
                                    />
                                ) : (
                                    <UserCircle2 className="h-14 w-14 text-blue-600" />
                                )}
                            </div>

                            <div className="sm:ml-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">User Profile</p>
                                <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">{data.name || "Unnamed User"}</h1>
                                <p className="mt-1 text-sm text-slate-500">{data.email || "No email available"}</p>
                                <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
                                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                                        {data.role || "user"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
                        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <h2 className="mb-4 text-lg font-semibold text-slate-800">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                                    <Mail size={18} className="mt-0.5 text-blue-600" />
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{data.email || "Not provided"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                                    <ShieldCheck size={18} className="mt-0.5 text-blue-600" />
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{data.role || "User"}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <h2 className="mb-4 text-lg font-semibold text-slate-800">Account Information</h2>
                            <div className="space-y-4">
                                {data.uid && (
                                    <div className="rounded-xl bg-white p-3 shadow-sm">
                                        <p className="text-xs uppercase tracking-wide text-slate-500">User ID</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700 break-all">{data.uid}</p>
                                    </div>
                                )}
                                {data.createdAt && (
                                    <div className="rounded-xl bg-white p-3 shadow-sm">
                                        <p className="text-xs uppercase tracking-wide text-slate-500">Created At</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{new Date(data.createdAt).toLocaleString()}</p>
                                    </div>
                                )}
                                {data.updatedAt && (
                                    <div className="rounded-xl bg-white p-3 shadow-sm">
                                        <p className="text-xs uppercase tracking-wide text-slate-500">Updated At</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{new Date(data.updatedAt).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
