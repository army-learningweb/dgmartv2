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
}

export type ReadData = {
    onshop_products: {
        data: ProductDataProp[];
    };
    accessories_products: {
        data: ProductDataProp[];
    };
    posts: {
        data: PostDataProp[];
    };
};