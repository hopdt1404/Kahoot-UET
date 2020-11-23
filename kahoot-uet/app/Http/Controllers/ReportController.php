<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Players;
use App\Questions;
use App\Rooms;
use App\Topics;
use Illuminate\Http\Request;
use App\Reports;
use App\Messager;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
//    private $reportModel = new Report();
    public function index (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'owner_id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $ownerId = $request['owner_id'];
        $column = 'name';
        $type = 'desc';
        $reports = Reports::select('id', 'name', 'room_id', 'game_mode', 'created_at')->where('owner_id', $ownerId)->orderBy($column, $type)->get();
        for ($i = 0; $i < count($reports); $i++) {
            $report = $reports[$i];
            $reportId = $report['id'];
            $report['number_player'] = Players::where('report_id', $reportId)->count();
        }
        return response()->json([
            'message'=> 'Get all report successfully'
        ],200);
    }
    public function show ()
    {
        $reportId = 10;
//        $report
//        return view('pages.topic', ['data' => $reports]);
    }

    public function searchReportByName (Request $request)
    {
        $patternSearch = 'Hea';
        $columnSearch = 'name';
        $ownerId = 1;
        $column = 'name';
        $type = 'desc';
        $reports = Reports::select('id', 'name', 'room_id', 'game_mode', 'created_at')->where('owner_id', $ownerId)->WhereLike($columnSearch, $patternSearch)->orderBy($column, $type)->get();
        for ($i = 0; $i < count($reports); $i++) {
            $report = $reports[$i];
            $reportId = $report['id'];
            $report['number_player'] = Players::where('report_id', $reportId)->count();
        }
        return view('pages.topic', ['data' => $reports]);
    }

    public function reportDetail (Request $request)
    {
        /*
         *
         * - Câu hỏi khó <= 35% người trả lời đúng
         * - Need help: người chơi trả lời <= 35% số câu trả lời
         * - Didn't finish: Không trả lời câu hỏi hoặc rời khỏi phòng chơi trước
         * - Detail player:
         * - Tổng số đáp án đúng / tất cả các đáp án
         *
         */

        $validator = Validator::make($request->all(), [
            'id' => 'bail|required|integer'
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $exitReport = Reports::where('id', $request['report_id'])->count();
        if ($exitReport != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $report = Reports::where('id', $request['id'])->get();

        $report = $report[0];
        $hosterBy = User::select('name')->where('id', $report['owner_id'])->get();
        $report['hosted_by'] = $hosterBy[0]['name'];

        // Get number player
        $players = Players::select('id','name', 'total_score', 'number_correct_answer', 'number_incorrect_answer')->where('report_id', $report['id'])->orderBy('total_score', 'desc')->get();
        $report['number_player'] = count($players);

        // Get number question
        $room_id = $report['room_id'];
        $topic_id = Rooms::select('topic_id')->where('id', $room_id)->get();
        $topic_id = $topic_id[0]['topic_id'];
        $questions = Questions::where('topic_id', $topic_id)->get();
        $report['number_question'] = count($questions);

        //
        return response()->json([
            'message' => "Get report detail success",
            'summary' => $report,
            'players' => $players,
            'questions' => $questions
        ], 200);


    }

    /*
     *  Create Report when create room
    */

    public function create (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'bail|required',
            'room_id' => 'bail|required|integer',
            'owner_id' => 'bail|required|integer',
        ]);
        $data = [];
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request',
                'error'=>$validator->errors()],400);
        }
        $report = Reports::create([
            'name' => $request['name'],
            'room_id' => $request['room_id'],
            'owner_id' => $request['owner_id']
        ]);
        $data['report'] = $report;
        return response()->json([
            'message'=> 'Created report successfully'
        ],200);

    }

    public function reportDetailQuestion (Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'bail|required',
            'room_id' => 'bail|required|integer',
            'owner_id' => 'bail|required|integer',
        ]);
    }

    public function exportData (Request $request) {

        $overview = [
            'info' => [
                'name_report' => '',
                'placed_on' => '',
                'hosted_by' => '',
                'played_with' => '',
                'played' => ''
            ],
            'performance' => [
                'total_correct_answer' => '',
                'total_incorrect_answer' => '',
                'average_score' => ''
            ],
            'feedback' => [
                'number_of_responses' => '',
                'fun_was' => '',
                'recommend' => '',
                'feel' => ''

            ]
        ];

        /*
         * format: each player:
         * Rank, PlayerName, TotalScore, NumberCorrectAnswer, NumberIncorrectAnswer
         */
        $roomId = $request['room_id'];
        $player = Players::where('room_id');
        $final_score = [

        ];

        /*
         * format Each player
         * Rank, PlayerName, TotalScore, [Question[i] : score, title_question => answer selected ]
         */
        $summary = [

        ];
        $question_detail = [

        ];
        $raw_report_data = [

        ];

        $data['overview'] = $overview;
        $data['final_score'] = $final_score;
        $data['summary'] = $summary;
        $data['question_detail'] = $question_detail;
        $data['raw_report_data'] = $raw_report_data;

        return response()->json([
            'message'=> 'get all player room successfully', 'data' => $data
        ],200);
    }

}
