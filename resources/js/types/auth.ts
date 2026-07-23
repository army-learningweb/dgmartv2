export type User = {
    id: number;
    name: string;
    email: string;
    tel: string;
    status: 'active' | 'unactive';
    email_verified_at: string | null;
    created_at: string;
    updated_at:string;
};

export type Auth = {
    user: User;
};
