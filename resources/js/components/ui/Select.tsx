import clsx from "clsx";
import { ChevronDown } from "lucide-react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    name: string;
    label: string;
    showError?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function Select({ children, label, name, error, showError = true , className, ...props }: SelectProps) {
    return (
        <>
            <div className="relative">
                <label htmlFor={name} className="flex gap-2 font-medium tracking-tight text-gray-800">
                    <span>{label}</span>
                    {error && (
                        <span className="text-red-600">*</span>
                    )}
                </label>
                <select
                    name={name}
                    id={name}
                    className={clsx(`mt-2 w-full appearance-none rounded-lg border border-gray-200 px-2 py-1.75 transition-colors duration-150 focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:outline-0 ${className}`, {
                        "ring-3 ring-red-600/20 border-red-600 focus:ring-red-600/20 focus:border-red-600": error,
                        "focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:border-gray-400/70 ": !error
                    })}
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