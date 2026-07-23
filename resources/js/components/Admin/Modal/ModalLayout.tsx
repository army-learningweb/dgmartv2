import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModaFooter";
import clsx from "clsx";

interface ModalLayoutProps {
    children: React.ReactNode;
    title: string;
    labelSubmit: string;
    customSize: string;
    onClose: () => void;
    isOpen: boolean;
    formSubmitId:string;
    processing:boolean;
}

export default function ModalLayout({ customSize, title, labelSubmit, children, onClose, isOpen, formSubmitId, processing }: ModalLayoutProps) {
    return (
        <div className={clsx("fixed bg-black/30 top-0 left-0 w-full h-full z-40 flex items-center justify-center transition-tranform duration-150", {
            "pointer-events-none opacity-0": !isOpen,
            "pointer-events-auto opacity-100": isOpen
        })}>
            <div className={clsx(`${customSize} bg-gray-100 rounded-3xl p-1.5 transition-tranform duration-150`,{
                "pointer-events-none opacity-0 scale-95" :!isOpen,
                "pointer-events-auto opacity-100 scale-100" : isOpen
            })}>
                <div className="w-full h-full bg-white rounded-[18px] p-3 flex flex-col">
                    <ModalHeader title={title} onClose={onClose} />
                    <hr className="border-gray-100 my-3"/>
                    <main className="flex-1">
                        {children}
                    </main>
                    <ModalFooter labelSubmit={labelSubmit} onClose={onClose} formSubmitId={formSubmitId} processing={processing}/>
                </div>
            </div>
        </div>
    )
}