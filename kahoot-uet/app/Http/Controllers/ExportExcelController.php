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
    // pass report id,
    public function export(Request $request){
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
        $exitReport = Reports::where('id', $request['report_id'])->count();
        if ($exitReport != 1) {
            return response()->json([
                'message'=>'Bad request'], 400);
        }
        $report = Reports::where('id', $request['report_id'])->get();
        $report = $report[0];
        $players = Players::select('id','name', 'total_score', 'number_correct_answer', 'number_incorrect_answer')->where('report_id', $report['id'])->orderBy('total_score', 'desc')->get();

        /*
         * Done final_score_list
        */
        $final_scores_list =[
           "kahoot_name"=> ["Mini Test"]
        ];
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
