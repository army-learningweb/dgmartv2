// Phân trang
export type PaginatedData<T> = {
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    data: T[];
};

// User
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
    password: string;
    password_confirmation: string;
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
