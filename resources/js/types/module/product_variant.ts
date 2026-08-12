import { PaginatedData } from './global';

interface VariantType {
    id: string | number;
    product_id: string | number;
    type_id: string | number | null;
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

export type ReadConfigType = Record<string, ConfigType[]> | {};

export type CreateVariantDataType = {
    products: Record<string, Product[]>;
    productConFigTypes: ProductConfigType[];
};

export type CreateVariantType = {
    product_id: number | string | null;
    type_id: string | number | null;
    code: string;
    price: number | string;
    discount: number | string;
    qty: number | string;
    is_default: 'default' | 'variant' | string;
    config_id: (string | number | null)[] | null;
    
};

interface UserInVariantType {
    id: number | string;
    name: string;
}

interface ProductInVariantType {
    id: number | string;
    name: string;
}

interface MainImageProps {
    object_id:string | number;
    file_url: string;
    file_name: string;
}

export type ReadVariantType = {
    variants: PaginatedData<
        VariantType & {
            product: ProductInVariantType;
            user: UserInVariantType;
            main_image: MainImageProps 
        }
    >;
};

interface ProductConfigTypeEdit {
    id: string | number | null;
    name: string;
    group_id: string | number | null;
    created_at: string;
    updated_at: string;
}

interface configsProps {
    id: string | number,
    name: string,
    group : {
        id: string | number;
        name: string;
    }
    group_id: string | number,
    created_at: string;
    updated_at: string;
}

export type EditVariantDataType = {
    variant: VariantType;
    configChecked: configsProps[]
    products: Record<string, Product[]>;
    productConFigTypes: ProductConfigType[];
    dataConfig: Record<string,ProductConfigTypeEdit[]>
}

export type EditVariantType = CreateVariantType;
