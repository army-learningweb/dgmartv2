import { PaginatedData } from './global';

interface PostType {
    id: string;
    title: string;
    desc: string;
    content: string;
    slug: string;
    status: 'active' | 'inactive';
    user_id?: string;
    category_id?: string;
    created_at: string;
    updated_at: string;
    category?: CategoryType;
    user?: UserType;
    media?: MediaType;
}

interface UserType {
    id: string;
    name: string;
}

interface CategoryType {
    id: string;
    name: string;
}

interface MediaType {
    object_id: string;
    file_url: string;
    file_name: string;
}

interface PostCategoriesType {
    id: string;
    name: string;
}

export type ReadPostCategoriesType = {
    post_categories: PostCategoriesType[];
};

interface PostSuggestProps {
    id:string | number;
    name: string;
}

interface PostCategoryProps {
    id:string | number;
    name: string;
}

// Đọc
export type ReadPostType = {
    posts: PaginatedData<
        Pick<
            PostType,
            | 'id'
            | 'title'
            | 'desc'
            | 'content'
            | 'slug'
            | 'status'
            | 'user_id'
            | 'category_id'
            | 'category'
            | 'user'
            | 'media'
            | 'created_at'
        >
    >;
    posts_suggest: PostSuggestProps[];
    posts_categories: PostCategoryProps[];
    total: string;
    active: string;
    inactive: string;
    filter_status: string;
    filter_category: string | number;
    filter_date: string | number;
    sort_date: string;
    search: string;
};

// Thêm
export type CreatePostType = {
    file: File | null;
    title: string;
    desc: string;
    content: string;
    status: string;
    category_id: string | null;
};

// Sửa
export type ReadEditPostType = {
    post_info: Omit<
        PostType,
        'created_at' | 'updated_at' | 'user_id' | 'user'
    >;
    post_categories: PostCategoriesType[]
};

export type EditPostType = {
    file: File | null;
    old_file : string | undefined,
    title: string;
    desc: string;
    content: string;
    status: string;
    category_id?: string;
    media?: MediaType;
}
