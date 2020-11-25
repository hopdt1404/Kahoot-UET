<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PasswordReset;
use App\Notifications\ResetPassword;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class ResetPasswordController extends Controller
{
    public function getResetLink(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|email'
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'can not send mail',
                'error' => $validator->errors()
            ],400);
        }
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'massage' => 'can not find this user'
            ], 404);
        }
        
        $token = Str::random(60);
        $password_reset = PasswordReset::where('email', $request->email)->first();
        if($password_reset){
            $password_reset->token = $token;
        }
        else{
            $password_reset = new PasswordReset([
                'email' => $request->email,
                'token' => $token
            ]);
        }
        $password_reset->save();
       $password_reset->notify(new ResetPassword());
        return response()->json([
            'message' => 'The reset link is sent'
        ],201);
    }
    public function resetPassword(Request $request, $token){
        $password_reset = PasswordReset::where('token',$token)->first();
        if(!$password_reset){
            return response()->json([
                'message' => 'this token does not exist'
            ],404);
        }
        $validator = Validator::make($request->all(),[
            'password'=>'required|min:6',
            'confirm_password' =>'required|same:password'
        ]);
        if($validator->fails()){
            return response()->json([
                'message'=> 'can not reset password',
                'error'=>$validator->errors()
            ]);
        }
        $user=User::where('email',$password_reset->email)->first();
        $user->password =bcrypt($request->password);
        $user->save();
        $password_reset->delete();
        return response()->json([
            'message'=>'password has been reset successfully'
        ]);
    }
    
}
