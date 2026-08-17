import FilterTab from './FilterTab';

interface FilterTabDataProps {
    onFilter: () => void;
    isActive: boolean;
    countData: string | number;
    label: string;
}

interface FilterTabGroupType {
    data: FilterTabDataProps[]
}

export default function FilterTabGroup({ data }: FilterTabGroupType) {
    return (
        <div className="hidden gap-1.25 rounded-xl bg-gray-100 p-1 tracking-tight md:flex">
            {data?.length > 0 &&
                data.map((item) => (
                    <FilterTab
                        key={item.label}
                        label={item.label}
                        onFilter={item.onFilter}
                        isActive={item.isActive}
                        countData={item.countData}
                    />
                ))}
        </div>
    );
}
