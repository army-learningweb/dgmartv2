import { PaginatedData } from "./global";

export type CreateProductType = {
    file : null | File;
    code : string;
    name : string;
    desc : string;
    qty_stock: string;
    content: string;
    price: string;
    disscount: string;
    status: string;
    category_id : string;
}