interface ProductConfigTypeS {
    id: string | number;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
    configs: string[];
}

export interface ConfigType {
    id:  string;
    name: string;
    group: string;
    created_at: string;
    updated_at: string;
}

export type ReadProductConfigTypeS = {
    types: ProductConfigTypeS[]; 
    configs: Record<string,ConfigType[]>;
    total: string | number;
}

export type CreateProductConfigTypeS = {
    id: string | number;
    name: string;
    desc: string;
    configs: string[];
}

export type EditProductConfigTypeS = CreateProductConfigTypeS
