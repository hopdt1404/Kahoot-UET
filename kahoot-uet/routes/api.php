<?php

use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'EntryController@login');
    Route::post('signup', 'EntryController@signup');
    Route::post('signup/activate', 'EntryController@activateAccount');
    Route::post('reset-link','ResetPasswordController@getResetLink');
    Route::post('reset-password/{token}', 'ResetPasswordController@resetPassword');
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'EntryController@logout');
        Route::get('user', 'ProfileController@getUser');
        Route::post('upload-image','ProfileController@uploadImage');
        Route::put('rename','ProfileController@rename');
        Route::get('user_id','ProfileController@getUserId');
        Route::put('change-password','EntryController@changePassword');
    });
});
