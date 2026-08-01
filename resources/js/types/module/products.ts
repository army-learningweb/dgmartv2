import { PaginatedData } from "./global";

interface ProductType {
    id: string;
    name: string;
    desc: string;
    slug: string;
    content: string;
    status: 'active' | 'inactive';
    category_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface ProductCategories {
    id : string;
    name: string;
    parent_id: string;
}

interface ProductTypes{
    id: string;
    name: string;
}

export type ReadProductType = {
    products: PaginatedData<ProductType[]>
    product_categories : ProductCategories[]
    types : ProductTypes[]
}

export type CreateProductType = {
    file : null | File;
    name : string;
    desc : string;
    content: string;
    status: string;
    category_id : string;
}