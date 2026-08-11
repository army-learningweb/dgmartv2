export interface ProductConfigGroup {
    id: string | number;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
}

export type ReadProductConfigGroupType = {
    configGroup : ProductConfigGroup[],
    total: string | number,
}

export type CreateProductConfigGroupType = {
    id: string | number | null,
    name: string;
    desc: string;
}

export type EditProductConfigGroupType = Pick<ProductConfigGroup, 'id' | 'name' | 'desc'>