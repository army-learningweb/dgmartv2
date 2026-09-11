import { Link } from "@inertiajs/react";
import { PostsProps } from "@/types/module/client_posts";
import OrtherPostItem from "./OrtherPostItem";

interface OtherPostsProps {
    data: PostsProps[];
}

export default function OtherPosts({data} : OtherPostsProps){
    return (
        <>
            {data?.length > 0 && (
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
                            {data.map((item) => (
                                <OrtherPostItem key={item.id} dataItem={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}