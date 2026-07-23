import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import LinkPagging from "./LinkPagging";

interface PaginationProps {
    firstUrl: string;
    lastUrl: string;
    prevUrl: string;
    nextUrl: string;
    currentPage: number;
    lastPage: number;
}

export default function Pagination({ firstUrl, lastUrl, prevUrl, nextUrl, currentPage, lastPage }: PaginationProps) {
    return (
        <div className="flex gap-1 justify-end mt-4">
            <div className="flex gap-5 items-center">
                <div className="font-medium ps-1">
                    Trang {currentPage} / {lastPage}
                </div>
                <div className="flex gap-1">
                    {/* prev */}
                    <LinkPagging url={firstUrl} disabledUrl={prevUrl} icon={<ChevronsLeft size={20} />} />
                    <LinkPagging url={prevUrl} disabledUrl={prevUrl} icon={<ChevronLeft size={20} />} />

                    {/* next */}
                    <LinkPagging url={nextUrl} disabledUrl={nextUrl} icon={<ChevronRight size={20} />} />
                    <LinkPagging url={lastUrl} disabledUrl={nextUrl} icon={<ChevronsRight size={20} />} />
                </div>

            </div>
        </div>
    )
}