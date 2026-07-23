import Button from "@/components/ui/Button"

interface ModaFooterProps{
    labelSubmit : string;
    onClose: () => void;
    formSubmitId:string;
    processing:boolean;
}

export default function ModalFooter({labelSubmit, formSubmitId, processing, onClose} : ModaFooterProps) {
    return (
        <footer className="flex items-center justify-end gap-2 mt-3">
            <Button onClick={onClose} size="small" variant="outline">Đóng</Button>
            <Button form={formSubmitId} 
            type="submit" 
            size="small"
            processing={processing}
            processingLabel="Đang xử lí..."
            >
                {labelSubmit}
            </Button>
        </footer>
    )
}