import Button from "@/components/ui/Button"
import { Pen } from "lucide-react"

interface ButtonEditProps {
    onEdit: () => void;
}

export default function ButtonEdit({ onEdit }: ButtonEditProps) {
    return (
        <Button
            onClick={onEdit}
            variant="outline"
            size="small"
            animatePress={true}
        >
            <Pen
                size={13}
                className="text-gray-400"
            />
            <span>Chỉnh sửa</span>
        </Button>
    )
}