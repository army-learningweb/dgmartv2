export type PostCategories = {
    id: string;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
    user_id: string;
    created_at : string;
    updated_at: string;
}

export type ReadCategoriesPostType = {
    categories : PostCategories[]
    total : string
    status : 'active' | 'inactive'
}

export type CreateCategoriesPostType = {
    id: string,
    name: string,
    status: 'active' | 'inactive'
}

export type EditCategoriesPost = {
    id: string;
    name: string;
    status: 'active' | 'inactive'
}