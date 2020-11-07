<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MultipleSheets implements WithMultipleSheets
{
   private $sheet_list = [];
   public function __construct($sheet_list)
   {
       $this->sheet_list = $sheet_list;
   }
   public function sheets() : array {
    $sheets = [];
    $sheets[] = new OverviewSheet($this->sheet_list[0]);
    $sheets[] = new FinalScoresSheet($this->sheet_list[1]);
    $sheets[] = new KahootSummarySheet($this->sheet_list[2]);
    $question_list = $this->sheet_list[3];
    for($i = 0; $i<count($question_list); $i++){
        $sheets[] = new QuesttionSheet($question_list[$i], $i+1);
    }
    $sheets[] = new RawReportDataSheet($this->sheet_list[4]);
    
    return $sheets;

}
    public function download(){
        return (new MultipleSheets($this->file_name,$this->sheet_list))->download();
    }
}
