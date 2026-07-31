
interface ProductConfigType {
    id: string;
    name: string;
    price_include: string;
    group: string;
    created_at: string;
    updated_at: string;
}

export type ReadProductConfigType = {
    configs : Record<string,ProductConfigType[]>;
    total : string;
}

export type CreateProductConfigType = Pick<
    ProductConfigType,
    'id' | 'name' | 'price_include' | 'group'
>;

export type EditProductConfigType = CreateProductConfigType
