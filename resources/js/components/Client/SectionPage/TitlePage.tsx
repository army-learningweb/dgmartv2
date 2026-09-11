interface TitlePage {
    title: string | undefined;
}

export default function TitlePage({title} : TitlePage){
    return (
        <h1 className="my-10 inline-block text-5xl font-bold tracking-tight select-none">
            {title}
        </h1>
    );
}