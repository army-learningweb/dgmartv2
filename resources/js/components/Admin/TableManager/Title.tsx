interface TitleProps {
    heading:string;
}

export default function Title({heading} : TitleProps) {
    return (
        <h1 className="mt-px text-lg font-medium tracking-tight">
            {heading}
        </h1>
    )
}