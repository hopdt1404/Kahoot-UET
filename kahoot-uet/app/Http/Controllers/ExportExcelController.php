<?php

namespace App\Http\Controllers;

use App\Exports\FinalScoresSheet;
use App\Exports\KahootSummarySheet;
use App\Exports\MultipleSheets;
use App\Exports\OverviewSheet;
use App\Exports\QuesttionSheet;
use App\Exports\RawReportDataSheet;
use App\Models\User;
use App\Players;
use App\Questions;
use App\ReportPlayer;
use App\ReportQuestion;
use App\Rooms;
use Facade\FlareClient\Report;
use App\Reports;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use PhpParser\Parser\Multiple;
use Symfony\Component\Console\Question\Question;
use Illuminate\Support\Facades\Validator;

class ExportExcelController extends Controller
{

    public function export (Request $request){
        //test final scores
        if (!isset($request['report_id'])) {
            $request['report_id'] = 1;
        }
        $validator = Validator::make($request->all(), [
            'report_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $report = Reports::where('id', $request['report_id'])->get();
        $exitReport = count($report);
        if ($exitReport != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $report = $report[0];
        $user = $request->user();
        $players = Players::select('id','name', 'total_score', 'number_correct_answer', 'number_incorrect_answer')->where('report_id', $report['id'])->orderBy('total_score', 'desc')->get();

        $final_scores_list =[
            "kahoot_name"=> [$report['name']],
            [
                '1',
                'kiên',
                '2843',
                '3',
                '1'
            ],
            [
                '2',
                'Hello',
                '1234',
                '2',
                '2'
            ]
        ];
        for ($i = 0; $i < count($players); $i++) {
            $final_score = [
                $i + 1, $players[$i]['name'], $players[$i]['total_score'], $players[$i]['number_correct_answer'], $players[$i]['number_incorrect_answer']
            ];
            array_push($final_scores_list, $final_score);
        }
        //test raw report

        $raw_report_data_list =[
            ['1 Quiz', 'sdfsdfdsf', 'A', 'B', 'C', 'D','A','20',
                'Hello','A','Correct','1','0','898','898','898','20.50%','4.1'],
            ['1 Quiz', 'sdfsdfdsf', 'A', 'B', 'C', 'D','A','20',
                'Kiên','A','Correct','1','0','898','898','898','20.50%','4.1'],
            ['2 Quiz', 'True of False?', 'True', 'False', '', '','True','20',
                'Hello','True','Correct','1','0','696','696','1594','25%','5'],
            ['2 Quiz', 'True of False?', 'True', 'False', '', '','True','20',
                'Kiên','A','Correct','1','0','0','0','898','20.50%','4.1'],
        ];

        // test question
        $quiz_list = [
            ['Quiz'],
            ['Mini Test'],
            ['1 Quiz', 'Hello'],
            ['ggggh'],
            ['100.00%'],
            ['20 secends'],
            ['ggggh','dsfsdf','sdfsdf','dsfsdfsdf'],
            ['True','False','False','False'],
            ['1','0','0','0'],
            ['1.20','0','0','0'],
            ['Kiên','ggggh','970','970','1.2'],
            ['Hello','sdfgsfg','0','0','2.0']

        ];
        $topic_id = Rooms::select('topic_id')->where('id', $report['room_id'])->get();
        $topic_id = $topic_id[0]['topic_id'];
        $questionsQuiz = Questions::where('topic_id', $topic_id)->get();
        for ($i = 0; $i < count($questionsQuiz); $i++) {
            $questionsQuiz[$i]['answer'] = json_decode($questionsQuiz[$i]['answer']);
            $question = $questionsQuiz[$i];
            $correctAns = [];
            $answer = $question['answer'];
            $listAns = [];
            $listResultAns = [];
            $listTimeAns = [];
            $question_report = ReportQuestion::where('topic_id', 'id')->get();
            $question_report = $question_report[0];
            $resultAnsPlayer = [$question_report['a'] ?? 3, $question_report['b'] ?? 2, $question_report['c'] ?? 2, $question_report['d'] ?? 0];
            $resultTimePlayer = [$question_report['avg_time_a'] ?? 2.4, $question_report['avg_time_b'] ?? 1.6, $question_report['avg_time_c'] ?? 1.8, $question_report['avg_time_d'] ?? 2.9];
            for($i = 0; $i < count($answer); $i++) {
                array_push($listAns, $answer[$i]['answer']);
                if ($answer[$i]['correct']) {
                    array_push($listResultAns, 'True');
                } else {
                    array_push($listResultAns, 'False');
                }
                if ($answer[$i]['correct']) {
                    array_push($correctAns, $answer[$i]['answer']);
                }
            }
            $playerReport = ReportPlayer::where([
                ''
            ])->get();
            $quiz = [
                ['Quiz'],
                ['Mini Test'],
                [($i + 1) . ' Quiz', $question['title']],
                $correctAns,
                ["100.00%"],
                [$question['time']],
                $listAns,
                $listResultAns,
                $resultAnsPlayer,
                $resultTimePlayer

            ];
        }



        $true_or_false_list =[
            ['T/F'],
            ['Mini Test'],
            ['2 Quiz', 'True or False?'],
            ['True'],
            ['100.00%'],
            ['20 secends'],
            ['True','False'],
            ['True','False'],
            ['1','0'],
            ['1.20','0'],
            ['Kiên','True','970','970','1.2'],
            ['Hello','False','0','0','2.0']
        ];

        // test overview
        $overview_list =[
            [$report['name']],
            [$report['created_at']],
            [$user['name'] ?? 'kien123'],
            [$report['number_player'] . ' players'],
            [$report['number_player'] . ' of ' . $report['number_player']],
            ['75.00%'],
            ['25.00%'],
            ['1373.00 points'],
            ['0'],
            ['0.00 out of 5'],
            ['0.00% Yes','0.00% Yes'],
            ['0.00% Yes','0.00% Yes'],
            ['0.00% Positive', '0.00% Neutral', '0.00% Negative']
        ];

        //test kahoot summary

        $kahoot_summary_list = [
            [$report['name']],
            ['Q1','sdfdsfdsf','Q2','465645'],
            ['1','Hello','1778','898','A','880','B'],
            ['2','Kiên','968','968','A','0','A'],
        ];

        // test multiple sheets
        $list = [
            $overview_list,
            $final_scores_list,
            $kahoot_summary_list,
            [$quiz_list, $true_or_false_list],
            $raw_report_data_list
        ];
        $file_name = 'Mini Test.xlsx';
        return Excel::download(new MultipleSheets($list), $file_name);

    }
    // pass report id,
    public function exportNuew(Request $request){

        //test final scores
        /*
        if (!isset($request['report_id'])) {
            $request['report_id'] = 1;
        }
        $validator = Validator::make($request->all(), [
            'report_id' => 'bail|required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $exitReport = Reports::where('id', $request['report_id'])->count();
        if ($exitReport != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $report = Reports::where('id', $request['report_id'])->get();
        $report = $report[0];
        $players = Players::select('id','name', 'total_score', 'number_correct_answer', 'number_incorrect_answer')->where('report_id', $report['id'])->orderBy('total_score', 'desc')->get();
        */

        /*
         * Done final_score_list
        */
        /*
        $final_scores_list =[
           "kahoot_name"=> [$report['name']]
        ];
        return response()->json([$report]);
        $totalAllPlayerScore = 0;
        $totalCorrectAnswer = 0;
        $totalIncorrectAnswer = 0;
        $summaryPlayers = [];
        for ($i = 0; $i < count($players); $i++) {
            $record = $players[$i];
            $player['rank'] = $i + 1;
            $player['name'] =  $record['name'];
            $player['total_score'] =  $record['total_score'];
            array_push($summaryPlayers, $player);
            $player['number_correct_answer'] =  $record['number_correct_answer'];
            $player['number_incorrect_answer'] =  $record['number_incorrect_answer'];

            array_push($final_scores_list, $player);
            $totalAllPlayerScore += $record['total_score'];
            $totalCorrectAnswer += $record['number_correct_answer'];
            $totalIncorrectAnswer += $record['number_incorrect_answer'];

        }

        //test raw report

        $reportPlayers = ReportPlayer::where('report_id', $request['report_id'])->limit(1)->get();
        */
        $raw_report_data_list =[
            ['1 Quiz', 'sdfsdfdsf', 'A', 'B', 'C', 'D','A','20',
            'Hello','A','Correct','1','0','898','898','898','20.50%','4.1'],
            ['1 Quiz', 'sdfsdfdsf', 'A', 'B', 'C', 'D','A','20',
            'Kiên','A','Correct','1','0','898','898','898','20.50%','4.1'],
            ['2 Quiz', 'True of False?', 'True', 'False', '', '','True','20',
            'Hello','True','Correct','1','0','696','696','1594','25%','5'],
            ['2 Quiz', 'True of False?', 'True', 'False', '', '','True','20',
            'Kiên','A','Correct','1','0','0','0','898','20.50%','4.1'],
        ];
        
        // test question
        $quiz_list = [
            ['Quiz'],
            ['Mini Test'],
            ['1 Quiz', 'Hello'],
            ['ggggh'],
            ['100.00%'],
            ['20 secends'],
            ['ggggh','dsfsdf','sdfsdf','dsfsdfsdf'],
            ['True','False','False','False'],
            ['1','0','0','0'],
            ['1.20','0','0','0'],
            ['Kiên','ggggh','970','970','1.2'],
            ['Hello','sdfgsfg','0','0','2.0']

        ];

        $true_or_false_list =[
            ['T/F'],
            ['Mini Test'],
            ['2 Quiz', 'True or False?'],
            ['True'],
            ['100.00%'],
            ['20 secends'],
            ['True','False'],
            ['True','False'],
            ['1','0'],
            ['1.20','0'],
            ['Kiên','True','970','970','1.2'],
            ['Hello','False','0','0','2.0']
        ];

        // test overview

        $user = User::select('name')->where('id', $report['owner_id'])->get();
        $user = $user[0];
        $numberPlayer = count($reportPlayers);
        $numberPlayed = count($reportPlayers);
        $avgScore = $totalAllPlayerScore / $numberPlayed;
        $totalAnswer = $totalCorrectAnswer + $totalIncorrectAnswer;
        $overview_list =[
            [$report['name']],
            [$report['created_at']],
            [$user['name']],
            [$numberPlayer . ' players'],
            [$numberPlayed . ' of ' . $numberPlayer],
            [(($totalCorrectAnswer / $totalAnswer) * 100) . '%'],
            [(($totalIncorrectAnswer / $totalAnswer) * 100) . '%'],
            [$avgScore .' points'],
            ['0'],
            ['0.00 out of 5'],
            ['0.00% Yes','0.00% Yes'],
            ['0.00% Yes','0.00% Yes'],
            ['0.00% Positive', '0.00% Neutral', '0.00% Negative']
        ];

        //test kahoot summary
        $topic = Rooms::select('topic_id')->where('id', $report['room_id'])->get();
        $topic = $topic[0];
        $questions = Questions::where('topic_id', $topic['topic_id'])->orderBy('sequence', 'asc')->get();
        $resultQuestionSummary = [];
        for ($i = 0; $i < count($questions); $i++) {
            $question = $questions[$i];

            $index = '';
            if (strcmp($question['question_type'], Questions::$QUESTION_TYPE['quiz'])) {
                $index = ($i + 1) . 'Q';
            } else {
                $index = ($i + 1) . 'T/F';
            }
            $title = $question['title'];
            array_push($resultQuestionSummary, $index, $title);

        }
        $kahoot_summary_list = [
            [$report['name']],
            $resultQuestionSummary,
            ['1','Hello','1778','898','A','880','B'],
            ['2','Kiên','968','968','A','0','A'],
        ];

        for ($i = 0; $i < count($players); $i++) {
            $playerSummary = [];
            $player = $players[$i];
            array_push($playerSummary, $player['rank'], $player['name'], $player['total_score']);
            for ($j = 0; $j < count($questions); $j++) {
                $question = $questions[$j];
//                $ans = ReportPlayer::where([
//                    'player_id' => $player['id'],
//                    'question_id' => $question['id']
//                ])->get();
//                $ans = $ans[0];
//                array_push($playerSummary, $ans['player_score'], $ans['ans_selected']);
            }
            array_push($kahoot_summary_list, $playerSummary);

        }

        
        // test multiple sheets
        $list = [
          $overview_list,
           $final_scores_list,
           $kahoot_summary_list,
           [$quiz_list, $true_or_false_list],
            $raw_report_data_list
        ];

        $file_name = 'Mini Test.xlsx';
//        $data['raw_report_data'] = $raw_report_data_list;
//        $data['player'] = $temps;
//        $data['summary'] = $kahoot_summary_list;
//        $data['report_data'] = $reportPlayers;
//        $data['question'] = $questions;
//        $data['overview'] = $overview_list;
//        $data['player'] = $players;
//        $data['final_score'] = $final_scores_list;


//        $data['final_score'] = $final_score;

//        $data['question_detail'] = $question_detail;

//        return response()->json([
//            'message'=> 'get all player room successfully', 'data' => $data
//        ],200);
        return Excel::download(new MultipleSheets($list), $file_name);

    }
}
