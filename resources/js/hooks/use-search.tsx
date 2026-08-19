import axios from 'axios';
import toast from 'react-hot-toast';
import { useRef, useState } from 'react';

interface initialDataProps {
    id: string | number;
    name: string
}

interface useSearchProps {
    handleQueryFilter: any;
    search: string;
    initialData: initialDataProps[];
    placeholder: string;
    routeGetData: string;
}

export const useSearch = ({
    handleQueryFilter,
    search,
    initialData,
    placeholder,
    routeGetData
}: useSearchProps) => {

    // Tìm kiếm
    const [querySearch, setQuerySearch] = useState<string>(search ?? '');
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [dataSuggest, setDataSuggest] = useState(initialData ?? []);
    const [placeholderSearch, setPlaceholderSearch] = useState<string>(placeholder);

    const timeOutRef = useRef<number | undefined>(null);

    const handleQuerySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setQuerySearch(query);
        setLoadingSearch(true);

        if (timeOutRef.current) clearTimeout(timeOutRef.current);

        timeOutRef.current = setTimeout(async () => {
            try {
                const res = await axios.get(
                    routeGetData,
                    {
                        params: { search: query },
                    },
                );
                setDataSuggest(res.data);
                setLoadingSearch(false);
            } catch (error) {
                toast.error('Đã xảy ra lỗi vui lòng thử lại sau');
            }
        }, 350);
    };

    const handleSetPlaceHolder = (name: string) => {
        setPlaceholderSearch(name.toLowerCase());
    };

    const handleClearQuerySearch = () => {
        setQuerySearch('');
        setPlaceholderSearch(placeholder);
        handleQueryFilter({ search: '' });
        setDataSuggest(initialData);
    };

    const handleFocusSearch = () => {
        setOpenSuggest(true);
    };

    const handleBlurSearch = () => {
        setOpenSuggest(false);
    };

    const handleChoose = async (name: string) => {
        const lowerName = name.toLowerCase();
        handleQueryFilter({ search: lowerName });
        setQuerySearch(lowerName);
        try {
            const res = await axios.get(
                routeGetData,
                {
                    params: { search: lowerName },
                },
            );

            setDataSuggest(res.data);
            setLoadingSearch(false);
        } catch (error) {
            toast.error('Đã xảy ra lỗi vui lòng thử lại sau');
        }
    };

    const handleLeave = () => {
        setPlaceholderSearch(placeholder);
    };

    // Gợi ý tìm kiếm
    const [openSuggest, setOpenSuggest] = useState<boolean>(false);

    return {
        querySearch,
        loadingSearch,
        dataSuggest,
        placeholderSearch,
        openSuggest,
        handleQuerySearch,
        handleClearQuerySearch,
        handleBlurSearch,
        handleSetPlaceHolder,
        handleChoose,
        handleLeave,
        handleFocusSearch
    };
};
