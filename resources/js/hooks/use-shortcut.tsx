import { useEffect } from "react";

interface UseShortCutProps {
    openModal : boolean;
    handleCloseModal : () => void;
    handleOpenModal : () => void;
}

const useShortCut = ({
    openModal,
    handleCloseModal,
    handleOpenModal,
}: UseShortCutProps) => {

    // Phím tắt tạo mới
    useEffect(() => {
        const handleCreateShortCut = (e: KeyboardEvent) => {
            if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                if (openModal) return;
                handleOpenModal();
            }

            if (e.key === 'Escape' && openModal) {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleCreateShortCut);
        return () =>
            window.removeEventListener('keydown', handleCreateShortCut);
    }, [openModal]);
};

export { useShortCut };
