import { useState } from "react";
import { router } from "@inertiajs/react";

interface useFilterProps {
    route: string,
    initialsFilter: Record<string, {}>
    onlyLoad: string[];
}

export const useFilter = ({ route, initialsFilter, onlyLoad }: useFilterProps) => {
    const [queryFilters, setQueryFilters] = useState(initialsFilter)
    const handleQueryFilter = (query: {}) => {
        const mergedQuery = { ...queryFilters, ...query };
        setQueryFilters(mergedQuery);

        const requestFilters = Object.fromEntries(
            Object.entries(mergedQuery).filter(([, v]) => v !== null && v !== undefined && v !== '')
        ) as any;

        router.get(route, requestFilters, {
            preserveState: true,
            only: onlyLoad
        })
    }

    return { handleQueryFilter }
}