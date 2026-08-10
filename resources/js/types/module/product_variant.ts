import { PaginatedData } from './global';

interface VariantType {
    id: string | number;
    product_id: string | number;
    code: string;
    price: string | number;
    discount: string | number | null;
    price_discount: string | number | null;
    qty: string | number | null;
    qty_sold: string | number | null;
    is_default: 'default' | 'variant';
    user_id: string | number | null;
    created_at: string;
    updated_at: string;
}

interface Product {
    id: string;
    name: string;
    category_id: string;
}

interface ProductConfigType {
    id: string;
    name: string;
}

interface ConfigType {
    id: number;
    name: string;
    price_include: number;
    group: string;
    created_at: string;
}

export type ReadConfigType = Record<string, ConfigType[]>;

export type CreateVariantDataType = {
    products: Record<string, Product[]>;
    productConFigTypes: ProductConfigType[];
};

export type CreateVariantType = {
    product_id: number | string;
    code: string;
    price: number | string;
    discount: number | string;
    qty: number | string;
    is_default: 'default' | 'variant';
    status: 'active' | 'inactive';
    config_id: number[] | null;
};

interface UserInVariantType {
    id: number | string;
    name: string;
}

interface ProductInVariantType {
    id: number | string;
    name: string;
}

export type ReadVariantType = {
    variants: PaginatedData<
        VariantType & {
            product: ProductInVariantType;
            user: UserInVariantType;
        }
    >;
};
