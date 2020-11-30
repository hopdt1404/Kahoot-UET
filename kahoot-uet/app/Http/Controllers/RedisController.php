<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Messages;
use App\Events\RedisEvent;



class RedisController extends Controller
{
    public function index(){
        $messages = Messages::all();
        return view('messages',compact('messages'));
    }


    public function postSendMessage(Request $request){
        $messages = Messages::create($request->all());
        $test = ['author'=>$messages->author,'content'=>$messages->content];
    	broadcast(
    		$b = new RedisEvent($test)
    	);
        return response()->json([ 'message'=>"successful"]);
    }

}
