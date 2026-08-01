import { Plus } from "lucide-react"
import Button from "@/components/ui/Button"

interface ButtonCreateProps {
    onOpenModal : () => void;
}

export default function ButtonCreate({onOpenModal} : ButtonCreateProps) {
    return (
        <Button
            onClick={onOpenModal}
            animatePress={true}
            size="small"
        >
            <Plus size={15} />
            <span>Thêm mới </span>
        </Button>
    )
}