import { Head, Link, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

import Button from "@/components/ui/Button";
import FileUpload from "@/components/Admin/TableManager/FileUpload";
import Select from "@/components/ui/Select";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";

import { ReadEditPostType } from "@/types/module/post";
import { EditPostType } from "@/types/module/post";

export default function Edit({ post_info, post_categories }: ReadEditPostType) {
    const { data, setData, post, errors, processing, reset, clearErrors, } = useForm<EditPostType>({
        file: null,
        title: post_info.title,
        desc: post_info.desc,
        content: post_info.content,
        status: post_info.status,
        category_id: post_info.category_id,
        file_id: post_info.media?.object_id
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
        })
    }

    return (
        <>
            <Head title="Chỉnh sửa bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <div className="mt-px text-lg font-medium tracking-tight flex gap-2">
                        <Link href="/admin/posts" className="text-gray-400 font-normal hover:underline">Danh sách bài viết</Link>/
                        <div>Chỉnh sửa bài viết</div>
                    </div>
                </div>

                {/* form */}
                <form onSubmit={(e) => handleSubmit(e, post_info.id)} className="mt-2">

                    {Object.keys(errors).length > 0 && (
                        <ul className="rounded-lg bg-red-50 p-4 text-red-700">
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

                    <div className="flex gap-4">
                        <div className="w-[50%] mt-2 overflow-hidden">
                            <FileUpload
                                onSetData={setData}
                                error={errors.file}
                                file_url={post_info.media?.file_url}
                                file_name={post_info.media?.file_name}
                            />
                        </div>

                        <div className="flex-1">
                            <div className="mt-2">
                                <Textarea value={data.title} onChange={(e) => setData("title", e.target.value)} label="Tiêu đề" name="title" error={errors.title} showError={false} className="h-26.5!" />
                            </div>

                            <div className="mt-2">
                                <Textarea value={data.desc} onChange={(e) => setData("desc", e.target.value)} label="Mô tả" name="desc" error={errors.title} showError={false} className="h-26.5!" />
                            </div>

                            <div className="mt-2">
                                <Select value={data.category_id} label="Danh mục bài viết" name="category_id" onChange={(e) => setData("category_id", e.target.value)} error={errors.category_id} showError={false}>
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
                                <Select value={data.status} label="Trạng thái" name="status" onChange={(e) => setData("status", e.target.value)}>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Vô hiệu hóa</option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <MCEeditor value={data.content} onChange={(content) => setData("content", content)} />
                    </div>

                    <div className="mt-2 flex justify-end">
                        <Button processing={processing} processingLabel="Đang xử lí..." animatePress={true}>Cập nhật</Button>
                    </div>
                </form>
            </section>
        </>
    )
}