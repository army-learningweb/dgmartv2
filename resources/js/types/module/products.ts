import { PaginatedData } from './global';

interface CategoryType {
    id: string;
    name: string;
}

interface MediaType {
    object_id: string;
    file_url: string;
    file_name: string;
}

interface UserType {
    id: string;
    name: string;
}

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
    category?: CategoryType;
    main_image?: MediaType;
    user?: UserType;
}

interface ProductCategories {
    id: string;
    name: string;
    parent_id: string;
}

interface ReadEditProductMediaType {
    id: string;
    object_id: string;
    file_url: string;
    file_name: string;
}

interface ReadEditProduct {
    id: string;
    name: string;
    desc: string;
    category_id: string;
    content: string;
    status: 'active' | 'inactive';
    main_image: ReadEditProductMediaType;
    medias: ReadEditProductMediaType[] | null;
}

export type ReadProductType = {
    products: PaginatedData<ProductType>;
    product_categories: ProductCategories[];
    total: string;
    active: string;
    inactive: string;
    curent_page: number;
    product_on_page: number;
    filter: string;
    search: string;
};

export type CreateProductType = {
    file: null | File;
    files: null | File[];
    name: string;
    desc: string;
    content: string;
    status: string;
    category_id: string;
};

export type EditProductType = CreateProductType & {
    file_id:string;
    files_id: [];
}

export type ReadEditProductType = {
    product: ReadEditProduct;
    product_categories: ProductCategories[];
    sub_media: [];
}
