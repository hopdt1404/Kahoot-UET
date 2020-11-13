<?php

namespace App\Http\Controllers;

use App\Exports\FinalScoresSheet;
use App\Exports\KahootSummarySheet;
use App\Exports\MultipleSheets;
use App\Exports\OverviewSheet;
use App\Exports\QuesttionSheet;
use App\Exports\RawReportDataSheet;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use PhpParser\Parser\Multiple;
use Symfony\Component\Console\Question\Question;

class ExportExcelController extends Controller
{
    // pass report id,
    public function export(Request $request){
        //test final scores
        $final_scores_list =[
           "kahoot_name"=> ["Mini Test"], 
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
            ['Big Test'],
            ['3 Nov 2020'],
            ['kien1870'],
            ['2 players'],
            ['2 of 2'],
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
            ['Big Test'],
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
}
