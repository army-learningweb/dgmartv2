import { useRef, useEffect } from "react";

interface InputFocusProps {
    openModal: boolean
}

const useInputFocus = ({ openModal } : InputFocusProps) => {
    const ipRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (openModal) {
            if (ipRef.current) {
                ipRef.current.focus();
            }
        }
    }, [openModal]);

    return {ipRef}
};

export { useInputFocus };
