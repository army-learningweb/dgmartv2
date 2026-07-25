import { ChevronDown } from "lucide-react"

interface SelectProps {
    onSetData: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    statusData?: 'active' | 'inactive';
}

export default function Select({ onSetData, statusData }: SelectProps) {
    return (
        <div className="relative">
            <label
                htmlFor="status"
                className="block font-medium tracking-tight text-gray-800"
            >
                Trạng thái
            </label>
            <select
                name="status"
                id="status"
                className="mt-2 w-full appearance-none rounded-lg border border-gray-200 px-2 py-1.75 transition-colors duration-150 focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:outline-0"
                onChange={onSetData}
                value={statusData}
            >
                <option value="active">Hoạt động</option>
                <option value="inactive">Vô hiệu hóa</option>
            </select>
            <div className="absolute top-9.5 right-2">
                <ChevronDown size={18} />
            </div>
        </div>
    )
}