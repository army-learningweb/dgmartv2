import { ChevronDown } from "lucide-react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    name: string;
    label: string;
    children?: React.ReactNode;
    onSetData?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showError?: boolean;
}

export default function Select({ children, label, name, error, showError = false, onSetData, ...props }: SelectProps) {
    return (
        <>
            <div className="relative">
                <label
                    htmlFor={name}
                    className="block font-medium tracking-tight text-gray-800"
                >
                    {label}
                </label>
                <select 
                    onChange={onSetData}
                    name={name}
                    id={name}
                    className="mt-2 w-full appearance-none rounded-lg border border-gray-200 px-2 py-1.75 transition-colors duration-150 focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:outline-0"
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute top-9.5 right-2">
                    <ChevronDown size={18} />
                </div>
            </div>

            {showError && (
                error && (
                    <div className="text-red-600 mt-2">{error}</div>
                )
            )}
        </>
    )
}