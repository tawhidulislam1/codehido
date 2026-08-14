const PaginationControls = ({ page, totalPages, onPageChange }) => {
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    return (
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrevious}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-sm font-medium text-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors"
            >
                Previous
            </button>

            <p className="text-sm font-medium text-[#475569]">
                Page <span className="font-semibold text-[#0F172A]">{page}</span> of <span className="font-semibold text-[#0F172A]">{totalPages || 1}</span>
            </p>

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-sm font-medium text-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
