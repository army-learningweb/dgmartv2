<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminUploadFileContentController extends Controller
{
    public function upload(Request $request){
        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("post", $file_url, "public");
            $object_id = null;
            $object_type = "post";
            $role = "content";
            
            $new_file = Media::create([
                'file_url' => asset('storage/' . $file_path),
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'role' => $role
            ]);

            return response()->json($new_file);
        }
    }
}
