import { ProductConfigGroup } from './product_config_group';

interface ProductConfigType {
    id: string | number | null;
    name: string;
    group_id: string | number | null;
    created_at: string;
    updated_at: string;
}

export type ReadProductConfigType = {
    configs: Record<string, ProductConfigType[]>;
    total: string;
    groupConfigs: Pick<ProductConfigGroup, 'id' | 'name'>[];
};

export type CreateProductConfigType = {
    id: string | number | null;
    name: string;
    group_id: string | number | null;
};

export type EditProductConfigType = CreateProductConfigType;
