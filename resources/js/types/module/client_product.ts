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