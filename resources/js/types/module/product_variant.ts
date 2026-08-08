interface Product {
    id:string,
    name:string,
    category_id:string
}

interface ProductConfigType{
    id: string,
    name: string
}

interface ConfigType {
    id:number;
    name:string;
    price_include:number;
    group:string;
    created_at:string;
}

export type ReadConfigType = Record<string, ConfigType[]>

export type ProductVariant = {
    products: Record<string, Product[]>
    productConFigTypes: ProductConfigType[] 
}