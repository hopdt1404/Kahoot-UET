<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function uploadImage(Request $request)
        {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "message"=>"Can not upload image",
                'error'=>$validator->errors()
            ],401);
        }
        $host = $request->getSchemeAndHttpHost();
        $img = str_replace($host.'/storage/users', '', $request->user()->avatar_url);
        Storage::disk('public')->delete('users'.$img);
        $uploadFolder = 'users';
        $image = $request->file('image');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $url = url('/storage/'.$image_uploaded_path);
        $user = $request->user();
        $user->avatar_url = $url;
        $user->save();
        return response()->json([
            "message" => "Image uploaded successfully",
            "image_url" =>$url
        ],201);
    }
    
    public function getUser(Request $request){
        return response()->json([
            $request->user()
        ]);
    }
    public function rename(Request $request){
        $name = $request->input('name');
        $user = $request->user();
        $user->name = $name;
        $user->save();
        return response()->json([
            "renamed successfully"
        ],201);
    }
    public function getUserId(Request $request){
        return response()->json([
            $request->user()->only('id')
        ],200);
    }
}
