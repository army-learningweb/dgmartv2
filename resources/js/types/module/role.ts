import { Permission } from "./permission";

export type Role = {
    id: string;
    name: string;
    desc: string;
    created_at: string;
    updated_at: string;
};

export type ReadRoleType = {
    roles: Role[];
    permissions: Record<string,Permission[]>
    total: string;
};

export type CreateRoleType = {
    id: string;
    name: string;
    desc: string;
    permissions: string[];
}

export type EditRoleType = {
    id: string;
    name: string;
    desc: string;
    permissions?: string[];
}