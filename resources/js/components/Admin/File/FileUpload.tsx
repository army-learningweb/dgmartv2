import { Upload, Images } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx";

interface ImageReviewType {
    url?: string;
    name?: string;
}

interface FileUploadProps {
    onSetData: (field: string, file: File | null) => void;
    error?: string;
    file_url?: string;
    file_name?: string;
    showError?: boolean;
    onClearError: any;
}

export default function FileUpload({ onSetData, error, file_url, file_name, onClearError, showError = true }: FileUploadProps) {
    const [imageReview, setImageReview] = useState<ImageReviewType | null>(file_url ? {
        url: file_url,
        name: file_name
    } : null);

    const handleShowImageReview = (e: React.ChangeEvent<HTMLInputElement>) => {
        onClearError('file');
        const file = e.target.files?.[0]
        if (file) {
            setImageReview({
                url: URL.createObjectURL(file),
                name: file.name,
            });
            onSetData("file", file);
        }
    }

    const handleRemoveImageReview = () => {
        setImageReview(null);
        onSetData("file_id", null);
        onSetData("file", null);
    }

    useEffect(() => {
        return () => {
            if (imageReview?.url) {
                URL.revokeObjectURL(imageReview.url);
            }
        }
    }, [])

    return (
        <>
            <div className="font-medium">Ảnh</div>

            <div className={clsx("flex flex-col items-center justify-center relative border border-gray-100 bg-gray-100 w-full h-60 rounded-xl mt-1.75 gap-1 overflow-hidden p-1", {
                "border-red-600 ring-3 ring-red-600/20": error
            })}>
                {/* review */}
                {imageReview && (
                    <div className="border border-gray-100 bg-white shadow-sm rounded-lg flex items-center justify-center w-full h-full overflow-hidden">
                        <img src={imageReview?.url} alt="" className="w-full h-full rounded-xl object-scale-down" />
                    </div>
                )}

                {!imageReview && (
                    <div className="flex-col gap-1 flex items-center text-gray-500 text-xs font-medium">
                        <Images size={25} className="text-gray-500" />
                        <span> Hỗ trợ ( png, jpg, jpeg, avif, webp)</span>
                        <span> Dung lượng tối đa: 20MB  </span>
                    </div>
                )}

                {!imageReview && (
                    <div>
                        <input onChange={handleShowImageReview} type="file" name="file" id="file" className="hidden" />
                        <label htmlFor="file" className="mt-2 gap-1 active:translate-y-0.5 transition-all duration-150 cursor-pointer flex items-center justify-center py-1 px-2 text-xs font-medium border border-gray-300 bg-white rounded-md ">
                            <Upload size={12} />
                            <div className="">Upload</div>
                        </label>
                    </div>
                )}
            </div>

            {/* remove */}
            {(imageReview) && (
                <div className="flex justify-between items-center gap-2 mt-2 bg-gray-50 rounded-lg py-1 px-2 hover:bg-gray-100">
                    <div className="py-1.75 text-black rounded-lg text-xs font-medium flex gap-1 items-center">
                        <div className="w-59 truncate">{imageReview?.name}</div>
                    </div>
                    <div onClick={handleRemoveImageReview} className="tracking-tight text-red-600 text-xs font-medium cursor-pointer">
                        Thu hồi
                    </div>
                </div>
            )}

            {showError && (
                error && (
                    <div className="text-red-600 mt-2">{error}</div>
                )
            )}

        </>
    )
}