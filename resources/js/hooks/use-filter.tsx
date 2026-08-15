import { useRef, useState } from 'react';
import { router } from '@inertiajs/react';

interface useFilterProps {
    route: string;
    initialsFilter: Record<string, {}>;
    onlyLoad: string[];
    debounce: string[];
}

export const useFilter = ({
    route,
    initialsFilter,
    onlyLoad,
    debounce,
}: useFilterProps) => {

    // Loading state
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [isCountResult, setIsCountResult] = useState<boolean>(false);

    // Filter
    const [queryFilters, setQueryFilters] = useState(initialsFilter);
    const timeOutRef = useRef<number | undefined>(null);

    const handleQueryFilter = (query: {}, skipDebounce = false) => {
        const mergedQuery = { ...queryFilters, ...query };
        setQueryFilters(mergedQuery);

        const requestFilters = Object.fromEntries(
            Object.entries(mergedQuery).filter(
                ([, q]) => q !== null && q !== undefined && q !== '',
            ),
        ) as any;

        const handleSendRequest = () => {
            setLoadingSearch(true);
            router.get(route, requestFilters, {
                preserveState: true,
                only: onlyLoad,
                onFinish: () => {
                    setLoadingSearch(false);
                    setIsCountResult(true);
                },
            });
        };

        const isDebounce = Object.keys(query).some((key) =>
            debounce.includes(key),
        ) && !skipDebounce;

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        }

        if (isDebounce) {
            timeOutRef.current = setTimeout(() => {
                handleSendRequest();
            }, 400);
        } else {
            handleSendRequest();
        }
    };

    return {
        handleQueryFilter,
        loadingSearch,
        isCountResult,
    };
};
