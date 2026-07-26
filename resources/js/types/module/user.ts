import { PaginatedData } from "./global";

// Role
export type Role = {
    id: number
    name: string
}

// Đọc
export type User = {
    id: string;
    name: string;
    email: string;
    tel: string;
    status: 'active' | 'inactive';
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    role_id: string | undefined;
    role: Role
};

export type UsersReadType = {
    users: PaginatedData<
        Pick<
            User,
            | 'id'
            | 'name'
            | 'email'
            | 'tel'
            | 'status'
            | 'created_at'
            | 'updated_at'
            | 'role_id'
            | 'role'
        >
    >;
    search: string | null;
    filter: 'active' | 'inactive' | null;
    total: string;
    active: string;
    inactive: string;
    roles: Role[]
};

// Thêm User
export type CreateUserType = {
    id?: string;
    name: string;
    email: string;
    tel: string;
    status: 'active' | 'inactive';
    role_id: string | undefined;
    password: string;
    password_confirmation: string;
    user_on_page: number,
    last_page: number,
    current_page:number,
};

// Cập nhật User
export type EditUserType = {
    id: string;
    name: string;
    email: string;
    tel: string;
    status: 'active' | 'inactive';
    role_id: string | undefined;
    password?: string;
    password_confirmation?: string;
};

