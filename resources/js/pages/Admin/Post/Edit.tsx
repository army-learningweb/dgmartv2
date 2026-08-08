import { Head, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import FileUpload from "@/components/Admin/UploadFile/FileUpload";
import Select from "@/components/ui/Select";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { ReadEditPostType } from "@/types/module/post";
import { EditPostType } from "@/types/module/post";
import ButtonBackLink from "@/components/Admin/TableManager/ButtonBackLink";

export default function Edit({ post_info, post_categories }: ReadEditPostType) {
    const { data, setData, post, errors, processing, clearErrors, } = useForm<EditPostType>({
        file: null,
        old_file: post_info.media?.object_id,
        title: post_info.title,
        desc: post_info.desc,
        content: post_info.content,
        status: post_info.status,
        category_id: post_info.category_id,
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        post(`/admin/posts/${id}/update`, {
            preserveScroll: true,
            onSuccess: () => {
                clearErrors();
                toast.success('Cập nhật thành công');
                router.visit("/admin/posts");
            },
            onError: () => {
                toast.error("Lỗi không thể cập nhật, vui lòng kiểm tra lại !")
            }
        })
    }

    console.log(data);

    return (
        <>
            <Head title="Chỉnh sửa bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <SimpleBreadcrum prevRoute="/admin/posts" prevPage="Danh sách bài viết" currentPage="Chỉnh sửa bài viết" />
                </div>

                {/* form */}
                <form onSubmit={(e) => handleSubmit(e, post_info.id)} className="mt-2">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-[70%]">
                            <div className="md:mt-2">
                                <Textarea
                                    onBlur={() => clearErrors("title")}
                                    onChange={(e) => setData("title", e.target.value)}
                                    error={errors.title}
                                    value={data.title}
                                    label="Tiêu đề bài viết"
                                    name="title"
                                    className="h-20!"
                                />
                            </div>

                            <div className="mt-2">
                                <Textarea
                                    onBlur={() => clearErrors("desc")}
                                    onChange={(e) => setData("desc", e.target.value)}
                                    error={errors.desc}
                                    value={data.desc}
                                    label="Mô tả ngắn"
                                    name="desc"
                                    className="h-20!"
                                />
                            </div>

                            <div className="mt-2">
                                <MCEeditor
                                    onBlur={() => clearErrors("content")}
                                    error={errors.content}
                                    value={data.content}
                                    onChange={(content) => setData("content", content)}
                                    typeImageContent="post"
                                />
                            </div>
                        </div>

                        <div className="md:flex-1 mt-2">
                            <div className="sticky top-5">
                                <div>
                                    <FileUpload
                                        onSetData={setData}
                                        error={errors.file}
                                        onClearError={clearErrors}
                                        file_url={post_info.media?.file_url}
                                        file_name={post_info.media?.file_name}
                                    />
                                </div>

                                <div className="mt-2">
                                    <Select 
                                        label="Danh mục bài viết" 
                                        name="category_id" 
                                        onChange={(e) => setData("category_id", e.target.value)} 
                                        onBlur={() => clearErrors("category_id")}
                                        error={errors.category_id} 
                                        value={data.category_id}>
                                            <option value="">-Chọn danh mục bài viết-</option>
                                            {post_categories?.length > 0 && (
                                                post_categories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))
                                            )}
                                            {post_categories?.length === 0 && (
                                                <option value="">Hiện chưa có danh mục bài viết nào !</option>
                                            )}
                                    </Select>
                                </div>

                                <div className="mt-2">
                                    <Select label="Trạng thái" name="status" onChange={(e) => setData("status", e.target.value)} value={data.status}>
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Vô hiệu hóa</option>
                                    </Select>
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <ButtonBackLink route="/admin/posts"/>
                                    <Button size="small" processing={processing} processingLabel="Đang xử lí..." animatePress={true}>Cập nhật</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}



