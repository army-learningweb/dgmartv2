interface ConfigProps{
    name: string;
}

export interface ProductDataProp {
    category_id: number;
    configs: ConfigProps[];
    id: string | number;
    name: string;
    desc: string;
    slug: string;
    main_image: string;
    price: string | number;
    price_discount: string | number;
    
}

export interface PostDataProp {
    id: string | number;
    name: string;
    desc: string;
    slug: string;
    user_id: string | number;
    created_at: string;
    category_id: string | number;
    category: {
        id: string | number;
        name: string;
    };
    user: {
        id: string | number;
        name: string;
    };
}

export type ReadDataProduct = {
    onshop_products: {
        data: ProductDataProp[];
    };
    discount_products: {
        data: ProductDataProp[];
    };
    posts: PostDataProp[];
};