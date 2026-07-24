import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export const useUpdateStatus = () => {
    const handleUpdateStatus = (route: string, status: string) => {
        let toastID: string;
        router.patch(route,
            { status }, {
            onStart: () => {
                toastID = toast.loading("Thay đổi trạng thái...");
            },
            onSuccess: () => {
                toast.success("Thay đổi thành công", { id: toastID });
            },
            onError: () => {
                toast.error("Lỗi ! Cập nhật thất bại", { id: toastID });
            }
        }
        )
    }

    return {handleUpdateStatus}
}