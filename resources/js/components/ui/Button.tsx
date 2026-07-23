import clsx from "clsx"

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">{
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'warning';
    size?: 'small' | 'medium' | 'large';
    processing?: boolean,
    processingLabel?: string
    animatePress?: boolean
}

export default function Button({ variant = 'primary', size = 'medium', animatePress = false, type, children, disabled, processing, processingLabel, className, ...props }: ButtonProps) {

    // variants
    const variants = {
        primary: 'bg-blue-600 border border-blue-600 text-white hover:brightness-110',
        secondary: 'bg-gray-600 border border-gray-600 text-white hover:brightness-110',
        outline: 'border border-gray-200 hover:bg-gray-100 bg-white',
        danger: 'bg-red-600 border-red-600 text-white hover:brightness-110',
        warning: 'bg-amber-600 border-amber-600 text-black hover:brightness-110'
    }

    //
    const sizes = {
        medium: 'text-md',
        small: 'text-xs',
        large: 'text-lg'
    }

    return (
        <button type={type} disabled={disabled || processing} className={clsx(`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 ${className} ${variants[variant]} ${sizes[size]} `, {
            "active:translate-y-0.5" : animatePress
        })} {...props}>
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