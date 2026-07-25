import ModalHeader from './ModalHeader';
import ModalFooter from './ModaFooter';
import clsx from 'clsx';

interface ModalLayoutProps {
    children: React.ReactNode;
    title: string;
    labelSubmit: string;
    customSize: string;
    onClose: () => void;
    isOpen: boolean;
    formSubmitId: string;
    processing: boolean;
}

export default function ModalLayout({
    customSize,
    title,
    labelSubmit,
    children,
    onClose,
    isOpen,
    formSubmitId,
    processing,
}: ModalLayoutProps) {
    return (
        <div className={clsx(
            'transition-tranform fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-xs duration-150',
            {
                'pointer-events-none opacity-0': !isOpen,
                'pointer-events-auto opacity-100': isOpen,
            },
        )}
        >
            <div className={clsx(
                    `${customSize} transition-tranform rounded-3xl bg-gray-100 p-1.5 shadow-md duration-150 ease-out border border-gray-200`,{
                        'pointer-events-none scale-95 opacity-0': !isOpen,
                        'pointer-events-auto scale-100 opacity-100': isOpen,
                    },
                )}
            >
                <div className="flex h-full w-full flex-col rounded-[18px] bg-white p-3">
                    <ModalHeader title={title} onClose={onClose} />
                    <hr className="my-2 border-gray-100" />
                    <main className="flex-1">{children}</main>
                    <ModalFooter
                        labelSubmit={labelSubmit}
                        onClose={onClose}
                        formSubmitId={formSubmitId}
                        processing={processing}
                    />
                </div>
            </div>
        </div>
    );
}
