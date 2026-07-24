import { Head, useForm, usePage } from '@inertiajs/react';
import { Pen, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/ui/Button';
import UserAvatar from '@/components/ui/UserAvatar';
import Pagination from '@/components/Admin/Pagination/Pagination';
import ModalCreate from '@/components/Admin/Modal/ModalCreate';
import ModalEdit from '@/components/Admin/Modal/ModalEdit';
import Input from '@/components/ui/Input';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import FilterTab from '@/components/Admin/TableManager/FilterTab';
import SwitchStatus from '@/components/Admin/TableManager/SwitchStatus';

import { useSearch } from '@/hooks/use-search';
import { useFilter } from '@/hooks/use-filter';
import { useUpdateStatus } from '@/hooks/use-updateStatus';

import { UsersReadType } from '@/types/data';
import { CreateUserType } from '@/types/data';
import { EditUserType } from '@/types/data';
import { Auth } from '@/types';
import clsx from 'clsx';

export default function Read({
    users,
    search,
    filter,
    total,
    active,
    inactive,
}: UsersReadType) {
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<CreateUserType>({
        id: '',
        name: '',
        email: '',
        tel: '',
        password: '',
        password_confirmation: '',
    });

    const { user } = usePage<{ auth: Auth }>().props.auth;
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState<null | string>(null);
    const [queryFilter, setQueryFilter] = useState<null | string>(
        filter ?? null,
    );
    const [querySearch, setQuerySearch] = useState<string>(search ?? '');
    const { handleQueryFilter } = useFilter({ querySearch, setQueryFilter });
    const { isLoadingSearch, handleQuerySearch, handleClearSearch } = useSearch(
        { queryFilter, setQuerySearch },
    );
    const { handleUpdateStatus } = useUpdateStatus();

    // Đóng
    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);
    };

    // Mở modal edit
    const handleOpenModalEdit = (user: EditUserType) => {
        setData({
            id: user.id,
            name: user.name,
            tel: user.tel,
            email: user.email,
            password: '',
            password_confirmation: '',
        });
        setIdUpdate(user.id);
        setOpenModalEdit(true);
    };

    // Đóng modal edit
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/users/store', {
            onError: () => {
                reset('password');
                reset('password_confirmation');
            },
            onSuccess: () => {
                setOpenModalCreate(false);
                reset();
                clearErrors();
                toast.success('Thêm mới thành công');
            },
        });
    };

    // Sửa
    const handleEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(`/admin/users/${idUpdate}/update`, {
            onError: () => {
                reset('password');
                reset('password_confirmation');
            },
            onSuccess: () => {
                setOpenModalEdit(false);
                reset();
                clearErrors();
                toast.success('Cập nhật thành công');
            },
        });
    };

    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa thành viên này ?')) {
            let toastID: string;
            destroy(`/admin/users/${id}/delete`, {
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
            <Head title="Thành viên" />

            {/* Modal */}
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[27%] min-h-[50%]"
                title="Thêm mới thành viên"
                labelSubmit="Thêm mới"
                formSubmitId="createUser"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createUser">
                    <div>
                        <Input
                            type="text"
                            name="name"
                            label="Họ và tên"
                            error={errors.name}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="on"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="tel"
                            name="tel"
                            label="Số điện thoại"
                            error={errors.tel}
                            value={data.tel}
                            onChange={(e) => setData('tel', e.target.value)}
                            autoComplete="on"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="text"
                            name="email"
                            label="Email"
                            error={errors.email}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="password"
                            name="password"
                            label="Mật khẩu"
                            error={errors.password}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="password"
                            name="password_confirmation"
                            label="Xác nhận mật khẩu"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            autoComplete="new-password"
                        />
                    </div>
                </form>
            </ModalCreate>

            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[27%] min-h-[50%]"
                title="Cập nhật thông tin"
                labelSubmit="Cập nhật"
                formSubmitId="editUser"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="editUser">
                    <div>
                        <Input
                            type="text"
                            name="name"
                            label="Họ và tên"
                            error={errors.name}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="on"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="tel"
                            name="tel"
                            label="Số điện thoại"
                            error={errors.tel}
                            value={data.tel}
                            onChange={(e) => setData('tel', e.target.value)}
                            autoComplete="on"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="text"
                            name="email"
                            label="Email"
                            error={errors.email}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="password"
                            name="password"
                            label="Mật khẩu mới"
                            error={errors.password}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="mt-2">
                        <Input
                            type="password"
                            name="password_confirmation"
                            label="Xác nhận mật khẩu"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            autoComplete="new-password"
                        />
                    </div>
                </form>
            </ModalEdit>

            {/* data */}
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium">
                        Danh sách thành viên
                    </h1>
                    <Button
                        onClick={() => setOpenModalCreate(true)}
                        animatePress={true}
                        size="small"
                    >
                        + Thêm mới thành viên
                    </Button>
                </div>

                {/* filter & search */}
                <div className="mt-3 flex items-center justify-between">
                    {/* search */}
                    <SearchBar
                        onSearch={handleQuerySearch}
                        onClear={handleClearSearch}
                        querySearch={querySearch}
                        loadingSearch={isLoadingSearch}
                        resultCount={users.data.length}
                    />

                    {/* stats */}
                    <div className="hidden gap-1 rounded-xl bg-gray-100/70 p-1 tracking-tight md:grid md:grid-cols-3">
                        <FilterTab
                            onFilter={() => handleQueryFilter(null)}
                            isActive={queryFilter === null}
                            countData={total}
                            label="Tất cả"
                        />
                        <FilterTab
                            onFilter={() => handleQueryFilter('active')}
                            isActive={queryFilter === 'active'}
                            countData={active}
                            label="Hoạt động"
                        />
                        <FilterTab
                            onFilter={() => handleQueryFilter('inactive')}
                            isActive={queryFilter === 'inactive'}
                            countData={inactive}
                            label="Vô hiệu hóa"
                        />
                    </div>
                </div>

                {/* data */}
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                    {/* desktop */}
                    <table className="hidden w-full md:table">
                        <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                            <tr>
                                <td className="px-4 py-2">Thành viên</td>
                                <td className="px-4 py-2">
                                    Email & Số điện thoại
                                </td>
                                <td className="px-4 py-2">Ngày tạo</td>
                                <td className="px-4 py-2">Cập nhật</td>
                                <td className="px-4 py-2">Trạng thái</td>
                                <td className="px-4 py-2">Tùy chỉnh</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0"
                                >
                                    {/* user */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar name={item.name} />
                                            <div className="flex flex-col gap-1">
                                                <div className="w-30 truncate">
                                                    {item.name}
                                                </div>
                                                <div className="w-fit rounded-md bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500">
                                                    Admin
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* email & tel */}
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="w-40 truncate">
                                                {item.email}
                                            </div>
                                            <div className="text-gray-500">
                                                {item.tel}
                                            </div>
                                        </div>
                                    </td>

                                    {/* create at */}
                                    <td className="px-4 py-3">
                                        {item.created_at}
                                    </td>

                                    {/* update at */}
                                    <td className="px-4 py-3">
                                        {item.updated_at}
                                    </td>

                                    {/* status */}
                                    <td className="px-4 py-3">
                                        <SwitchStatus
                                            status={item.status}
                                            onUpdate={() =>
                                                handleUpdateStatus(
                                                    `/admin/users/${item.id}/updateStatus`,
                                                    item.status == 'active'
                                                        ? 'inactive'
                                                        : 'active',
                                                )
                                            }
                                        />
                                    </td>

                                    {/* setting */}
                                    <td className="px-4 py-3">
                                        <div
                                            className={clsx('flex gap-2', {
                                                'pointer-events-none opacity-50':
                                                    item.id == String(user.id),
                                            })}
                                        >
                                            <Button
                                                onClick={() =>
                                                    handleOpenModalEdit(item)
                                                }
                                                variant="outline"
                                                size="small"
                                                animatePress={true}
                                            >
                                                <Pen
                                                    size={13}
                                                    className="text-gray-400"
                                                />
                                                <span>Cập nhật</span>
                                            </Button>

                                            <Button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                variant="outline"
                                                size="small"
                                                animatePress={true}
                                            >
                                                <Trash
                                                    size={13}
                                                    className="text-gray-400"
                                                />
                                                <span>Xóa</span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* mobile */}
                    <div className="inline-flex w-full flex-col gap-1 md:hidden">
                        {users.data.map((item) => (
                            <div
                                key={item.id}
                                className="border-b border-gray-200 p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="relative flex items-center gap-3">
                                        {item.status === "active" && (
                                            <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-green-600"></div>
                                        )}
                                        {item.status === "inactive" && (
                                            <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-red-600"></div>
                                        )}  
                                        <UserAvatar name={item.name} />
                                        <div className="flex flex-col">
                                            <div className="w-30 truncate">
                                                {item.name}
                                            </div>
                                            <div className="w-30 truncate text-gray-500">
                                                {item.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx(
                                            'flex flex-col gap-2 md:flex-row',
                                            {
                                                'pointer-events-none opacity-50':
                                                    item.id == String(user.id),
                                            },
                                        )}
                                    >
                                        <Button
                                            onClick={() =>
                                                handleOpenModalEdit(item)
                                            }
                                            variant="outline"
                                            size="small"
                                            animatePress={true}
                                        >
                                            <Pen
                                                size={13}
                                                className="text-gray-400"
                                            />
                                            <span>Cập nhật</span>
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            variant="outline"
                                            size="small"
                                            animatePress={true}
                                        >
                                            <Trash
                                                size={13}
                                                className="text-gray-400"
                                            />
                                            <span>Xóa</span>
                                        </Button>
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
    );
}
