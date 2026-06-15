<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image']
        ]);

        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('cloudinary.cloud_name'),
                'api_key' => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);

        $uploaded = $cloudinary->uploadApi()->upload(
            $request->file('image')->getRealPath(),
            [
                'folder' => 'kiosk-products'
            ]
        );

        return response()->json([
            'message' => 'Upload successful',
            'image_url' => $uploaded['secure_url'],
            'public_id' => $uploaded['public_id']
        ]);
    }
}
