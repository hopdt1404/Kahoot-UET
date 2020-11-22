<?php

namespace App\Http\Controllers;


use App\Notifications\ActiveAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EntryController extends Controller
{
    public function activateAccount(Request $request){
        $email = $request->input('email');
        $verification_code = $request->input('verification_code');
        $user = User::where('email',$email) ->first();
        if(!Hash::check($verification_code.$email, $user->verification_code)){
            return response()->json([
                'message' => 'verification code is incorrect'
            ],401);
        }
        $user->email_verified_at = Carbon::now();
        $user->save();
        return response()->json([
            'email_verified_at' => $user->email_verified_at,
            'message' => 'account is activated'
        ]);
    }
    public function signup(Request $request){
        $validator = Validator::make($request->all(),[ 
            'email' => 'required|email|unique:users', 
            'password' => 'required|min:6', 
            'name' => 'required',
            'organization' =>'required'
            ]);
        if ($validator->fails()) { 
            return response()->json([
                'message'=>'Registration failed',
                'error'=>$validator->errors()], 400);            
        }
        $verification_code = strval(rand(100000,999999));
        $user = new User([
            'organization' => $request->organization,
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password),
            'verification_code' => $verification_code
        ]);
        $user->notify(new ActiveAccount());
        $user->verification_code = bcrypt($verification_code.$request->email);
        $user->save();
        return response()->json([
            'message'=> 'registered successfully',
        ],201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        $remember = $request->input('remember_me');
        if(!Auth::attempt($credentials,$remember))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        if(!$user->email_verified_at){
            return response()->json([
                'message'=>'email has not been verified'
            ],401);
        }
        $tokenResult = $user->createToken('auth token');
        $token = $tokenResult->token;
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            ],200);
    }
    public function logout(Request $request){
        $request->user()->token()->revoke();    
        return response()->json([
            'message'=>'Successfully logged out!'
        ]);
    }
    public function changePassword(Request $request){
        $validator = Validator::make($request->all(),[
            'old_password'=>'required',
            'new_password'=>'required',
            'confirm_new_password'=>'required|same:new_password'
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Can not change password',
                'error' => $validator->errors()
            ],400);
        }
        $user = $request->user();
        $old_password = $request->input('old_password');
        $oldpass = $user->password;
        if(!Hash::check($old_password, $oldpass)){
            return response()->json([
                'message' => 'Can not change password',
                'error' => 'old password is incorrect'
            ],400);
        }
        $user->password = bcrypt($request->input('new_password'));
        $user->save();
        return response()->json([
            'message' => 'successfully changed password'
        ],201);
    }
}
