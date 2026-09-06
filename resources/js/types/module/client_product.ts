export interface ProductDataProp {
    id: number;
    main_image: string;
    base_price: string;
    price: string;
    price_discount: string;
    discount: string;
    configs: any;
    info: {
        name: string;
        desc: string;
        slug: string;
        category_id: string | number;
    };
    
}

export type PaginatedProducts = {
    data: ProductDataProp[];
    links: any;
    meta: any;
};

export type ReadDataProduct = {
    products: PaginatedProducts;
    categories: {
        id: string | number;
        name: string;
        childs: [
            {
                id: string | number;
                name: string;
                parent_id: string;
            },
        ];
    };
    category: string;
    price: string;
    cpu: string;
    gpu: string;
    ram: string;
    design: string;
};

// Product detail

interface ConfigsProp {
    label: string;
    name: string;
}

interface VariantsProps {
    id: string | number;
    category_id: string | number;
    code: string;
    price: number;
    price_discount: number;
    discount: number;
    qty: number;
    sold: number;
    configs: ConfigsProp[]
}

interface ImageProps {
    id: string;
    object_id: string;
    file_url: string;
    file_name: string;
}

export interface ProductDetailProps {
    product: {
        data: {
            id: string | number;
            name: string;
            desc: string;
            slug: string;
            image: ImageProps;
            content: string;
            childs_image: ImageProps[];
            variants: VariantsProps[];
        };
    };

    products_suggest: {
        data: {
            id: string | number;
            name: string;
            desc: string;
            slug: string;
            image: ImageProps;
            variants: VariantsProps[];
        }[];
    };
}