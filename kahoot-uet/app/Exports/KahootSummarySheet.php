<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class KahootSummarySheet implements FromArray, ShouldAutoSize, WithEvents, WithTitle
{
    private $list = [];
    public function __construct($list)
    {
        $rows_name = ['Rank', 'Player', 'Total Scores (points)'];
        $rows_name = array_merge($rows_name, $list[1]);
        $this->list = [$list[0], ['Kahoot! Summary'], $rows_name];
        $this->list = array_merge($this->list, array_slice($list,2));
    }
    public function array():array{
        return $this->list;
    }
    public function registerEvents(): array{
        return [
            AfterSheet::class    => function(AfterSheet $event){
                $highest_row = $event->sheet->getHighestRow();
                $highest_col = $event->sheet->getHighestColumn();
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setSize(12);
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setName('Arial');
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.'1')->applyFromArray([
                    'font' => [
                        'size' => 19,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'fill' =>[
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb'=>'4F0CA6']
                    ],
                ]);
                $event->sheet->getDelegate()->getStyle('A2:'.$highest_col.'2')->applyFromArray([
                    'font' => [
                        'size' => 15,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'fill' =>[
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb'=>'8731C5']
                    ],
                ]);
               
                $columns = count($this->list[2]);
                $rows = $highest_row;
                for($i = 1; $i<=$columns; $i++){
                    $column_index = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
                    $event->sheet->getColumnDimension($column_index)->setAutoSize(false);
                    $event->sheet->getColumnDimension($column_index)->setWidth(40);
                }
                for($i = 1; $i<=$rows; $i++){
                   $event->sheet->getRowDimension(strval($i))->setRowHeight(30);
                }
                for($i = 4; $i<=$rows; $i++){
                    for($j = 4; $j<=$columns; $j+=2){
                        $column_index = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($j);
                        $row_index = strval($i);
                        $coordinate = $column_index.$row_index;
                        $background_color='1CBF45';
                        if($event->sheet->getCell($coordinate)=="0"){
                           $background_color = 'BE1717';
                        }
                        //dd($coordinate);
                        $event->sheet->getDelegate()->getStyle($coordinate)->applyFromArray([
                            'font' => [
                                'color' => ['argb'=>'F7EFF1']
                            ],
                            'fill' =>[
                                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                                'startColor' => ['argb'=>$background_color]
                            ],
                            'borders' => [
                                'bottom' => [
                                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                    'color' => ['argb' => 'F7EFF1'],
                                ],
                            ],
                        ]);
                    }
                }

            }
        ];
    }
    public function title(): string
    {
        return 'Kahoot! Summary';
    }
}
