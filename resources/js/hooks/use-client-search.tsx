import { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLockSscreen } from './use-lock-screen';

export const useClientSearch = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [querySearch, setQuerySearch] = useState<string>('');
    const [dataSearch, setDataSearch] = useState<any[]>([]);
    const queryRef = useRef<any>('');
    const ipRef = useRef<any>(null);

    const { url } = usePage();

    // Khóa scroll khi mở Modal Search
    useLockSscreen({openModal});

    // Tự động focus input khi mở Modal
    useEffect(() => {
        if (ipRef.current && openModal) {
            ipRef.current.focus();
        }
    }, [openModal]);

    // Đóng Modal khi chuyển trang
    useEffect(() => {
        setOpenModal(false);
        setQuerySearch('');
        setTimeout(() => {
            setDataSearch([]);
        }, 300);
    }, [url]);

    // Mở Modal bằng phím tắt
    useEffect(() => {
        const pressKeyOpenModal = (e: KeyboardEvent) => {
            if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                if (openModal) return;
                handleOpenModal();
            }

            if (e.key === 'Escape' && openModal) {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', pressKeyOpenModal);
        return () => window.removeEventListener('keydown', pressKeyOpenModal);
    }, [openModal]);

    // Xử lí tìm kiếm
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setQuerySearch(searchValue);
        setIsLoading(true);

        if (queryRef.current) clearTimeout(queryRef.current);
        queryRef.current = setTimeout(async () => {
            try {
                const res = await axios.get(`/searchProduct`, {
                    params: { search: searchValue },
                });
                setDataSearch(res.data);
                setIsLoading(false);
            } catch (error) {
                toast.error('Lỗi ! không thể tìm kiếm sản phẩm');
            }
        }, 400);
    };

    // Xóa tìm kiếm
    const handleClearSearch = async () => {
        setQuerySearch('');
        try {
            const res = await axios.get(`/searchProduct`, {
                params: { search: '' },
            });
            setDataSearch(res.data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Lỗi ! không thể tìm kiếm sản phẩm');
        }
    };

    // Mở modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Đóng modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setQuerySearch('');
        setTimeout(() => {
            setDataSearch([]);
        }, 300);
    };

    return {
        ipRef,
        querySearch,
        dataSearch,
        isLoading,
        openModal,
        handleOpenModal,
        handleCloseModal,
        handleClearSearch,
        handleSearch,
    };
};
