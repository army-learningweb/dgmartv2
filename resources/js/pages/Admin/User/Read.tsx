import { Head, useForm, usePage, router } from '@inertiajs/react';
import { TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

import Title from '@/components/Admin/TableManager/Title';
import RoleBadge from '@/components/Admin/TableManager/RoleBadge';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import UserAvatar from '@/components/Admin/TableManager/UserAvatar';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Modal from '@/components/Admin/Modal/Modal';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import FilterTabGroup from '@/components/Admin/TableManager/FilterTabGroup';

import { useSearch } from '@/hooks/use-search';
import { useFilter } from '@/hooks/use-filter';
import { useModal } from '@/hooks/use-modal';

import { UsersReadType } from '@/types/module/user';
import { CreateUserType } from '@/types/module/user';
import { EditUserType } from '@/types/module/user';
import { Auth } from '@/types';

export default function Read({
    users,
    suggest_users,
    search,
    filter_status,
    total,
    active,
    inactive,
    roles,
}: UsersReadType) {
    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<CreateUserType>({
        id: '',
        name: '',
        email: '',
        tel: '',
        status: 'active',
        role_id: '',
        password: '',
        password_confirmation: '',
        user_on_page: users?.data?.length,
        last_page: users.last_page,
        current_page: users.current_page,
    });

    const { user } = usePage<{ auth: Auth }>().props.auth;

    // Modal hooks
    const {
        openModal,
        isEditModal,
        setOpenModal,
        setIsEditModal,
        handleOpenModal,
        handleCloseModal,
    } = useModal({ reset, clearErrors });

    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/users',
        initialsFilter: {
            filter_status,
            search,
            page: users.current_page,
        },
        onlyLoad: ['users', 'filter_status'],
    });

    // Tìm kiếm
    const {
        querySearch,
        loadingSearch,
        dataSuggest,
        openSuggest,
        placeholderSearch,
        handleQuerySearch,
        handleClearQuerySearch,
        handleSetPlaceHolder,
        handleFocusSearch,
        handleBlurSearch,
        handleChoose,
        handleLeave,
    } = useSearch({
        handleQueryFilter,
        search,
        initialData: suggest_users,
        placeholder: 'Tìm kiếm theo tên, số điện thoại...',
        routeGetData: '/admin/users/getUsers',
    });

    const filterTabData = [
        {
            label: 'Tất cả',
            onFilter: () => handleQueryFilter({ filter_status: null }),
            countData: total,
            isActive: filter_status === null,
        },
        {
            label: 'Hoạt động',
            onFilter: () => handleQueryFilter({ filter_status: 'active' }),
            countData: active,
            isActive: filter_status === 'active',
        },
        {
            label: 'Vô hiệu hóa',
            onFilter: () => handleQueryFilter({ filter_status: 'inactive' }),
            countData: inactive,
            isActive: filter_status === 'inactive',
        },
    ];

    // Mở Modal mode edit
    const handleEdit = (user: EditUserType) => {
        setData({
            id: user.id,
            name: user.name,
            tel: user.tel,
            email: user.email,
            status: user.status,
            role_id: user.role_id ?? '',
            password: '',
            password_confirmation: '',
        });
        setOpenModal(true);
        setIsEditModal(true);
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
                setOpenModal(false);
                reset();
                clearErrors();
                toast.success('Thêm mới thành công');
            },
        });
    };

    // Sửa
    const handleUpdate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(`/admin/users/${data.id}/update`, {
            onError: () => {
                reset('password');
                reset('password_confirmation');
            },
            onSuccess: () => {
                setOpenModal(false);
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
            router.delete(`/admin/users/${id}/delete`, {
                data: {
                    user_on_page: users?.data?.length,
                    current_page: users.current_page,
                },
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
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                processing={processing}
                title={
                    !isEditModal ? 'Thêm mới thành viên' : 'Chỉnh sửa thông tin'
                }
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createUser"
                customSize="w-[90%] md:w-[38%] min-h-[50%]"
            >
                <form
                    onSubmit={!isEditModal ? handleCreate : handleUpdate}
                    id="createUser"
                >
                    {Object.keys(errors).length > 0 && (
                        <ul className="rounded-lg bg-red-50 p-4 text-red-700 transition-all duration-150">
                            {Object.values(errors).map((error, index) => (
                                <li
                                    key={index}
                                    className="mt-1 flex items-center gap-2 first-of-type:mt-0"
                                >
                                    <TriangleAlert
                                        size={16}
                                        strokeWidth={1.7}
                                    />
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-2 grid gap-4 md:grid-cols-2">
                        <div>
                            <Input
                                type="text"
                                name="name"
                                label="Họ và tên"
                                error={errors.name}
                                showError={false}
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                onBlur={() => clearErrors('name')}
                                autoComplete="on"
                            />
                        </div>

                        <div>
                            <Input
                                type="tel"
                                name="tel"
                                label="Số điện thoại"
                                error={errors.tel}
                                showError={false}
                                value={data.tel}
                                onChange={(e) => setData('tel', e.target.value)}
                                onBlur={() => clearErrors('tel')}
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <Input
                            type="text"
                            name="email"
                            label="Email"
                            error={errors.email}
                            showError={false}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            onBlur={() => clearErrors('email')}
                            autoComplete="username"
                        />
                    </div>

                    <div className="mt-2 grid gap-4 md:grid-cols-2">
                        <div>
                            <Input
                                type="password"
                                name="password"
                                label="Mật khẩu"
                                error={errors.password}
                                showError={false}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                onBlur={() => clearErrors('password')}
                                autoComplete="current-password"
                            />
                        </div>

                        <div>
                            <Input
                                type="password"
                                name="password_confirmation"
                                label="Xác nhận mật khẩu"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <Select
                            onChange={(e) => setData('role_id', e.target.value)}
                            label="Phân vai trò"
                            name="role_id"
                            error={errors.role_id}
                            value={data.role_id}
                        >
                            <option value="">-Chọn vai trò-</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </Select>
                        <p className="mt-2 text-gray-500">(Không bắt buộc)</p>
                    </div>

                    <div className="mt-2">
                        <Select
                            label="Trạng thái"
                            name="status"
                            onChange={(e) =>
                                setData(
                                    'status',
                                    e.target.value as 'active' | 'inactive',
                                )
                            }
                            value={data.status}
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                </form>
            </Modal>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading="Danh sách thành viên" />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex items-center justify-between">
                    {/* filter & search */}

                    <SearchBar
                        onChange={handleQuerySearch}
                        onClearQuery={handleClearQuerySearch}
                        onFocus={handleFocusSearch}
                        onBlur={handleBlurSearch}
                        onMouseDown={handleChoose}
                        onMouseEnter={handleSetPlaceHolder}
                        onMouseLeave={handleLeave}
                        dataSuggest={dataSuggest}
                        querySearch={querySearch}
                        placeHolderSearch={placeholderSearch}
                        loadingSearch={loadingSearch}
                        openSuggest={openSuggest}
                    />

                    {/* stats */}
                    <FilterTabGroup data={filterTabData} />
                </div>

                {/* data */}
                {users.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
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
                                                <div className="flex flex-col gap-0.75">
                                                    <div className="w-35 truncate">
                                                        {item.name}
                                                    </div>

                                                    {item.role && (
                                                        <RoleBadge
                                                            name={
                                                                item.role.name
                                                            }
                                                        />
                                                    )}

                                                    {!item.role && (
                                                        <div className="text-xs text-gray-500">
                                                            Chưa phân vai trò !
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* email & tel */}
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="w-50 truncate">
                                                    {item.email}
                                                </div>
                                                <div className="text-gray-500">
                                                    {item.tel}
                                                </div>
                                            </div>
                                        </td>

                                        {/* create at */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>

                                        {/* update at */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate">
                                                {item.updated_at}
                                            </div>
                                        </td>

                                        {/* status */}
                                        <td className="px-4 py-3">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>

                                        {/* setting */}
                                        <td className="px-4 py-3">
                                            <div
                                                className={clsx(
                                                    'flex h-6.75 gap-2',
                                                    {
                                                        'pointer-events-none opacity-50':
                                                            item.id ==
                                                            String(user.id),
                                                    },
                                                )}
                                            >
                                                <ButtonEdit
                                                    onEdit={() =>
                                                        handleEdit(item)
                                                    }
                                                />
                                                <ButtonDelete
                                                    onDelete={() =>
                                                        handleDelete(item.id)
                                                    }
                                                />
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
                                            {item.status === 'active' && (
                                                <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-green-600"></div>
                                            )}
                                            {item.status === 'inactive' && (
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
                                                        item.id ==
                                                        String(user.id),
                                                },
                                            )}
                                        >
                                            <ButtonEdit
                                                onEdit={() => handleEdit(item)}
                                            />
                                            <ButtonDelete
                                                onDelete={() =>
                                                    handleDelete(item.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {users.data?.length === 0 && <EmptyData showFallBack={true} />}

                {/* pagination */}
                {users.data?.length > 0 && (
                    <Pagination
                        firstUrl={users.first_page_url}
                        lastUrl={users.last_page_url}
                        prevUrl={users.prev_page_url}
                        nextUrl={users.next_page_url}
                        currentPage={users.current_page}
                        lastPage={users.last_page}
                    />
                )}
            </section>
        </>
    );
}
