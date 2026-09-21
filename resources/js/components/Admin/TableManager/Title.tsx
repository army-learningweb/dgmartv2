interface TitleProps {
    heading:string;
    className?: string;
}

export default function Title({heading, className} : TitleProps) {
    return (
        <h1 className={`mt-px text-lg font-medium tracking-tight ${className}`}>
            {heading}
        </h1>
    );
}