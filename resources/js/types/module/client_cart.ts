interface ConfigTypes {
    label: string;
    value: string;
}

interface CartTypes {
    key: number;
    product_id: number;
    name: string;
    image: string;
    image_alt: string;
    discount: number;
    price: number;
    price_discount: number;
    qty: number;
    total: number;
    configs : ConfigTypes[]
}

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
    configs: ConfigsProp[];
}

interface ImageProps {
    id: string;
    object_id: string;
    file_url: string;
    file_name: string;
}

export interface CartPropTypes {
    cart: CartTypes[];
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