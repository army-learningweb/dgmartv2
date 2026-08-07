import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

import 'tinymce/tinymce';
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

//skin
import 'tinymce/skins/ui/oxide/skin';
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

//plugin
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/media';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/wordcount';

interface MCEditorProps {
    value: string,
    typeImageContent: string;
    error?: string;
    onChange: (content: string) => void;
    onBlur? : () => void;
}

export default function MCEditor({ onChange, onBlur, value, typeImageContent, error, ...props }: MCEditorProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <div className="flex gap-2 mb-2">
                <span className='font-semibold'>Nội dung chi tiết</span>
                {error && (
                    <span className='text-red-600'>({error})</span>
                )}
            </div>
            <Editor
                {...props}
                licenseKey="gpl"
                value={value}
                onEditorChange={onChange}
                onBlur={onBlur}
                init={{
                    promotion: false,
                    statusbar: false,
                    min_height: 700,
                    max_width: 830,
                    menubar: 'file edit view tools',
                    font_size_formats: '12px 14px 16px 18px 20px 24px 30px 36px',
                    plugins: 'anchor autolink charmap image link lists searchreplace table visualblocks wordcount code',
                    toolbar: [
                        'undo redo | blocks fontsize',
                        'link image media table | align lineheight | numlist bullist indent outdent |  bold italic underline strikethrough',
                    ],
                    content_style: `
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        font-size: 14px; 
                        line-height: 1.5;   
                        margin: 25px auto;
                        padding: 0 20px;
                    }

                    img { 
                        border-radius: 15px;
                        max-width: 100%;
                        height: auto;
                    }
                `,
                    relative_urls: false,
                    remove_script_host: false,
                    image_caption: true,
                    images_upload_handler: async (blobInfo: any) => {
                        try {
                            const formData = new FormData();
                            formData.append('file', blobInfo.blob(), blobInfo.filename());
                            formData.append('type', typeImageContent);
                            const res = await axios.post('/admin/uploadFileContent', formData);
                            return res.data.file_url;
                        } catch (error) {
                            throw new Error('Upload thất bại');
                        }
                    },
                }}
            />
        </>
    );
}