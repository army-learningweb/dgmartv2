import { PaginatedData } from "./global";

interface PostsProps {
    id: string | number;
    title: string;
    desc: string;
    slug: string;
    image: string;
    image_alt: string;
}

interface PaginatePosts {
    data: PostsProps[];
    links: any;
    meta: any;
}

interface CategoriesPost {
    id: string | number;
    name: string;
}

export interface PostDataProps {
    posts: PaginatePosts;
    categories : CategoriesPost[];
    category: string;
}