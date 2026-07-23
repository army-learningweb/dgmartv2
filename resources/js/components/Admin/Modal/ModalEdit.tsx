import ModalLayout from "./ModalLayout"

interface ModalEditProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode
    title: string;
    labelSubmit: string;
    customSize: string;
    onClose: () => void;
    isOpen: boolean,
    formSubmitId:string
    processing: boolean
}

export default function ModalEdit({ customSize, title, labelSubmit, onClose, isOpen, formSubmitId, processing, children }: ModalEditProps) {
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