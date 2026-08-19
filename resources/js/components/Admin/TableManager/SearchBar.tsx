import { Search,X } from "lucide-react";
import clsx from "clsx";

interface dataSuggestProps {
    id: number | string,
    name: string,
}

interface SearchBarProps {
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: () => void;
    onMouseDown: (value: string) => void;
    onMouseEnter: (value: string) => void;
    onMouseLeave: () => void;
    onClearQuery: () => void;
    dataSuggest: dataSuggestProps[];
    querySearch: string;
    placeHolderSearch: string;
    loadingSearch: boolean;
    openSuggest: boolean;
}

export default function SearchBar({
    onChange,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onClearQuery,
    dataSuggest,
    querySearch,
    placeHolderSearch,
    loadingSearch,
    openSuggest,
}: SearchBarProps) {
    return (
        <div className="relative w-full md:w-auto">
            <div className="focus-within:border-ring flex w-full md:w-100 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2 transition-all duration-150 ease-out focus-within:border-gray-400 focus-within:ring-3 focus-within:ring-gray-300/70">
                <div className="flex w-full items-center gap-1">
                    <Search
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 text-gray-600"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={querySearch}
                        className="flex-1 px-2 py-1.5 focus:outline-0 truncate"
                        placeholder={placeHolderSearch}
                        autoComplete="off"
                    />

                    {/* loading search */}
                    {querySearch && loadingSearch && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                    )}

                    {/* delete query */}
                    {querySearch && !loadingSearch && (
                        <div
                            onClick={onClearQuery}
                            className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-gray-800 active:bg-black"
                        >
                            <X size={10} />
                        </div>
                    )}
                </div>
            </div>

            <div
                className={clsx(
                    'absolute left-0 z-50 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-md transition-all duration-250 ease-out',
                    {
                        'pointer-events-none translate-y-0 scale-95 opacity-0':
                            !openSuggest,
                        'pointer-events-auto translate-y-1 scale-100 opacity-100':
                            openSuggest,
                    },
                )}
            >
                <div className="px-1 text-xs font-medium text-gray-500">
                    {querySearch && (
                        <div className="flex justify-between gap-2">
                            <div className="w-60 truncate">
                                Theo từ khóa "{querySearch}"
                            </div>

                            <div>
                                {dataSuggest?.length > 0 && !loadingSearch && (
                                    <span className="text-xs font-semibold tracking-tight">
                                        (Tìm thấy {dataSuggest.length} kết quả)
                                    </span>
                                )}

                                {dataSuggest?.length === 0 &&
                                    !loadingSearch && (
                                        <span className="text-xs font-semibold tracking-tight">
                                            (Không tìm thấy)
                                        </span>
                                    )}
                            </div>
                        </div>
                    )}

                    {!querySearch && <p>Mới thêm gần đây</p>}
                </div>
                <hr className="my-2 border-gray-100" />
                {dataSuggest.map((item) => (
                    <div
                        key={item.id}
                        onMouseDown={() => onMouseDown(item.name)}
                        onMouseEnter={() => onMouseEnter(item.name)}
                        onMouseLeave={onMouseLeave}
                        className="cursor-pointer rounded-md p-1 hover:bg-gray-100 truncate"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}