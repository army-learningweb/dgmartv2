import { ProductConfigGroup } from './product_config_group';
import { PaginatedData } from './global';

interface ProductConfigType {
    id: string | number;
    name: string;
    created_at: string;
    updated_at: string;
    group_id: string | number | null;
}

export type ReadProductConfigType = {
    configs: PaginatedData<ProductConfigType>;
    total: string;
    groupConfigs: Pick<ProductConfigGroup, 'id' | 'name'>[];
};

export type CreateProductConfigType = {
    id: string | number | null;
    name: string;
    group_id: string | number | null;
};

export type EditProductConfigType = CreateProductConfigType;
