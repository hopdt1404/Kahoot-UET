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
            'report_id' => 'bail|required|integer',
            'current_total_score' => 'bail|required|numeric',
            'player_score' => 'bail|required|numeric',
            'reply_time' => 'bail|required|numeric',
            'ans_selected' => 'bail|required|nullable',
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }

        $result = ReportPlayer::create([
            'player_id' => $request['player_id'],
            'question_id' => $request['question_id'],
            'report_id' => $request['report_id'],
            'current_total_score' => $request['current_total_score'],
            'player_score' => $request['player_score'],
            'reply_time' => $request['reply_time'],
            'ans_selected' => $request['ans_selected'],
        ]);
        $player = Players::find($request['player_id']);
        $player['total_score'] = $request['current_total_score'];
        $player->save();

        $data['ans_select_detail'] = $result;

        return response()->json([
            'message'=> 'Update score player successfully'
        ],200);
    }
}
