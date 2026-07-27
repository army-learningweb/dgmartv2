export type ProductCategories<T> = {
    id: string;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
    parent_id: string;
    user_id: string;
    created_at : string;
    updated_at: string;
    childs : T[]
}

export type ParentCategoriesType = {
    id : string;
    name: string;
}

export type ChildCategoriesType = {
    id: string;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
    parent_id: string;
    user_id: string;
    created_at : string;
    updated_at: string;
}

export type ReadCategoriesProductType = {
    categories : ProductCategories<ChildCategoriesType>[]
    parent_categories : ParentCategoriesType[]
    total : string
}

export type CreateCategoriesProductType = {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    parent_id: string;
}

export type EditCategoriesPostType = CreateCategoriesProductType