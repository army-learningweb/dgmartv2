import { Head, useForm, usePage } from "@inertiajs/react"
import { Ellipsis, Pen, Trash } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button"
import UserAvatar from "@/components/ui/UserAvatar";
import Pagination from "@/components/Admin/Pagination/Pagination";
import ModalCreate from "@/components/Admin/Modal/ModalCreate";
import ModalEdit from "@/components/Admin/Modal/ModalEdit";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

import { UsersType } from "@/types/data";
import { CreateUserType } from "@/types/data";
import { EditUserType } from "@/types/data";
import { Auth } from "@/types";
import clsx from "clsx";

export default function Read({ users }: { users: UsersType }) {

    const { data, setData, post, patch, delete: destroy, errors, processing, reset, clearErrors } = useForm<CreateUserType>({
        id: "",
        name: "",
        email: "",
        tel: "",
        password: "",
        password_confirmation: ""
    });

    const { user } = usePage<{ auth: Auth }>().props.auth;

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState<null | string>(null);

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);

    }

    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/admin/users/store", {
            onError: () => {
                reset('password');
                reset("password_confirmation");
            },
            onSuccess: () => {
                setOpenModalCreate(false);
                reset();
                clearErrors();
                toast.success("Thêm mới thành công");

            }
        })
    }

    const handleOpenModalEdit = (user: EditUserType) => {
        setData({
            id: user.id,
            name: user.name,
            tel: user.tel,
            email: user.email,
            password: "",
            password_confirmation: ""
        })
        setIdUpdate(user.id)
        setOpenModalEdit(true);

    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);

    }

    const handleEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(`/admin/users/${idUpdate}/update`, {
            onError: () => {
                reset('password');
                reset("password_confirmation");
            },
            onSuccess: () => {
                setOpenModalEdit(false);
                reset();
                clearErrors();
                toast.success("Cập nhật thành công");
            }
        })
    }

    const handleDelete = (id: string) => {
        if (confirm("Bạn có chắc muốn xóa thành viên này ?")) {
            let toastID: string;
            destroy(`/admin/users/${id}/delete`, {
                onStart: () => {
                    toastID = toast.loading("Đang xóa...");
                },
                onSuccess: () => {
                    toast.success("Xóa thành công", { id: toastID });
                }
            })
        }
    }

    const handleUpdateStatus = (id: string) => {
        
    }

    return (
        <>
            <Head title="Thành viên" />

            {/* Modal */}
            <ModalCreate onClose={handleCloseModalCreate} isOpen={openModalCreate}
                customSize="w-[90%] md:w-[27%] min-h-[50%]"
                title="Thêm mới thành viên"
                labelSubmit="Thêm mới"
                formSubmitId="createUser"
                processing={processing}>
                <form onSubmit={handleCreate} id="createUser">
                    <div>
                        <Input type="text" name="name" label="Họ và tên" error={errors.name} value={data.name} onChange={(e) => setData("name", e.target.value)} autoComplete="on" />
                    </div>

                    <div className="mt-2">
                        <Input type="text" name="email" label="Email" error={errors.email} value={data.email} onChange={(e) => setData("email", e.target.value)} autoComplete="username" />
                    </div>

                    <div className="mt-2">
                        <Input type="password" name="password" label="Mật khẩu" error={errors.password} value={data.password} onChange={(e) => setData("password", e.target.value)} autoComplete="current-password" />
                    </div>

                    <div className="mt-2">
                        <Input type="password" name="password_confirmation" label="Xác nhận mật khẩu" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} autoComplete="new-password" />
                    </div>
                </form>
            </ModalCreate>

            <ModalEdit onClose={handleCloseModalEdit} isOpen={openModalEdit}
                customSize="w-[90%] md:w-[27%] min-h-[50%]"
                title="Cập nhật thông tin"
                labelSubmit="Cập nhật"
                formSubmitId="editUser"
                processing={processing}>
                <form onSubmit={handleEdit} id="editUser">
                    <div>
                        <Input type="text" name="name" label="Họ và tên" error={errors.name} value={data.name} onChange={(e) => setData("name", e.target.value)} autoComplete="on" />
                    </div>

                    <div className="mt-2">
                        <Input type="tel" name="tel" label="Số điện thoại" error={errors.tel} value={data.tel} onChange={(e) => setData("tel", e.target.value)} autoComplete="on" />
                    </div>

                    <div className="mt-2">
                        <Input type="text" name="email" label="Email" error={errors.email} value={data.email} onChange={(e) => setData("email", e.target.value)} autoComplete="username" />
                    </div>

                    <div className="mt-2">
                        <Input type="password" name="password" label="Mật khẩu mới" error={errors.password} value={data.password} onChange={(e) => setData("password", e.target.value)} autoComplete="current-password" />
                    </div>

                    <div className="mt-2">
                        <Input type="password" name="password_confirmation" label="Xác nhận mật khẩu" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} autoComplete="new-password" />
                    </div>
                </form>
            </ModalEdit>

            {/* data */}
            <section>
                {/* title */}
                <div className="flex justify-between items-center">
                    <h1 className="font-medium text-lg tracking-tight mt-px">Danh sách thành viên</h1>
                    <Button onClick={() => setOpenModalCreate(true)} animatePress={true} size="small" variant="outline">+ Thêm mới thành viên</Button>
                </div>
                <hr className="border-gray-100 my-3" />
                {/* data */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* desktop */}
                    <table className="w-full hidden md:table">
                        <thead className="font-medium border-b border-gray-200 bg-gray-100">
                            <tr>
                                <td className="py-2 px-4">Thành viên</td>
                                <td className="py-2 px-4">Email & Số điện thoại</td>
                                <td className="py-2 px-4">Ngày tạo</td>
                                <td className="py-2 px-4">Trạng thái</td>
                                <td className="py-2 px-4">Tùy chỉnh</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(item => (
                                <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0 transition-alls duration-150">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar name={item.name} />
                                            <div className="flex flex-col gap-1">
                                                <div>{item.name}</div>
                                                <div className="text-gray-500 text-xs px-2 py-0.5 bg-gray-200 w-fit rounded-md font-medium">Admin</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-col gap-1">
                                            <div>{item.email}</div>
                                            <div className="text-gray-500">{item.tel}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.created_at}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-[45%]">
                                                <Badge status={item.status} />
                                            </div>

                                            <div onClick={() => handleUpdateStatus(item.id)} className="w-10 cursor-pointer">
                                                <div className={clsx("bg-gray-100 p-0.5 rounded-xl", {
                                                    "bg-gray-200": item.status === "inactive",
                                                    "bg-green-600": item.status === "active"
                                                })}>
                                                    <div className={clsx("w-3.75 h-3.75 rounded-full bg-white shadow border border-gray-200 transition-transform duration-150", {
                                                        "translate-x-0": item.status === "inactive",
                                                        "translate-x-5.25": item.status === "active"
                                                    })}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className={clsx("flex gap-2", {
                                            "opacity-50 pointer-events-none": item.id == String(user.id)
                                        })}>
                                            <Button onClick={() => handleOpenModalEdit(item)} variant="outline" size="small" animatePress={true}>
                                                <Pen size={13} className="text-gray-400" />
                                                <span>Cập nhật</span>
                                            </Button>

                                            <Button onClick={() => handleDelete(item.id)} variant="outline" size="small" animatePress={true}>
                                                <Trash size={13} className="text-gray-400" />
                                                <span>Xóa</span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* mobile */}
                    <div className="inline-flex flex-col gap-2 md:hidden w-full">
                        {users.data.map(user => (
                            <div key={user.id} className="border-b border-gray-200 p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar name={user.name} />
                                        <div className="flex flex-col">
                                            <div>{user.name}</div>
                                            <div className="text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                    <div onClick={() => handleOpenModalEdit(user)}
                                        className="p-2 border border-gray-200 bg-white rounded-lg w-fit active:translate-y-0.5 transition-transform duration-150">
                                        <Ellipsis size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* pagination */}
                <Pagination
                    firstUrl={users.first_page_url}
                    lastUrl={users.last_page_url}
                    prevUrl={users.prev_page_url}
                    nextUrl={users.next_page_url}
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                />
            </section>

        </>
    )
}