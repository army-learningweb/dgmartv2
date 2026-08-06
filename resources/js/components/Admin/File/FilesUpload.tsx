import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react"
import clsx from "clsx";

interface subImageDataOrderProps {
    id: number,
    order: number
}

interface FilesUploadProps {
    setFilesReview: React.Dispatch<React.SetStateAction<any[]>>;
    filesReview : any[];
    errors : any;
    onClearErrors : React.Dispatch<React.SetStateAction<any>>;
    subImageDataOrder : subImageDataOrderProps[];
    onSetData: (field:string, value:any) => void;
}

export default function FilesUpload({setFilesReview, filesReview, errors, onClearErrors, subImageDataOrder, onSetData} : FilesUploadProps){
    const [hoverTarget, setHoverTarget] = useState<string | null>(null);
   
    useEffect(() => {
        return () => {
            if(filesReview){
                filesReview.map(file => (
                    URL.revokeObjectURL(file.url)
                ))
            }
        }
    },[])

    // Upload file review
    const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArr = Array.from(files);
            if (filesArr?.length > 4) return alert("Upload tối đa 4 ảnh")
            setFilesReview(prev => {
                const convertFiles = filesArr.map(file => ({
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
    const handleRemoveFile = (url: string, index: number) => {
        // Trang thêm
        onClearErrors(`files.${index}`);
        setFilesReview(prev => prev.filter(file => file.file_url != url));

        // Trang sửa
        onSetData("files_id", subImageDataOrder.filter(item => item.order != index));
    }

    // Drag file
    const handleDrag = (e: any, order: number) => {
        if(errors[`files.${order}`]) return alert("Ảnh lỗi không thể di chuyển.");
        e.dataTransfer.setData("order", order.toString());
    }

    // Drop file
    const handleDrop = (e: any, order: number) => {
        if(errors[`files.${order}`]) return alert("Ảnh lỗi không thể di chuyển.");

        const DragOrder = e.dataTransfer.getData("order");
        const DropOrder = order;
        if (DragOrder === DropOrder) return;

        // Trang thêm
        const tempFilesReview = [...filesReview];
        const [moveFile] = tempFilesReview.splice(DragOrder, 1);
        tempFilesReview.splice(DropOrder, 0, moveFile);
        setFilesReview(tempFilesReview);

        // Trang sửa
        const tempOrderItem = [...subImageDataOrder];
        const [moveOrderItem] = tempOrderItem.splice(DragOrder,1);
        tempOrderItem.splice(DropOrder, 0, moveOrderItem);
        onSetData("files_id", tempOrderItem);
    }

    // Hover file
    const handleHover = (id: string) => {
        setHoverTarget(id);
    }

    // Leave file
    const handleLeave = () => {
        setHoverTarget(null);
    }

    return (
        <>
            <div className="font-medium">
                Ảnh chi tiết ( Tối đa 4 ảnh nếu có)
                <input onChange={handleFilesUpload} multiple type="file" name="files" id="files" className="hidden" />
            </div>

            <div className="my-1 text-gray-500">Hỗ trợ ( png, jpg, jpeg, avif, webp) - Dung lượng: 20MB</div>
            <div className="my-1 text-gray-500">Kéo ảnh để thay đổi vị trí</div>
            
            <div className="mt-2 h-fit border-gray-500 bg-gray-100 rounded-xl p-1 flex items-center">
                {filesReview?.length > 0 && (
                    <div className="grid grid-cols-4 gap-1 w-full">
                        {filesReview.map((file, index) => (
                            <div draggable
                                onDragOver={(e) => e.preventDefault()}
                                onDragStart={(e) => handleDrag(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onMouseEnter={() => handleHover(file.id)}
                                onMouseLeave={handleLeave}
                                key={file.id} 
                                className={clsx(`bg-white shadow-sm w-21 h-20 rounded-lg overflow-hidden border flex items-center justify-center 
                                    ${errors[`files.${index}`] && `cursor-not-allowed`}
                                    ${errors[`files.${index}`] && `border-red-600/50`}`,{
                                    "border-gray-400": hoverTarget === file.id,
                                    "border-gray-100": hoverTarget !== file.id,
                                })}>
                                <img src={file.file_url} alt={file.file_name} className="w-full h-hull object-cover cursor-pointer" />
                            </div>
                        ))}

                        {Array.from({ length: 4 - filesReview.length }).map((item, index) => (
                            <label htmlFor="files" key={index} className={`cursor-pointer w-21 h-20 flex items-center justify-center gap-1.25 bg-gray-200 rounded-lg`}>
                                <ImagePlus size={18} className="text-gray-500" />
                            </label>
                        ))}
                    </div>
                )}

                {filesReview?.length === 0 && (
                    <div className="grid grid-cols-4 gap-1 w-full">
                        {Array.from({ length: 4 }).map((item, index) => (
                            <label htmlFor="files" key={index} className="cursor-pointer w-21 h-20 flex gap-1 items-center justify-center bg-gray-200 rounded-lg">
                                <ImagePlus size={18} className="text-gray-500" />
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* remove review */}
            {filesReview?.length > 0 && (
                <div className="flex flex-col">
                    {filesReview.map((file, index) => (
                        <div draggable key={file.id}
                            onMouseEnter={() => handleHover(file.id)}
                            onMouseLeave={handleLeave}
                            onDragOver={(e) => e.preventDefault()}
                            onDragStart={(e) => handleDrag(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            className={clsx(`flex justify-between items-center gap-2 mt-2 rounded-lg py-1 px-2 border border-gray-50
                                ${errors[`files.${index}`] ? `cursor-not-allowed` : `cursor-pointer `}
                                ${errors[`files.${index}`] && `border-red-600/50`}`, {
                                "bg-gray-100": hoverTarget === file.id,
                                "bg-gray-50": hoverTarget !== file.id,
                            })}>
                            <div className="w-70 truncate py-1.75 text-black rounded-lg text-xs font-medium flex gap-1 items-center">
                                {file.file_name}
                            </div>
                            <div onClick={() => handleRemoveFile(file.file_url, index)} className="tracking-tight text-red-600 text-xs font-medium cursor-pointer">
                                Thu hồi
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}