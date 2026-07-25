import { PaginatedData } from "./global";

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
        >
    >;
    search: string | null;
    filter: 'active' | 'inactive' | null;
    total: string;
    active: string;
    inactive: string;
};

// Thêm User
export type CreateUserType = {
    id?: string;
    name: string;
    email: string;
    tel: string;
    status: 'active' | 'inactive';
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
    password?: string;
    password_confirmation?: string;
    status?: 'active' | 'inactive';
};

// Xóa User
export type DeleteUserType = {};
