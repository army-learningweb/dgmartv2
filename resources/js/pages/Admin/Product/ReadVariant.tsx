import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';

import { products } from '@/types/module/product_variant';

export default function ReadVariant({ products }: products) {

    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa thành viên này ?')) {
            let toastID: string;
            router.delete(`/admin/users/${id}/delete`, {
                // data: {
                //     user_on_page: users?.data?.length,
                //     current_page: users.current_page,
                // },
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            });
        }
    };

    return (
        <>
            <Head title="Cấu hình và biến thể" />

            <section>
                <div className="flex justify-between items-center">
                    <Title heading="Cấu hình và biến thể" />
                    <ButtonCreateLink route="/admin/products/variants/create"/>
                </div>
            </section>
        </>
    )
}