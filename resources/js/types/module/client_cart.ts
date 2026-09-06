interface ConfigTypes {
    label: string;
    value: string;
}

interface CartTypes {
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

export interface CartPropTypes {
    cart : CartTypes[]
}