import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Input from '@/components/ui/Input';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import Modal from '@/components/Admin/Modal/Modal';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import Title from '@/components/Admin/TableManager/Title';
import Textarea from '@/components/ui/Textarea';
import ShortCutHint from '@/components/Admin/TableManager/Hint';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import Pagination from '@/components/Admin/Pagination/Pagination';

import { useModal } from '@/hooks/use-modal';
import { useShortCut } from '@/hooks/use-shortcut';
import { useInputFocus } from '@/hooks/use-inputFocus';
import { useFilter } from '@/hooks/use-filter';
import { useSearch } from '@/hooks/use-search';

import { ReadProductConfigGroupType } from '@/types/module/product_config_group';
import { CreateProductConfigGroupType } from '@/types/module/product_config_group';
import { EditProductConfigGroupType } from '@/types/module/product_config_group';

export default function ReadConfigGroup({
    configGroup,
    total,
    configGroupSuggest,
    search,
}: ReadProductConfigGroupType) {
    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<CreateProductConfigGroupType>({
        id: '',
        name: '',
        desc: '',
    });

    // Modal hooks
    const {
        openModal,
        isEditModal,
        setOpenModal,
        setIsEditModal,
        handleOpenModal,
        handleCloseModal,
    } = useModal({ reset, clearErrors });

    // Shortcut hooks
    useShortCut({ openModal, handleOpenModal, handleCloseModal });

    // Input Focus hooks
    const { ipRef } = useInputFocus({ openModal });

    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/products/configs/group',
        initialsFilter: {
            page: configGroup.current_page == 1 ? '' : configGroup.current_page,
        },
        onlyLoad: ['configGroup', 'search'],
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
        initialData: configGroupSuggest,
        placeholder: 'Tìm kiếm theo tên nhóm...',
        routeGetData: '/admin/products/configs/group/getGroup',
    });

    // Modal Edit Mode
    const handleEdit = async (group: EditProductConfigGroupType) => {
        setData({
            id: group.id,
            name: group.name,
            desc: group.desc,
        });
        setOpenModal(true);
        setIsEditModal(true);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/products/configs/group/store', {
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
        patch(`/admin/products/configs/group/${data.id}/update`, {
            onSuccess: () => {
                setOpenModal(false);
                reset();
                clearErrors();
                toast.success('Cập nhật thành công');
            },
        });
    };

    // Xóa
    const handleDelete = (id: string | number) => {
        if (confirm('Bạn có chắc muốn xóa nhóm cấu hình này ?')) {
            let toastID: string;
            router.delete(`/admin/products/configs/group/${id}/delete`, {
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
            <Head title="Nhóm cấu hình" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title={
                    !isEditModal ? 'Thêm nhóm cấu hình' : 'Chỉnh sửa thông tin'
                }
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createConfigGroup"
                processing={processing}
            >
                <form
                    onSubmit={!isEditModal ? handleCreate : handleUpdate}
                    id="createConfigGroup"
                >
                    <div>
                        <Input
                            ref={ipRef}
                            type="text"
                            name="name"
                            label="Tên nhóm"
                            error={errors.name}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            onBlur={() => clearErrors('name')}
                            autoComplete="on"
                        />
                        <p className="mt-1 text-gray-500">VD: RAM, CPU,...</p>
                    </div>

                    <div className="mt-2">
                        <Textarea
                            onBlur={() => clearErrors('desc')}
                            onChange={(e) => setData('desc', e.target.value)}
                            error={errors.desc}
                            value={data.desc}
                            label="Mô tả ngắn"
                            name="desc"
                            className="h-20!"
                        />
                        <p className="mt-1 text-gray-500">
                            VD: Bộ nhớ tạm máy tính.
                        </p>
                    </div>
                </form>
            </Modal>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Nhóm cấu hình (${total})`} />

                    <div className="flex items-center gap-2">
                        <ShortCutHint />
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center justify-between md:flex-row">
                    {/* filter & search */}
                    <div className="flex w-full flex-1 flex-col gap-2 md:flex-row md:justify-between">
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
                    </div>
                </div>

                {/* data */}
                {configGroup?.data.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Tên loại</td>
                                    <td className="px-5 py-2">Mô tả</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {configGroup.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 last-of-type:border-0"
                                    >
                                        <td className="px-5 py-2.5">
                                            <div className="w-60 truncate">
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="px-5 py-2.5">
                                            <div className="w-65 truncate text-gray-500">
                                                {item.desc}
                                            </div>
                                        </td>
                                        <td className="px-5 py-2.5">
                                            <div className="w-30">
                                                {item.created_at}
                                            </div>
                                        </td>
                                        <td className="px-5 py-2.5">
                                            <div className="w-30">
                                                {item.updated_at}
                                            </div>
                                        </td>
                                        <td className="px-5 py-2.5">
                                            <div className="flex h-6.75 gap-2">
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
                        <div className="inline-flex w-full flex-col gap-2 md:hidden">
                            {configGroup.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex h-22 w-full justify-between border-b border-gray-200 p-3"
                                >
                                    <div className="mt-3">
                                        <p className="w-50 truncate">
                                            {item.name}
                                        </p>
                                        <p className="w-40 truncate text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="flex h-6.75 flex-col gap-2">
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
                            ))}
                        </div>
                    </div>
                )}

                {/* pagination */}
                {configGroup.data?.length > 0 && (
                    <Pagination
                        firstUrl={configGroup.first_page_url}
                        lastUrl={configGroup.last_page_url}
                        prevUrl={configGroup.prev_page_url}
                        nextUrl={configGroup.next_page_url}
                        currentPage={configGroup.current_page}
                        lastPage={configGroup.last_page}
                    />
                )}

                {/* empty */}
                {configGroup?.data.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
