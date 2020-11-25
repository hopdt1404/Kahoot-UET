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
                ['None' => '']
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


    public function summaryQuestion (Request $request) {
        $validator = Validator::make($request->all(), [
            'question_id' => 'bail|required|integer',
            'report_id' => 'bail|required|integer',
            'topic_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $question = Questions::select('id', 'question_type')->where('id', $request['question_id'])->get();
        if (count($question) != 1) {
            return response()->json([
                'message'=>'Question invalid',
                ],400);
        }
        $question = $question[0];
        $report = Reports::select('id', 'room_id')->where('id', $request['report_id'])->get();
        if (count($report) != 1) {
            return response()->json([
                'message'=>'Report invalid',
            ],400);
        }
        $report = $report[0];
        $report_question = [];
        if (strcmp($question['question_type'], Questions::$QUESTION_TYPE['quiz']) == 0) {
            $numberResultA = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
                ])->sum('a');
            $numberResultB = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
            ])->sum('b');
            $numberResultC = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
            ])->sum('c');
            $numberResultD = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
            ])->sum('d');

            $numberPlayer = Players::where('room_id', $report['room_id'])->count();
            $numberPlayerAns = ReportPlayer::where([
                                'report_id' => $report['id'],
                                'question_id' => $question['id'],
                                ['ans_selected', 'not null']
                                ])->count();

            $correct_percent = 0;
            $avg_time_ans = 0;
            $totalTimeReply = ReportPlayer::where([
                'report_id' => $report['id'],
                'question_id' => $question['id'],
                ['ans_selected', 'not null']
            ])->sum('reply_time');
            if ($numberPlayerAns == 0) {
                $avg_time_ans = $totalTimeReply;
            } else {
                $avg_time_ans = $totalTimeReply / $numberPlayerAns;
            }
            $report_question = ReportQuestion::create([
                'question_id' => $question['id'],
                'topic_id' => $request['topic_id'],
                'report_id' => $report['id'],
                'a' => $numberResultA,
                'b' => $numberResultB,
                'c' => $numberResultC,
                'd' => $numberResultD,
                'number_player' => $numberPlayer,
                'number_player_ans' => $numberPlayerAns,
                'correct_percent' => $correct_percent,
                'avg_time_ans' => $avg_time_ans
            ]);
        } else {
            $numberResultA = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
            ])->sum('a');
            $numberResultB = ReportPlayer::where([
                'question_id' => $question['id'],
                'report_id' => $report['id']
            ])->sum('b');
            $numberPlayer = Players::where('room_id', $report['room_id'])->count();
            $numberPlayerAns = ReportPlayer::where([
                'report_id' => $report['id'],
                'question_id' => $question['id'],
                ['ans_selected', 'not null']
            ])->count();

            $correct_percent = 0;
            $avg_time_ans = 0;
            $totalTimeReply = ReportPlayer::where([
                'report_id' => $report['id'],
                'question_id' => $question['id'],
                ['ans_selected', 'not null']
            ])->sum('reply_time');
            if ($numberPlayerAns == 0) {
                $avg_time_ans = $totalTimeReply;
            } else {
                $avg_time_ans = $totalTimeReply / $numberPlayerAns;
            }
            $report_question = ReportQuestion::create([
                'question_id' => $question['id'],
                'topic_id' => $request['topic_id'],
                'report_id' => $report['id'],
                'a' => $numberResultA,
                'b' => $numberResultB,
                'number_player' => $numberPlayer,
                'number_player_ans' => $numberPlayerAns,
                'correct_percent' => $correct_percent,
                'avg_time_ans' => $avg_time_ans
            ]);
        }
        return response()->json([
            'message'=> ' successfully', $report_question
        ],200);
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
