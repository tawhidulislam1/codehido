import { useEffect, useState } from "react";

const useTableControls = ({ defaultLimit = 10 } = {}) => {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [filterValue, setFilterValue] = useState("all");
    const [sort, setSortState] = useState("");
    const [page, setPage] = useState(1);
    const limit = defaultLimit;

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [searchInput]);

    const setSearchValue = (value) => {
        setSearchInput(value);
        setPage(1);
    };

    const setFilterValueWrapper = (value) => {
        const nextValue = typeof value === "function" ? value(filterValue) : value;
        setFilterValue(nextValue);
        setPage(1);
    };

    const setSort = (value) => {
        const nextSort = typeof value === "function" ? value(sort) : value;
        setSortState(nextSort);
        setPage(1);
    };

    return {
        search,
        setSearch: setSearchValue,
        filterValue,
        setFilterValue: setFilterValueWrapper,
        sort,
        setSort,
        page,
        setPage,
        limit,
    };
};

export default useTableControls;
