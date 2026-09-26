interface TitlePage {
    title: string | undefined;
}

export default function TitlePage({title} : TitlePage){
    return (
        <h1 className="px-5 md:px-0 md:my-10 my-5 inline-block md:text-5xl text-4xl font-bold tracking-tight select-none">
            {title}
        </h1>
    );
}