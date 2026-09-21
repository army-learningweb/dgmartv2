interface Config {
    name: string;
}

interface OrderDetailProps {
    configs: Config[];
    id: number;
    order_id: number;
    price: number;
    price_discount: number;
    discount: number;
    qty: number;
    total: number;
    variant_id: number;
    variant_code: string;
    variant_discount: number;
    variant_price: number;
    variant_price_discount: number;
    product_image: string;
    product_image_alt: string;
    product_name: string;
}

interface OrderInfoProps {
    id: number;
    code: string;
    customer_id: number;
    qty: number;
    total: number;
    customer: { id: number; name: string; email: string; tel: string };
    payment_method: string;
    shipping_address: string;
    shipping_note: string;
    status_payment: 'paid' | 'unpaid';
    status_shipping:
        | 'awaiting'
        | 'processing'
        | 'shipped'
        | 'delivery'
        | 'deliveryfailed'
        | 'delivered'
        | 'canceled'
        | 'refund';
    created_at: string;
    updated_at: string;
}

export interface OrderDetailPageProps {
    order_info: OrderInfoProps;
    order_details: {
        data: OrderDetailProps[];
    };
}

export interface UpdateOrder {
    status_payment: any;
    status_shipping: any;
}
