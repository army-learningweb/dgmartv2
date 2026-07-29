import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin';
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';
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

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface MCEditorProps {
    value: string,
    onChange: (content: string) => void;
}

const EDITOR_INIT = {
    promotion: false,
    statusbar: false,
    min_height: 640,
    plugins: 'anchor autolink charmap image link lists searchreplace table visualblocks wordcount code',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table | align lineheight | numlist bullist indent outdent | code',
    content_style: `
    body { 
      font-family: 'Inter', sans-serif; 
      font-size: 14px; 
      line-height: 1.5;   
      margin: 20px; 
    }
    img { max-width: 100%; height: auto; border-radius: 10px; background-size:cover }`,
    relative_urls: false,
    remove_script_host: false,
    image_caption: true,
    images_upload_handler: async (blobInfo: any) => {
        try {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            const res = await axios.post('/admin/uploadFileContent', formData);
            return res.data.file_url;
        } catch (error) {
            throw new Error('Upload thất bại');
        }
    },
}

export default function MCEditor({ value, onChange }: MCEditorProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Editor
            licenseKey="gpl"
            init={EDITOR_INIT}
            value={value}
            onEditorChange={onChange}
        />
    );
}