interface ProductConfigTypeS {
    id: string;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
    configs: string[]
}

export interface ConfigType {
    id: string,
    name: string,
    group: string
}

export type ReadProductConfigTypeS = {
    types: ProductConfigTypeS[] 
    configs: Record<string,ConfigType[]>
}

export type CreateProductConfigTypeS = {
    id: string;
    name: string;
    desc: string;
    configs: string[];
}

export type EditProductConfigTypeS = CreateProductConfigTypeS
