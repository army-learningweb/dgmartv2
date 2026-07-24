import { useState } from "react";
import { router } from "@inertiajs/react";

interface useFilterProps {
    querySearch: string | null,
    setQueryFilter: (value: string | null) => void;
}

export const useFilter = ({ querySearch, setQueryFilter }: useFilterProps) => {
    const handleQueryFilter = (filterValue: string | null) => {
        setQueryFilter(filterValue);
        router.get("/admin/users", {
            ...(querySearch !== "" ? { search: querySearch } : {}),
            ...(filterValue ? { filter: filterValue } : {})
        }, {
            preserveState: true
        })
    }
    return { handleQueryFilter }
}