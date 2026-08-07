import { Upload, X, ImagePlus } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx";

interface ImageReviewType {
    url?: string;
    name?: string;
}

interface FileUploadProps {
    onSetData: (field: string, file: File | null) => void;
    error?: string;
    showError?: boolean;
    onClearError: any;
    file_url?: string;
    file_name?: string;
}

export default function FileUpload({ onSetData, error, file_url, file_name, onClearError, showError = true }: FileUploadProps) {
    const [imageReview, setImageReview] = useState<ImageReviewType | null>(
        file_url
            ? { url: file_url, name: file_name }
            : null
    );

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
        onSetData("old_file", null);
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
            <div className="font-medium flex gap-1">
                <span>Ảnh</span>
                {error && (
                    <span className="text-red-600">*</span>
                )} 
            </div>
            <div className={clsx("relative flex items-center justify-center border border-gray-100 bg-gray-100 w-full h-60 rounded-xl mt-1.75 gap-1 overflow-hidden p-1", {
                "border-red-600 ring-3 ring-red-600/20": error
            })}>
                <div className={clsx("flex flex-col items-center justify-center w-full h-full rounded-lg", {
                    "border-2 border-dashed border-gray-300": !imageReview
                })}>
                    {/* image */}
                    <div className={clsx("transition-transform duration-150 ease-out border border-gray-100 bg-white shadow-sm rounded-lg flex items-center justify-center w-full h-full overflow-hidden relative", {
                        "opacity-0 scale-95": !imageReview,
                        "opacity-100 scale-100": imageReview
                    })}>
                        <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 cursor-pointer"
                            onClick={handleRemoveImageReview}>
                            <X size={13} className="text-white" />
                        </div>
                        <img src={imageReview?.url} alt="" className="w-full h-full rounded-xl object-scale-down" />
                    </div>

                    {/* review */}
                    <div className={clsx("absolute flex-col gap-1 flex items-center text-xs font-medium", {
                        "opacity-0": imageReview,
                        "opacity-100": !imageReview
                    })}>
                        <div className="text-gray-400 flex flex-col items-center justify-center gap-1">
                            <ImagePlus size={25} strokeWidth={1.5} />
                            <span> Hỗ trợ ( png, jpg, jpeg, avif, webp)</span>
                            <span> Dung lượng tối đa: 20MB  </span>
                        </div>
                        <label htmlFor="file" className="mt-2 gap-1 active:translate-y-0.5 transition-all duration-150 cursor-pointer flex items-center justify-center py-1 px-2 text-xs font-medium border border-gray-300 bg-white rounded-md ">
                            <Upload size={12} />
                            <div className="">Upload</div>
                        </label>
                        <input onChange={handleShowImageReview} type="file" name="file" id="file" className="hidden" />
                    </div>
                </div>
            </div>

            {showError && (
                error && (
                    <div className="text-red-600 mt-2">{error}</div>
                )
            )}
        </>
    )
}