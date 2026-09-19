import { PaginatedData } from "./global";

// Protype
export type Customers = {
    id: string;
    name: string;
    email: string;
    tel: string;
    created_at: string;
    updated_at: string;
};

interface suggestCustomerProps {
    id: string | number;
    name: string;
}

// Read
export type CustomersReadType = {
    customers: PaginatedData<Customers>;
    suggest_customers: suggestCustomerProps[];
    search: string;
    total: string;
};

