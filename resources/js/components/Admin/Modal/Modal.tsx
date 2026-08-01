import ModalLayout from "./ModalLayout"

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode
    title: string;
    labelSubmit: string;
    customSize: string;
    onClose: () => void;
    isOpen: boolean,
    formSubmitId:string
    processing: boolean
}

export default function Modal({ customSize, title, labelSubmit, onClose, isOpen, formSubmitId, processing, children }: ModalProps) {
    return (
        <ModalLayout
            customSize={customSize}
            title={title}
            labelSubmit={labelSubmit}
            onClose={onClose}
            isOpen={isOpen}
            formSubmitId={formSubmitId}
            processing={processing}>
                
            {children}
        </ModalLayout>
    )
}