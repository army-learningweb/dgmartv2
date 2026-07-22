import clsx from "clsx";
import { forwardRef } from "react";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement,InputProps>(({ type, name, label, error, ...props }, ref) => {
    return(
        <>
        <label htmlFor={name} className="font-medium text-gray-700">{label}</label>
            {/* field */}
            <input type={type} name={name} id={name} ref={ref}
                className={clsx("mt-2 border border-gray-200 w-full px-2 py-1.75 rounded-lg focus:outline-0 transition-colors duration-150", {
                    "ring-3 ring-red-600/20 border-red-600 focus:ring-red-600/20 focus:border-red-600": error,
                    "focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:border-gray-400/70 ": !error
                })}
                {...props} />

            {/* error */}
            {error && (
                <div className="mt-2 text-red-600">{error}</div>
            )}
        </>
    )
});

export default Input;