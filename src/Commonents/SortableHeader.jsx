import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const SortableHeader = ({ label, active = false, direction = "asc", onClick }) => {
    const showAscIcon = !active || direction === "asc";

    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 text-left font-semibold uppercase tracking-wide text-[#0F172A] hover:text-[#2974FF] transition-colors"
        >
            <span>{label}</span>
            <span className="flex items-center justify-center text-[10px]">
                {active ? (
                    direction === "asc" ? (
                        <FaArrowUp className="text-[#2974FF]" />
                    ) : (
                        <FaArrowDown className="text-[#2974FF]" />
                    )
                ) : (
                    <>
                        <FaArrowUp className={showAscIcon ? "text-[#94A3B8]" : "text-[#CBD5E1]"} />
                        <FaArrowDown className={showAscIcon ? "text-[#CBD5E1]" : "text-[#94A3B8]"} />
                    </>
                )}
            </span>
        </button>
    );
};

export default SortableHeader;
