import { Link } from "@inertiajs/react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import clsx from "clsx";

import LinkPagging from "./LinkPagging";

interface PaginationProps {
    firstUrl: string;
    lastUrl: string;
    prevUrl: string;
    nextUrl: string;
}

export default function Pagination({ firstUrl, lastUrl, prevUrl, nextUrl }: PaginationProps) {
    return (
        <div className="flex gap-1 justify-end mt-4">
            {/* prev */}
            <LinkPagging url={firstUrl} disabledUrl={prevUrl} icon={<ChevronsLeft size={20} />} />
            <LinkPagging url={prevUrl} disabledUrl={prevUrl} icon={<ChevronLeft size={20} />} />

            {/* next */}
            <LinkPagging url={nextUrl} disabledUrl={nextUrl} icon={<ChevronRight size={20} />} />
            <LinkPagging url={lastUrl} disabledUrl={nextUrl} icon={<ChevronsRight size={20} />} />
        </div>
    )
}