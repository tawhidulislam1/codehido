import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ViewDetailsButton({ to, className = "" }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(to)}
            aria-label="View Details"
            title="View Details"
            className={`inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 ${className}`}
        >
            <Eye size={16} />
        </button>
    );
}
