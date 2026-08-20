interface SliderTitleProps {
    title : String;
}

export default function SliderTitle({title} : SliderTitleProps){
    return <h1 className="text-2xl font-medium">{title}</h1>;
}