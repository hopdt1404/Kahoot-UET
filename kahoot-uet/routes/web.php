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


Route::view('/', 'header');
// Route::view('/test', 'test');

// Route::view('/', 'test');
Route::resource('/topic', 'TopicController');
Route::resource('/question', 'QuestionsController');
Route::get('/room/finish', 'RoomController@finishRoom');
Route::get('/room/lock', 'RoomController@lockRoom');
Route::resource('/room', 'RoomController');
