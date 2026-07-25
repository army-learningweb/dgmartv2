export type Permission = {
    id: string;
    name: string;
    desc: string;
    module: string;
    created_at: string;
    updated_at: string;
};

export type ReadPermissionType = {
    permissions: Record<string, Permission[]>;
    total: string;
};

export type CreatePermissionType = Pick<
    Permission,
    'id' | 'name' | 'desc' | 'module'
>;
export type EditPermissionType = Pick<
    Permission,
    'id' | 'name' | 'desc' | 'module'
>;
