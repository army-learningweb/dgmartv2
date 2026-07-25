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
