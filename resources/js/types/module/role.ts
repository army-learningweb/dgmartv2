export type Role = {
    id: string;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
};

export type ReadRoleType = {
    roles: Role[];
    total: string;
};

export type CreateRoleType = Pick<
    Role,
    'id' | 'name' | 'desc'
>;
export type EditRoleType = Pick<
    Role,
    'id' | 'name' | 'desc'
>;
