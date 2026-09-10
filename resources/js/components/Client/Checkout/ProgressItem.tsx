interface ProgressItemProps {
    num: number;
    children: React.ReactNode;
}

export default function ProgressItem({num, children} : ProgressItemProps) {
    return (
        <div className="flex w-[33.33%] flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {num}
            </div>

            <p className="font-medium text-xs">{children}</p>
        </div>
    );
}
