import LoadingCircle from "@/components/ui/LoadingCircle";
import { Search, CircleX, X } from "lucide-react";
import { forwardRef } from "react";

interface ModalHeaderProps {
    onClose: () => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: () => void;
    querySearch: string;
    loadingStatus: boolean;
}

const ModalHeader = forwardRef<HTMLInputElement, ModalHeaderProps>(({onClearSearch,onClose,onSearch, querySearch, loadingStatus}, ref) => {
    return (
        <>
            {/* search */}
            <header>
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium tracking-tight">
                        Tìm kiếm sản phẩm
                    </h1>
                    <div
                        onClick={onClose}
                        className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-medium transition-colors duration-150 select-none hover:bg-gray-200"
                    >
                        <X
                            size={17}
                            className="text-gray-800 transition-colors duration-150"
                        />
                        <span className="hidden md:block">ESC</span>
                    </div>
                </div>

                <div className="focus-within:border-ring mt-3 flex w-full items-center gap-2 rounded-[9px] border border-gray-300 p-2 transition-all duration-150 focus-within:ring-3 focus-within:ring-gray-200">
                    <Search size={18} className="text-gray-500" />
                    <input
                        onChange={onSearch}
                        ref={ref}
                        type="text"
                        name="search"
                        id="search"
                        value={querySearch}
                        className="w-full focus:ring-0 focus:outline-0"
                        placeholder="Nhập tên sản phẩm..."
                        autoComplete="off"
                    />

                    {loadingStatus && (
                        <LoadingCircle className="border-gray-500! border-t-transparent!" />
                    )}

                    {!loadingStatus && querySearch && (
                        <CircleX
                            onClick={onClearSearch}
                            size={18}
                            className="text-gray-500 hover:text-red-700 active:text-red-400"
                        />
                    )}
                </div>
            </header>
        </>
    );
})

export default ModalHeader