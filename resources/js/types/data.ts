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
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
};

// User + Phân trang
export type UsersType = PaginatedData<
    Pick<User, 'id' | 'name' | 'email' | 'created_at'>
>;
