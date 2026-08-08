import { useEffect } from "react";
import { ImagePlus, X } from "lucide-react"

interface FilesUploadProps {
    setFilesReview: React.Dispatch<React.SetStateAction<any[]>>;
    onClearErrors: React.Dispatch<React.SetStateAction<any>>;
    onSetData: (field: string, value: any) => void;
    filesReview: any[];
    errors: any;
    oldFiles?: any[] | null;
}

export default function FilesUpload({ setFilesReview, onClearErrors, onSetData, filesReview, errors, oldFiles }: FilesUploadProps) {

    // Upload file review
    const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArr = Array.from(files);
            if (filesArr?.length > 4) return alert("Upload tối đa 4 ảnh")
            setFilesReview(prev => {
                const convertFiles = filesArr.map((file) => ({
                    file: file,
                    id: Date.now() + Math.random(),
                    file_name: file.name,
                    file_url: URL.createObjectURL(file),
                }))
                const remaningFiles = 4 - prev.length
                if (remaningFiles >= 1) {
                    const allowedFile = convertFiles.slice(0, remaningFiles);
                    return [...prev, ...allowedFile];
                }
                return [...prev, ...convertFiles];
            })
        }
    }

    // Thu hồi file
    const handleRemoveFile = (id: number, index: number) => {
        // Trang thêm
        onClearErrors(`files.${index}`);
        setFilesReview(prev => prev.filter(file => file.id != id));

        // Trang sửa
        onSetData("old_files", oldFiles?.map(file =>
            file.id === id ? { ...file, object_id: null } : file
        ))
    }

    // Drag file
    const handleDrag = (e: any, order: number) => {
        if (errors[`files.${order}`]) return alert("Ảnh lỗi không thể di chuyển.");
        e.dataTransfer.setData("order", order.toString());
    }

    // Drop file
    const handleDrop = (e: any, order: number) => {
        if (errors[`files.${order}`]) return alert("Ảnh lỗi không thể di chuyển.");

        const DragOrder = e.dataTransfer.getData("order");
        const DropOrder = order;
        if (DragOrder === DropOrder) return;

        // Trang thêm
        const tempFilesReview = [...filesReview];
        const [moveFile] = tempFilesReview.splice(DragOrder, 1);
        tempFilesReview.splice(DropOrder, 0, moveFile);
        setFilesReview(tempFilesReview);

        // Trang sửa
        const tempOrderItem = oldFiles ? [...oldFiles] : [];
        const [moveOrderItem] = tempOrderItem.splice(DragOrder, 1);
        tempOrderItem.splice(DropOrder, 0, moveOrderItem);
        onSetData("old_files", tempOrderItem);
    }

    useEffect(() => {
        return () => {
            if (filesReview) {
                filesReview.map(file => (
                    URL.revokeObjectURL(file.file_url)
                ))
            }
        }
    }, [])

    return (
        <>
            <div className="font-medium">
                <span>Ảnh chi tiết ( Tối đa 4 ảnh nếu có)</span>
                <input onChange={handleFilesUpload} multiple type="file" name="files" id="files" className="hidden" />
            </div>

            <div className="mt-2 h-fit border-gray-500 bg-gray-100 rounded-xl p-1 flex items-center">
                {/* images */}
                {filesReview?.length > 0 && (
                    <div className="flex justify-between gap-1 w-full">
                        {filesReview.map((file, index) => (
                            <div key={file.id} draggable onDragOver={(e) => e.preventDefault()}
                                onDragStart={(e) => handleDrag(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                className={`transition-all duration-200 ease-out bg-white shadow-sm w-22 h-20 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center relative
                                    ${errors[`files.${index}`] && `cursor-not-allowed`}
                                    ${errors[`files.${index}`] && `ring-red-600/20 ring-3 border-red-600`}`}
                            >
                                <div className="absolute top-0.5 right-0.5 bg-black/50 rounded-full p-0.75 cursor-pointer"
                                    onClick={() => handleRemoveFile(file.id, index)}>
                                    <X size={13} className="text-white" />
                                </div>
                                <img src={file.file_url} alt={file.file_name} className="w-full h-hull object-cover" />
                            </div>
                        ))}

                        {/* label */}
                        {Array.from({ length: 4 - filesReview.length }).map((item, index) => (
                            <label htmlFor="files" key={index} className={`cursor-pointer w-22 h-20 flex items-center justify-center gap-1.25 border-2 border-dashed border-gray-300 rounded-lg`}>
                                <ImagePlus size={18} className="text-gray-400" />
                            </label>
                        ))}
                    </div>
                )}

                {/* label */}
                {filesReview?.length === 0 && (
                    <div className="flex justify-between gap-1 w-full">
                        {Array.from({ length: 4 }).map((item, index) => (
                            <label htmlFor="files" key={index} className="cursor-pointer w-22 h-20 flex gap-1 items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                                <ImagePlus size={18} strokeWidth={1.7} className="text-gray-400" />
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}