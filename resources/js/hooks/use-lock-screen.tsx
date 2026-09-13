import { useEffect } from 'react';

interface useLockSscreenProps {
    openModal: boolean;
}

export const useLockSscreen = ({ openModal }: useLockSscreenProps) => {
    useEffect(() => {
        if (openModal) {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [openModal]);
};
