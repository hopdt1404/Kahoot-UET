<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class FinalScoresSheet implements FromArray, WithEvents, WithTitle
{
    /**
    * @return \Illuminate\Support\Collection
    */
    private $list = array();
    public function __construct($list)
    {
        $this->list = [$list['kahoot_name'],
        ['Final Scores'],
        ['Rank', 'Player', 'Total Scores (point)', 'Correct Answers', 'Incorrect Answers']
        ];
        $this->list = array_merge($this->list, array_slice($list, 1));
    }
    public function array(): array{
        return $this->list;
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
                $max_column = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highest_col);
                for($i = 1; $i<=$max_column; $i++){
                    $column_index = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
                    $event->sheet->getColumnDimension($column_index)->setAutoSize(false);
                    $event->sheet->getColumnDimension($column_index)->setWidth(40);
                }
                $event->sheet->getDelegate()->getStyle('A1:F1')->applyFromArray([
                    'font'=>[
                        'size' =>19,
                        'name' =>'Arial',
                        'color'=>['argb'=>'F7EFF1']
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '4F0CA6',
                        ],
                    ]
                ]);
                $event->sheet->getDelegate()->getStyle('A2:E2')->applyFromArray([
                    'font'=>[
                        'size' =>15,
                        'name' =>'Arial',
                        'color'=>['argb'=>'F7EFF1']
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '8731C5',
                        ],
                    ]
                ]);

            }  
        ];
    }
    public function title(): string
    {
        return 'Final Scores';
    }
}
