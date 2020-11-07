<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use Prophecy\Call\CallCenter;

class QuesttionSheet implements FromArray,WithEvents, ShouldAutoSize, WithTitle
{
    private $list = [];
    private $correct_answer;
    private $is_correct_answer= [];
    private $number_order;
    public function __construct($list, $number_order)
    {
       // dd(strval($number_order));
        $this->list = $list;
        $this->correct_answer = $list[3][0];
        $this->is_correct_answer = $list[7];
      
        for($i = 0; $i<count($this->is_correct_answer); $i++){
            $this->is_correct_answer[$i] = "✘";
            if($list[7][$i]=='True'){

                $this->is_correct_answer[$i] = "✔";         
            }
        }
        $this->number_order = $number_order;
    }
    public function array():array{
        $answer_options = ['♦',$this->list[6][0],'▲',$this->list[6][1]];
        $is_answer_correct = ['','','',''];
        if($this->list[0]==["Quiz"]){
            $answer_options = ['▲',$this->list[6][0],'♦',$this->list[6][1],'■',$this->list[6][2],'●',$this->list[6][3]];
            $is_answer_correct = ['','','','','','','',''];
        }
        $result = [
            $this->list[1], 
            $this->list[2],
            ['Correct answers', $this->list[3][0]],
            ['Player correct (%)', $this->list[4][0]],
            ['Question duration', $this->list[5][0]],
            [''],
            ['Answer Summary'],
            array_merge(['Answer options'], $answer_options),
            array_merge(['Is answer correct?'],  $is_answer_correct),
            array_merge(['Number of answers received'], $this->list[8]),
            array_merge(['Average time taken to answer (seconds)'], $this->list[9]),
            [''],
            ['Player Details'],
            ['Player', 'Answer', 'Score (points)', 'Current Total Score (points)', 'Answer time (seconds)']
        ];
        $result = array_merge($result, array_slice($this->list,10));
        return $result;
       
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
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
                $event->sheet->getDelegate()->getStyle('A7:'.$highest_col.'7')->applyFromArray([
                    'font' => [
                        'size' => 15,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'fill' =>[
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb'=>'8731C5']
                    ],
                ]);
                $event->sheet->getDelegate()->getStyle('A13:'.$highest_col.'13')->applyFromArray([
                    'font' => [
                        'size' => 15,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'fill' =>[
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb'=>'8731C5']
                    ],
                ]);
                $column_size = 0;
                if($this->list[0]==["T/F"]){
                    $column_size = 4;
                    $event->sheet->getDelegate()->getStyle('B9:E9')->applyFromArray([
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => 'F7EFF1'],
                            ],
                        ],
                    ]);
                    $event->sheet->getDelegate()->getStyle('B8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'1A17B7']
                        ]
                    ]);
                    $event->sheet->getDelegate()->getStyle('D8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'BE1717']
                        ]
                    ]);
                }
                else{
                    $column_size = 8;
                    $event->sheet->getDelegate()->getStyle('B9:J9')->applyFromArray([
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => 'F7EFF1'],
                            ],
                        ],
                    ]);
                    $event->sheet->getDelegate()->getStyle('B8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'BE1717']
                        ]
                    ]);
                    $event->sheet->getDelegate()->getStyle('D8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'1A17B7']
                        ]
                    ]);
                    $event->sheet->getDelegate()->getStyle('F8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'F08615']
                        ]
                    ]);
                    $event->sheet->getDelegate()->getStyle('H8')->applyFromArray([
                        'fill'=>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>'3EAC30']
                        ]
                    ]);
                }
                for($i = 2; $i<=$column_size; $i+=2){
                    $column =  \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
                    $coordinate = $column.'8';
                    $event->sheet->getDelegate()->getStyle($coordinate)->applyFromArray([
                           'font' => [
                               'color' => ['argb'=>'F7EFF1']
                           ],
                            'alignment' => [
                                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT,
                            ],
                    ]);
                }
                for($i = 9; $i<=11; $i++){
                    $index = 0;
                    $row = strval($i);
                    for($j = 2; $j<=$column_size; $j+=2){
                        $curr_column = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($j);
                        $next_column = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($j+1);
                        $coordinate1 = $curr_column.$row;
                        $coordinate2 = $next_column.$row;
                        $event->sheet->mergeCells($coordinate1.':'.$coordinate2);
                        $event->sheet->getCell($coordinate1)->setValue($this->is_correct_answer[$index]);
                        if($i==10)  $event->sheet->getCell($coordinate1)->setValue($this->list[8][$index]);
                        else if($i==11)  $event->sheet->getCell($coordinate1)->setValue($this->list[9][$index]);
                        else{
                            $background_color='1CBF45';
                            if($this->is_correct_answer[$index]=="✘")  $background_color = 'BE1717';
                            $event->sheet->getDelegate()->getStyle($coordinate1)->applyFromArray([
                                'font'=>[
                                    'color'=>['argb'=>'F7EFF1']
                                ],
                                'fill'=>[
                                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                                    'startColor' => ['argb'=>$background_color]
                                ]
                            ]);
                        }
                        $event->sheet->getDelegate()->getStyle($coordinate1)->applyFromArray([
                            // 'font' => [
                            //     'color' => ['argb'=>'F7EFF1']
                            // ],
                            'alignment' => [
                                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                            ],
                        ]);
        
                        $index++;
                    }
                }

                $highest_row = $event->sheet->getHighestRow();
                $max_column = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString(
                    $highest_col
                );
                for($i =15; $i<=$highest_row; $i++){
                    $row = strval($i);
                    $column  = 'B';
                    $coordinate = $column.$row;
                    $background_color='1CBF45';
                    if($event->sheet->getCell($coordinate) != $this->correct_answer){
                        $background_color = 'BE1717';
                    }
                    $event->sheet->getDelegate()->getStyle($coordinate)->applyFromArray([
                        'font' => [
                            'color' => ['argb'=>'F7EFF1']
                        ],
                        'fill' =>[
                            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                            'startColor' => ['argb'=>$background_color]
                        ],
                        'borders' => [
                            'top' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                                'color' => ['argb' => 'F7EFF1'],
                            ],
                        ],
                    ]);
                }
                for($i = 1; $i<=$max_column; $i++){
                    $column_index = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
                    $event->sheet->getColumnDimension($column_index)->setAutoSize(false);
                    $event->sheet->getColumnDimension($column_index)->setWidth(40);
                }
                for($i = 1; $i<=$highest_row; $i++){
                    $event->sheet->getRowDimension(strval($i))->setRowHeight(30);
                }
            }   
        ];        
    }
    public function title(): string
    {
        if($this->list[0]==["T/F"]) return strval($this->number_order).' True or False';
        return strval($this->number_order).' Quiz';
    }
}