<?php

namespace App\Http\Controllers;

use App\Rooms;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{

    public function index (Request $request) {
        $validator = Validator::make($request->all(),[
            'topic_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $minPin = 1000000;
        $maxPin = 10000000;
        $creatorId = $request->user()->only('id')['id'];
        $topicId = $request['topic_id'];
        $room = Rooms::create([
            'PIN' => rand($minPin, $maxPin),
            'creator_id' => $creatorId,
            'topic_id' => $topicId
        ]);
        return response()->json([
            'message' => "created room successfully", $room
        ], 201);
    }

    public function finishRoom (Request $request) {
        $validator = Validator::make($request->all(),[
            'room_id' => 'bail|required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $isExistedRoom = Rooms::where('id', $request['room_id'])->count();
        if ($isExistedRoom != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $roomId = $request['room_id'];
        Rooms::where('id', $roomId)->update(['is_finish' => 1]);
        return response()->json([
            'message'=> 'finish room successfully',
        ],200);


    }

    public function lockRoom (Request $request) {
        $validator = Validator::make($request->all(),[
            'room_id' => 'bail|required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()], 400);
        }
        $isExistedRoom = Rooms::where('id', $request['room_id'])->count();
        if ($isExistedRoom != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $roomId = $request['room_id'];
        Rooms::where('id', $roomId)->update(['is_locked' => 1]);
        return response()->json([
            'message'=> 'locked room successfully',
        ],200);
    }

}
