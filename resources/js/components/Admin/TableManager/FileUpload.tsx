import { ImageUp, ImageOff } from "lucide-react"
import { useState } from "react"
import Button from "@/components/ui/Button"
import clsx from "clsx";

interface ImageReviewType {
    url?: string,
    name?: string
}

interface FileUploadProps {
    onSetData: (field: string, file: File | null) => void;
    error?: string,
    file_url?: string,
    file_name?: string,
}

export default function FileUpload({ onSetData, error, file_url, file_name }: FileUploadProps) {
    const [imageReview, setImageReview] = useState<ImageReviewType | null>(file_url ? {
        url: file_url,
        name: file_name
    } : null);

    const handleShowImageReview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageReview({
                url: URL.createObjectURL(file),
                name: file.name
            });
            onSetData("file", file);
        }
    }
    const handleRemoveImageReview = () => {
        setImageReview(null);
        (document.getElementById("file") as HTMLInputElement | null)!.value = "";
        onSetData("file_id", null);
        onSetData("file", null);
    }

    return (
        <>
            <div className="font-medium">Ảnh</div>
            <div className={clsx("relative flex flex-col items-center justify-center text-gray-500 border border-gray-200 bg-gray-50 w-full h-60 rounded-xl mt-1.75 gap-2", {
                "border-red-600 ring-3 ring-red-600/20": error
            })}>
                <input accept="images/*" onChange={handleShowImageReview} type="file" name="file" id="file" className="hidden" />
                <label htmlFor="file" className="gap-1 active:translate-y-0.5 transition-all duration-150 cursor-pointer flex items-center justify-center text-blue-600 px-2 py-1.5 text-xs font-medium hover:underline">
                    <ImageUp size={18} />
                    <div className="mt-0.75">Upload ảnh</div>
                </label>
                <div> Hỗ trợ: png, jpg, jpeg, avif, webp</div>
                <div>Max size: 20MB</div>

                {/* review */}
                {(imageReview) && (
                    <img src={imageReview?.url} alt="" className="absolute top-0 left-0 w-full h-full rounded-xl object-cover" />
                )}

                {/* remove */}
                {(imageReview) && (
                    <div className="flex items-center gap-2 absolute right-2 top-2">
                        <div className="bg-gray-50 px-2 py-1.75 text-black rounded-lg text-xs font-medium">{imageReview?.name}</div>
                        <Button onClick={handleRemoveImageReview} type="button" animatePress={true} variant="danger" size="small" className="">
                            <ImageOff size={18} /> Thu hồi
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}