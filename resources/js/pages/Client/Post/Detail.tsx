import { Head } from '@inertiajs/react';
import { PostDetailProps } from '@/types/module/client_posts';
import parse from 'html-react-parser';
import OtherPosts from '@/components/Client/PostDetailPage/OtherPosts';

export default function Detail({ post, other_posts }: PostDetailProps) {
    return (
        <>
            <Head title="Chi tiết bài viết" />
            <div className="mx-auto mt-4 flex max-w-312 gap-4">
                <div className="w-[65%] rounded-2xl bg-white p-6 shadow">
                    {/* title */}
                    <div className="space-y-2 tracking-tight">
                        <h1 className="text-2xl font-medium">
                            {post.data.title}
                        </h1>
                        <h2 className="text-[16px] leading-6 tracking-tight text-gray-700">
                            {post.data.desc}
                        </h2>
                    </div>

                    {/* thumb */}
                    <div className="mt-4 h-100 w-full overflow-hidden rounded-2xl bg-gray-200">
                        <img
                            src={post.data.image}
                            alt={post.data.image_alt}
                            className="h-full w-full"
                        />
                    </div>

                    {/* content */}
                    <div className="tinymce-content mt-4 text-justify">
                        {parse(post.data.content)}
                    </div>

                    <div className="my-4 flex flex-col items-end justify-end gap-1">
                        <span>Ngày đăng: 03/09/2026</span>
                        <span>Tác giả: Lưu Đức Vỹ</span>
                    </div>
                </div>

                {/* orther post */}
                <OtherPosts data={other_posts?.data}/> 
            </div>
        </>
    );
}
