import { PaginatedData } from "./global";

// Protype
export type Order = {
    id: string | number;
    code: string;
    shipping_address: string;
    shipping_note: string;
    status_shipping:
        | 'awaiting'
        | 'processing'
        | 'shipped'
        | 'delivery'
        | 'deliveryfailed'
        | 'delivered'
        | 'canceled'
        | 'refund';
    status_payment: 'unpaid' | 'paid';
    created_at: string;
    updated_at: string;
    customer: {id:number,name:string};
    total: number;
};

interface suggestUsersProps {
    id: string | number;
    name: string;
}

// Read
export type OrdersReadType = {
    orders: PaginatedData<Order>;
    suggest_orders: suggestUsersProps[];
    search: string;
    status_shipping: string;
    status_payment: string;
    total: string;
    awaiting: string;
    processing: string;
    shipped: string;
    delivery: string;
    deliveryfailed: string;
    delivered: string;
    canceled: string;
    refund: string;
    paid: string;
    unpaid: string;
};