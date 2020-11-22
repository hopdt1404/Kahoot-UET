<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('app');
// });


Route::view('/', 'index');
// Route::view('/test', 'test');

// Route::view('/', 'test');

Route::resource('/question', 'QuestionsController');
Route::get('/room/finish', 'RoomController@finishRoom');
Route::get('/room/lock', 'RoomController@lockRoom');
Route::resource('/room', 'RoomController');
Route::get('/report/search', 'ReportController@searchReportByName');
Route::resource('/report', 'ReportController');
Route::get('player/add-player', 'PlayerController@addPlayer');
Route::get('player/get-out-player', 'PlayerController@getOutPlayer');
Route::get('player/update-total-score', 'PlayerController@updateTotalScore');
Route::get('player/top-five-max-score', 'PlayerController@topFiveMaxScore');
Route::resource('/player', 'PlayerController');
Route::resource('/report-player', 'ReportPlayerController');

Route::get('/topic', 'TopicController@index');
Route::group(['prefix' => 'topic'], function () {

});