import { Head, usePage } from '@inertiajs/react';
import { PostDetailProps } from '@/types/module/client_posts';
import parse from 'html-react-parser';
import { Link } from '@inertiajs/react';

export default function Detail({ post, other_posts }: PostDetailProps) {
    const { url } = usePage();
    const path = url.split('/')[1];

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

                {other_posts.data?.length > 0 && (
                    <div className="flex-1">
                        <div className="sticky top-3 rounded-2xl bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-medium">
                                    Bài viết & tin tức khác
                                </h1>

                                <Link
                                    href="/bai-viet-tin-tuc"
                                    className="text-blue-600 hover:underline"
                                >
                                    Xem tất cả
                                </Link>
                            </div>

                            <div className="mt-4 flex w-full flex-col gap-4">
                                {other_posts.data.map((item) => (
                                    <Link
                                        href={`/${path}/${item.slug}`}
                                        key={item.id}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="relative h-23 w-[40%] shrink-0 overflow-hidden rounded-xl bg-gray-200">
                                            <div className="absolute top-0 left-0 z-50 rounded-br-xl bg-black/80 px-3 py-1 text-white">
                                                {item.created_at}
                                            </div>

                                            <img
                                                src={item.image}
                                                alt={item.image_alt}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="line-clamp-2 font-medium group-hover:underline">
                                                {item.title}
                                            </div>
                                            <p className="line-clamp-2 text-gray-500">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
