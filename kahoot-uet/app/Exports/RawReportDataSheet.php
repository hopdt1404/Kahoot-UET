<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class RawReportDataSheet implements FromArray, WithEvents, ShouldAutoSize, WithTitle
{
    private $list = [];
    public function __construct($list)
    {
        $this->list = $list;
    }
    public function array():array{
        $result = [[
            'Question Number',
            'Question',
            'Answer 1',
            'Answer 2',
            'Answer 3',
            'Answer 4',
            'Correct Answers',
            'Time Allotted to Answer (seconds)',
            'Player',
            'Answer',
            'Correct / Incorrect',
            'Correct',
            'Incorrect',
            'Score (points)',
            'Score without Answer Streak Bonus (points)',
            'Current Total Score (points)',
            'Answer Time (%)',
            'Answer Time (seconds)'
        ]];
        $result = array_merge($result, $this->list);
        return $result;
    }
    public function registerEvents(): array{
        return [
            AfterSheet::class    => function(AfterSheet $event){
                $highest_row = $event->sheet->getHighestRow();
                $highest_col = $event->sheet->getHighestColumn();
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setSize(12);
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setName('Arial');
                for($i = 1; $i<=$highest_row; $i++){
                    $event->sheet->getRowDimension(strval($i))->setRowHeight(30);
                 }
            }  
        ];
    }
    public function title(): string
    {
        return 'RawReportData Data';
    }
}
