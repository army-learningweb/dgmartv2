import { Head } from '@inertiajs/react';
import TitlePage from './TitlePage';

interface SectionPageProps {
    children?: React.ReactNode;
    head: string;
    title: string | undefined;
}

export default function SectionPage({
    children,
    head,
    title,
}: SectionPageProps) {
    return (
        <div className="mx-auto max-w-312 space-y-4">
            <Head title={head} />
            <TitlePage title={title} />
            {children}
        </div>
    );
}
