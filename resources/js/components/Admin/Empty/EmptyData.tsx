import { FileSearchCorner, RotateCcw } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface EmptyDataProps {
    children?: React.ReactNode
    showFallBack?: boolean
}

export default function EmptyData({ children, showFallBack = false }: EmptyDataProps) {
    return (
        <div className="px-5 md:px-0 mt-4 flex min-h-141.5 w-full flex-col items-center justify-center gap-4 rounded-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100">
                <FileSearchCorner size={18} />
            </div>

            <div className="text-center space-y-1">
                <h1 className="font-medium">
                    Không tìm thấy dữ liệu !
                </h1>
                <p className="text-gray-500 w-70 md:w-full">
                    Nếu có dữ liệu liên quan, dữ liệu sẽ được hiển thị tại đây
                </p>
            </div>

            <div className="flex gap-2">
                {showFallBack && (
                    <Link className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-200 px-2 py-1 text-xs font-medium transition-transform duration-150 active:translate-y-0.5">
                        <RotateCcw size={13} />
                        Hoàn tác
                    </Link>
                )}
                {children}
            </div>
        </div>
    );
}
