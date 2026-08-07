import { useState } from "react";

interface useModalCreateProps {
    reset: () => void,
    clearErrors : () => void,
}

export const useModal = ({reset, clearErrors} : useModalCreateProps)  => {
    const [openModal, setOpenModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState<boolean>(false);

    // Mở modal
    const handleOpenModal = () => {
        setOpenModal(true);
        setIsEditModal(false);
    };

    // Đóng modal
    const handleCloseModal = () => {
        setOpenModal(false);

        setTimeout(() => {
            clearErrors();
            reset();
        }, 300);
    };

    return {openModal, isEditModal, setIsEditModal, setOpenModal, handleOpenModal, handleCloseModal}

}