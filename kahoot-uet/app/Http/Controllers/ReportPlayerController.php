<?php

namespace App\Http\Controllers;

use App\Messager;
use App\ReportPlayer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ReportPlayerController extends Controller
{
    /*
     *  Log the answer player chosen
    */
    public function create (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'player_id' => 'bail|required|integer',
            'question_id' => 'bail|required|integer',
            'player_score' => 'bail|required|numeric',
            'reply_time' => 'bail|required|numeric',
            'ans_selected' => 'bail|required|nullable',
        ]);
        $data = [];
        if ($validator->fails()) {
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }

        $result = ReportPlayer::create([
            'player_id' => $request['player_id'],
            'question_id' => $request['question_id'],
            'player_score' => $request['player_score'],
            'reply_time' => $request['reply_time'],
            'ans_selected' => $request['ans_selected'],
        ]);

        $data['ans_select_detail'] = $result;

        $data = json_encode($data);
        return view('pages.topic', ['data' => $data]);
    }
}
