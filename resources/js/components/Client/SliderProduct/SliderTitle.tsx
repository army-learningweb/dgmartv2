interface SliderTitleProps {
    title : String;
}

export default function SliderTitle({title} : SliderTitleProps){
    return <h1 className="text-3xl font-medium tracking-tight select-none">{title}</h1>;
}