import { useState, useRef } from "react";
import { router } from "@inertiajs/react";

interface useSearchProps {
    setQuerySearch: (value:string) => void;
    queryFilter: string | null;
}

export const useSearch = ({setQuerySearch, queryFilter} : useSearchProps) => {
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
    const queryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const handleQuerySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuerySearch(e.target.value.toLowerCase());
        setIsLoadingSearch(true);
        const query = e.target.value.toLowerCase();
        if (queryRef.current) clearTimeout(queryRef.current)
        queryRef.current = setTimeout(() => {
            router.get("/admin/users", {
                ...(query !== "" ? { search: query } : {}),
                ...(queryFilter !== null ? { filter: queryFilter } : {})
            },{
                preserveState: true,
                onFinish: () => setIsLoadingSearch(false)
            })
        }, 350)
    }

    const handleClearSearch = () => {
        setQuerySearch("");
        router.get("/admin/users", {
            ...(queryFilter ? { filter: queryFilter } : {})
        }, {
            preserveState: true
        })
    }

    return {isLoadingSearch, handleQuerySearch, handleClearSearch}
}