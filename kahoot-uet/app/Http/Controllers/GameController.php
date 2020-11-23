<?php

namespace App\Http\Controllers;

use App\Events\joinRoomEvent;
use App\Events\StartGameEvent;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function joinRoom(Request $request){
        $check = false;
        // check room
        // your code here
        if($check)
        {
            $message = ['name'=>$request->name];
            broadcast(
                $b = new JoinRoomEvent($request->room, $request->name)
            )->toOthers();
        }
        return back();
    }
    public function startGame(Request $request){
        $question = ['question'=>$request->question,
                    'image' => $request->image,
                    'time' => $request->time,
                    'answer' => $request->answer
        ];
        broadcast(
            $b = new StartGameEvent($request->room, $question)
        )->toOthers();
        return back();
    }
    public function showRank(Request $request){
        $result = [
            ''
        ];
    }
}
