import { motion } from "framer-motion";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDetailsLayout({
    title,
    subtitle,
    image,
    backTo,
    backLabel = "Back to list",
    actions = [],
    status,
    children,
}) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-auto max-w-5xl"
            >
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(backTo)}
                        className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        <FaArrowLeft className="text-xs" />
                        {backLabel}
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={action.onClick}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                    action.variant === "primary"
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : action.variant === "danger"
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {action.label === "Edit" && <FaEdit className="text-xs" />}
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    {image && (
                        <div className="border-b border-slate-200 bg-slate-100">
                            <img src={image} alt={title} className="h-72 w-full object-cover sm:h-80" />
                        </div>
                    )}

                    <div className="p-6 sm:p-8">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Details</p>
                                <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">{title}</h1>
                                {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
                            </div>

                            {status && (
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                                        status === "active" || status === "published" || status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : status === "inactive" || status === "draft" || status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-blue-100 text-blue-700"
                                    }`}
                                >
                                    {status}
                                </span>
                            )}
                        </div>

                        {children}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
