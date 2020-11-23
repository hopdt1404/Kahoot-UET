<?php

namespace App\Http\Controllers;

use App\Players;
use App\Questions;
use App\ReportPlayer;
use App\ReportQuestion;
use App\Reports;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportQuestionController extends Controller
{
    public function summary (Request $request) {
        $validator = Validator::make($request->all(), [
            'report_id' => 'bail|required|integer',
            'result' => 'required|bail|jsonb',
            'question_id' => 'bail|required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $existReport = Reports::where('id', $request['report_id'])->count();
        if ($existReport != 1) {
            return response()->json([
                'message'=>'Bad request',
                'error'=> 'Report not found'],400);
        }
        $existQuestion = Questions::where('id', $request['question_id'])->count();
        if ($existQuestion != 1) {
            return response()->json([
                'message'=>'Bad request',
                'error'=> 'Question not found'],400);
        }


        $number_player = Players::where('report_id', $request['report_id'])->count();

        $conditions = [
            'report_id' => $request['report_id'],
            ['ans_select', '!=', ''],
        ];
        $number_player_ans = ReportPlayer::where($conditions)->count();
        $players = ReportPlayer::where($conditions)->get();
        $summaryResult = DB::table('report_players')->select(DB::raw('count(`ans_select`) as total, ans_selected'))->groupBy('ans_selected')->get();

        // số kết quả mỗi đáp án



        $avg_time_ans = (ReportPlayer::where($conditions)->sum('reply_time')) / $number_player_ans;
        $report_question = ReportQuestion::create([
            'report_id' => $request['report_id'],
            'question_id' => $request['question_id'],
            'result' => json_encode([
                ['A' => $summaryResult[0]['total']],
                ['B' => $summaryResult[1]['total']],
                ['C' => $summaryResult[2]['total']],
                ['D' => $summaryResult[3]['total']],
            ]),
            'correct_percent' => '',
            'agv_time_ans' => $avg_time_ans,
            'number_player' => $number_player,
            'number_player_ans' => $number_player_ans

        ]);

        return response()->json([
            'message'=> 'Update report question successfully'
        ],200);
    }

    public function reportQuestionSummary () {

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ReportQuestion  $reportQuestion
     * @return \Illuminate\Http\Response
     */
    public function show(ReportQuestion $reportQuestion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ReportQuestion  $reportQuestion
     * @return \Illuminate\Http\Response
     */
    public function edit(ReportQuestion $reportQuestion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ReportQuestion  $reportQuestion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReportQuestion $reportQuestion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ReportQuestion  $reportQuestion
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReportQuestion $reportQuestion)
    {
        //
    }
}
