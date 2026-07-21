interface ButtonProps extends React.ComponentPropsWithoutRef<"button">{
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'warning';
    processing?: boolean,
    processingLabel?: string
}

export default function Button({ variant = 'primary', type, children, disabled, processing, processingLabel, className, ...props }: ButtonProps) {

    const variants = {
        primary: 'bg-blue-600 text-white hover:brightness-110',
        secondary: 'bg-gray-600 text-white hover:brightness-110',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:brightness-110',
        warning: 'bg-amber-600 text-black hover:brightness-110'
    }

    return (
        <button type={type} disabled={disabled || processing} className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 flex justify-center disabled:opacity-50 disabled:cursor-not-allowed ${className} ${variants[variant]}`} {...props}>
            {!processing && children}

            {processing && (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin shrink-0"></div>
                    <div>{processingLabel}</div>
                </div>
            )}
        </button>
    )
}