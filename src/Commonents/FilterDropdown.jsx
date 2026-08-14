const FilterDropdown = ({ value, onChange, options = [], label = "Filter" }) => {
    return (
        <label className="flex flex-col gap-1 text-sm text-[#475569] w-full md:w-48">
            <span className="font-medium text-[#0F172A]">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-[#E2E8F0] bg-white px-3 py-2.5 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#DBEAFE] focus:border-[#2974FF] shadow-sm"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default FilterDropdown;
