import { CartTypes } from "./client_cart";

export interface CheckoutProps {
    step: number;
    info_save: any;
    payment_save: string;
    cart: CartTypes[];
}