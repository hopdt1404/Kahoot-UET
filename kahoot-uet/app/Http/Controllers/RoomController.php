<?php

namespace App\Http\Controllers;

use App\Rooms;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function save () {


    }

    public function index () {
        $minPin = 10000000;
        $maxPin = 1000000000;
        $creatorId = 1;
        $topicId = 1;
        $room = Rooms::create([
            'PIN' => rand($minPin, $maxPin),
            'creator_id' => $creatorId,
            'topic_id' => $topicId,
            'is_finish' => false
        ]);
        return view('pages.topic', ['data' => $room]);
    }

    public function finishRoom () {
        $roomId = 201;
        $room = Rooms::where('id', $roomId)->update(['is_finish' => 1]);

        return view('pages.topic', ['data' => $room]);
    }

    public function lockRoom () {
        $roomId = 201;
        $room = Rooms::where('id', $roomId)->update(['is_lock' => 1]);
        return view('pages.topic', ['data' => $room]);
    }

}
