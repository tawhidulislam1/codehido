import { FaSearch } from "react-icons/fa";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <label className="relative block w-full md:w-72">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#64748B]">
                <FaSearch size={14} />
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-[#E2E8F0] bg-white pl-10 pr-3 py-2.5 rounded-xl text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#DBEAFE] focus:border-[#2974FF] shadow-sm"
            />
        </label>
    );
};

export default SearchInput;
