import clsx from "clsx";

interface TextareaProps extends React.ComponentPropsWithRef<"textarea"> {
    label: string;
    error?: string;
    showError?: boolean;
}

const Textarea = ({ name, label, error, showError = true, ...props }: TextareaProps) => {
    return (
        <>
            {/* label */}
            <label htmlFor={name} className="font-medium text-gray-800 tracking-tight flex gap-1">
                {label} {error && (<div className="text-red-600">*</div>)}
            </label>

            {/* field */}
            <textarea name={name} id={name} className={clsx("mt-2 border border-gray-200 w-full px-2 py-1.75 rounded-lg focus:outline-0 transition-colors duration-150 h-20", {
                "ring-3 ring-red-600/20 border-red-600 focus:ring-red-600/20 focus:border-red-600": error,
                "focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50 focus:border-gray-400/70 ": !error
            })} {...props}>

            </textarea>

            {/* error */}
            {showError && (error && (<div className="mt-1 text-red-600">{error}</div>))}

        </>
    )
}

export default Textarea;