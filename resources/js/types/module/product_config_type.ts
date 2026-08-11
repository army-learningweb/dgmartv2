interface ProductConfigTypeS {
    id: string | number | null;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
    configs: string[];
}

export interface ConfigType {
    id: string | number | null;
    name: string;
    group: string;
}

export type ReadProductConfigTypeS = {
    types: ProductConfigTypeS[]; 
    configs: Record<string,ConfigType[]>;
    total: string | number;
}

export type CreateProductConfigTypeS = {
    id: string | number | null;
    name: string;
    desc: string;
    configs: string[];
}

export type EditProductConfigTypeS = CreateProductConfigTypeS
