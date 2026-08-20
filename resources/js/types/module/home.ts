export interface ProductDataProp {
    id: string | number;
    name: string;
    desc: string;
    slug: string;
    status: string;
    user_id: string | number;
    category_id: string | number;
    category : {
        id: string | number;
        name: string
    }
    user: {
        id: string | number;
        name: string;
    }
    main_image: {
        object_id : string | number;
        file_url : string;
        file_name: string;
    }
    base_price: {
        id: string | number;
        product_id: string | number;
        discount: string | number;
        price: string | number;
        price_discount: string | number;
    }
}

export type ReadDataProduct = {
    new_products : ProductDataProp[]
}