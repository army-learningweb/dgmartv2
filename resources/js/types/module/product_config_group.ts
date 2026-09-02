import { PaginatedData } from "./global";

export interface ProductConfigGroup {
    id: string | number;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
}

interface ConfigGroupSuggestProps {
    id: string;
    name: string;
}

export type ReadProductConfigGroupType = {
    configGroup: PaginatedData<ProductConfigGroup>;
    total: string | number;
    configGroupSuggest: ConfigGroupSuggestProps[];
    search: string;
};

export type CreateProductConfigGroupType = {
    id: string | number | null,
    name: string;
    desc: string;
}

export type EditProductConfigGroupType = Pick<ProductConfigGroup, 'id' | 'name' | 'desc'>