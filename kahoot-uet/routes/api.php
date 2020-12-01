<?php

use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('export','ExportExcelController@export');
Route::get('/export-data', 'ReportController@exportData');
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

        Route::get('home', 'HomeController@home');

        Route::prefix('topic')->group(function () {
            Route::get('', 'TopicController@index');
            Route::post('duplicate', 'TopicController@duplicateTopic');
            Route::patch('rename', 'TopicController@renameTopic');
            Route::post('create', 'TopicController@createTopic');
            Route::post('create-topic', 'TopicController@createTopics');
            Route::post('delete', 'TopicController@delete');
            Route::get('detail', 'QuestionsController@index');
        });

        Route::prefix('room')->group(function () {
            Route::post('create', 'RoomController@index');
            Route::patch('lock', 'RoomController@lockRoom');
            Route::patch('unlock', 'RoomController@unlockRoom');
        });
        Route::prefix('player')->group(function () {
            Route::get('list', 'PlayerController@index');
            Route::get('join', 'PlayerController@create');
            Route::post('get-out', 'PlayerController@getOutPlayer');
        });

        Route::prefix('play')->group(function () {
            Route::post('', 'ReportController@create');
            Route::post('answer', 'ReportPlayerController@create');
            Route::get('summary-question', 'ReportQuestionController@summaryQuestion');
            Route::get('top-five', 'PlayerController@topFiveMaxScore');
            Route::get('top-three-final', 'PlayerController@topThreeMaxScore');
        });
        Route::prefix('report')->group(function () {
            Route::get('', 'ReportController@index');
            Route::patch('rename', 'ReportController@renameReport');
            Route::get('/detail', 'ReportController@reportDetail');
        });

        Route::get('/export', 'ExportExcelController@export');
    });


});

