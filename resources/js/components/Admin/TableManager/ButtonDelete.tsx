import Button from "@/components/ui/Button"
import { Trash } from "lucide-react"

interface ButtonDeleteProps {
    onDelete: () => void
}

export default function ButtonDelete({ onDelete }: ButtonDeleteProps) {
    return (
        <Button
            onClick={onDelete}
            variant="outline"
            size="small"
            animatePress={true}
        >
            <Trash
                size={13}
                className="text-gray-400"
            />
            <span>Xóa</span>
        </Button>
    )
}