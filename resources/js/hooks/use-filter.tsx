import { useState } from "react";
import { router } from "@inertiajs/react";

interface useFilterProps {
    querySearch: string | null,
    setQueryFilter: (value: string | null) => void;
    route: string
}

export const useFilter = ({ querySearch, setQueryFilter, route }: useFilterProps) => {
    const handleQueryFilter = (filterValue: string | null) => {
        setQueryFilter(filterValue);
        router.get(route, {
            ...(querySearch !== "" ? { search: querySearch } : {}),
            ...(filterValue ? { filter: filterValue } : {})
        }, {
            preserveState: true
        })
    }
    return { handleQueryFilter }
}