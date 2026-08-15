import { useQuery } from "@tanstack/react-query";
import { FaFolderOpen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";
import useDeveloper from "../../../Hooks/useDeveloper";
import ViewDetailsButton from "../../../Commonents/ViewDetailsButton";

const normalizeProjectList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === "object") {
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.result)) return payload.result;
        if (Array.isArray(payload.projects)) return payload.projects;
    }
    return [];
};

const formatStack = (stack) => {
    if (!Array.isArray(stack)) return "-";
    return stack.join(", ");
};

const pickDeveloperNames = (assignedDevelopers) => {
    if (!Array.isArray(assignedDevelopers)) return "-";

    return assignedDevelopers
        .map((dev) => (typeof dev === "string" ? dev : dev?.name))
        .filter(Boolean)
        .join(", ") || "-";
};

const getStatusClass = (status) => {
    const s = (status || "").toString().toLowerCase();
    switch (s) {
        case "complete":
        case "completed":
            return "bg-green-100 text-green-800";
        case "cancel":
        case "cancelled":
            return "bg-red-100 text-red-800";
        case "30%":
        case "50%":
        case "75%":
        case "90%":
            return "bg-yellow-100 text-yellow-800";
        case "revision":
            return "bg-indigo-100 text-indigo-800";
        case "design":
        case "development":
        case "qa":
        case "deploy":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export default function ProjectList() {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isDeveloper] = useDeveloper();
    const isDeveloperRole = !isAdmin && Boolean(isDeveloper);

    const { data: projects = [], isPending, refetch } = useQuery({
        queryKey: ["admin-project-list"],
        queryFn: async () => {
            const res = await axiosSecure.get("/project");
            return normalizeProjectList(res.data);
        },
    });

    const handleDelete = async (id, name) => {
        const result = await Swal.fire({
            title: "Delete project?",
            text: `This will permanently remove ${name || "this project"}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2974FF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/project/${id}`);
            Swal.fire({
                title: "Deleted!",
                text: "Project removed successfully.",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
            refetch();
        } catch (error) {
            Swal.fire({
                title: "Delete failed",
                text: error?.response?.data?.message || error.message,
                icon: "error",
            });
        }
    };

    if (isPending) {
        return <div className="flex h-64 items-center justify-center text-[#2974FF] font-semibold">Loading projects...</div>;
    }

    if (projects.length === 0) {
        return (
            <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-8 text-center shadow-xl">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaFolderOpen size={22} />
                </div>
                <h2 className="text-xl font-semibold text-[#0F172A]">No projects found</h2>
                <p className="mt-2 text-sm text-[#475569]">Create a new project to get started.</p>
                {!isDeveloperRole && (
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/project/add")}
                        className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add Project
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-[#E6F0FF] bg-[#F5FAFF] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-[#0F172A] sm:text-3xl">Projects</h2>
                    <p className="mt-1 text-sm text-[#475569]">Total projects: {projects.length}</p>
                </div>

                {!isDeveloperRole && (
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/project/add")}
                        className="rounded-xl bg-[#2974FF] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1558D6]"
                    >
                        Add Project
                    </button>
                )}
            </div>

            <div className="hidden overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white shadow-md md:block">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#E6F0FF] text-xs uppercase tracking-wide text-[#0F172A]">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Stack</th>
                            <th className="px-6 py-4">Developers</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id || index} className="border-b border-[#E2E8F0] transition hover:bg-[#F8FAFC]">
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(project.status)}`}>
                                        {project.status || "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-[#0F172A]">{project.name || "N/A"}</td>
                                <td className="px-6 py-4 text-[#475569]">{project.price !== undefined ? `$${project.price}` : "N/A"}</td>
                                <td className="px-6 py-4 text-[#475569]">{project.duration || "N/A"}</td>
                                <td className="px-6 py-4 text-[#475569]">{formatStack(project.stack)}</td>
                                <td className="px-6 py-4 text-[#475569]">{pickDeveloperNames(project.assignedDevelopers)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <ViewDetailsButton to={`/dashboard/project/${project._id}`} className="px-2 py-1 text-[10px]" />
                                        {!isDeveloperRole && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/dashboard/project/edit/${project._id}`)}
                                                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(project._id, project.name)}
                                                    className="text-red-500 transition hover:text-red-700"
                                                    title="Delete project"
                                                    aria-label="Delete project"
                                                >
                                                    <FaTrashAlt size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                    <div className="mt-6 grid gap-4 md:hidden">
                {projects.map((project, index) => (
                    <div key={project._id || index} className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                                        <div className="flex items-center gap-3">
                                            <p className="font-semibold text-[#0F172A]">{project.name || "N/A"}</p>
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(project.status)}`}>{project.status || 'N/A'}</span>
                                        </div>
                                        <p className="text-sm text-[#475569]">{project.duration || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ViewDetailsButton to={`/dashboard/project/${project._id}`} className="px-2 py-1 text-[10px]" />
                                {!isDeveloperRole && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/project/edit/${project._id}`)}
                                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(project._id, project.name)}
                                            className="text-red-500 transition hover:text-red-700"
                                            title="Delete project"
                                            aria-label="Delete project"
                                        >
                                            <FaTrashAlt size={15} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-[#475569]">
                            <p><span className="font-medium text-[#0F172A]">Price:</span> {project.price !== undefined ? `$${project.price}` : "N/A"}</p>
                            <p><span className="font-medium text-[#0F172A]">Stack:</span> {formatStack(project.stack)}</p>
                            <p><span className="font-medium text-[#0F172A]">Developers:</span> {pickDeveloperNames(project.assignedDevelopers)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
