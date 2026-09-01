import { Funnel, ChevronRight } from 'lucide-react';
import FilterItem from './FilterItem';

interface FiltersProps {
    title: string;
    query_key: string;
    options: { value: string }[];
}

interface FilterProps {
    data: FiltersProps[];
    currentFilter: string[];
    onFilter: ({}, {}) => void;
    onRemove: (value: string, initials: any) => void;
    onClear: () => void;
    onCloseFilter: () => void;
}

export default function Filter({
    data,
    currentFilter,
    onFilter,
    onRemove,
    onClear,
    onCloseFilter
}: FilterProps) {
    return (
        <>
            {/* filter */}
            <div className="space-y-2 rounded-xl bg-white p-2 shadow">
                <div className="flex w-full justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2 px-1 py-1 h-10">
                            <Funnel size={17} />
                            <h1 className="text-[15px] font-medium tracking-tight">
                                Bộ lọc
                            </h1>

                            {currentFilter.some(
                                (item) => item !== null && item !== undefined,
                            ) && (
                                <div>
                                    <div
                                        onClick={onClear}
                                        className="cursor-pointer rounded-lg bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 hover:text-red-600 active:text-red-500"
                                    >
                                        Xóa toàn bộ
                                    </div>
                                </div>
                            )}
                        </div>

                        <ChevronRight
                            onClick={onCloseFilter}
                            size={25}
                            className="cursor-pointer text-gray-500 hover:text-gray-700 active:text-black"
                        />
                    </div>
                </div>

                <hr className="border-gray-200" />

                {data.length > 0 &&
                    data.map((items) => (
                        <div key={items.title}>
                            <p className="my-3 px-2 font-medium">
                                {items.title}
                            </p>
                            {items.options?.length > 0 && (
                                <div className="inline-block w-full space-y-0.5 rounded-lg bg-gray-100 p-1.5">
                                    {items.options.map((item) => (
                                        <FilterItem
                                            key={item.value}
                                            value={item.value}
                                            active={currentFilter.includes(
                                                item.value.toLowerCase(),
                                            )}
                                            onFilter={() =>
                                                onFilter(
                                                    {
                                                        [items.query_key]:
                                                            item.value.toLowerCase(),
                                                    },
                                                    {
                                                        title: items.title,
                                                        value: item.value,
                                                        query_key:
                                                            items.query_key,
                                                    },
                                                )
                                            }
                                            onRemove={() =>
                                                onRemove(item.value, {
                                                    [items.query_key]: '',
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </>
    );
}
