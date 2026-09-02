import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export const usePrevPage = () => {
    const { url } = usePage();
    const [queryString, setQueryString] = useState<string | null>(null);
    const params = url.split('?')[1];

    useEffect(() => {
        setQueryString(params);
    }, [url]);

    return { queryString };
};
