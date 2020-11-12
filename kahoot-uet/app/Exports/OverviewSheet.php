<?php

namespace App\Exports;

use Faker\Provider\ar_SA\Color;
use Faker\Provider\es_ES\Color as Es_ESColor;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Sheet;
use PhpOffice\PhpSpreadsheet\Style\Style;

class OverviewSheet implements FromArray, shouldAutoSize, WithEvents, WithTitle
{
    private $list= [];
    public function __construct($list)
    {
        $this->list = $list;
    }
    public function array():array
    {
        return [
            $this->list[0],
            ['Placed on', $this->list[1][0]],
            ['Hosted by', $this->list[2][0]],
            ['Played with', $this->list[3][0]],
            ['Played', $this->list[4][0]],
            [''],
            ['Overall Performance'],
            ['Total correct answer(%)',$this->list[5][0]],
            ['Total incorrect answers(%)',$this->list[6][0]],
            ['Average score (points)', $this->list[7][0]],
            [''],
            ['Feedback'],
            ['Number of responses', $this->list[8][0]],
            ['How fun was it? (out of 5)', $this->list[9][0]],
            ['Did you learn something?',$this->list[10][0], $this->list[10][1]],
            ['Do you recomment it?', $this->list[11][0], $this->list[11][1]],
            ['How do you feel?', '◉', $this->list[12][0],'◉', $this->list[12][1],'◉',$this->list[12][2]],
            [''],
            ['Switch tabs/pages to view other result breakdown']
        ];
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $style=[
                    'font' => [
                        'bold' => true,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '8731C5',
                    ],                      
                    ],
                    'borders' => [
                        'inside' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['argb' => 'F7EFF1'],
                        ],
                    ],
                ];
                $style3 = [
                    'font' => [
                        'size'=>15,
                        'bold' => true,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '8731C5',
                        ],
                    ]
                ];
                $style1 = [
                    'font' => [
                        'bold' => true,
                        'color' => ['argb'=>'F7EFF1'],
                        'size' => 19
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '4F0CA6',
                        ],
                    ]
                ];
                $style2 = [
                    'font' => [
                        'size'=>15,
                        'bold' => true,
                        'color' => ['argb'=>'F7EFF1']
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '1A17B7',
                        ],
                    ]
                ];
                $highest_row = $event->sheet->getHighestRow();
                $highest_col = $event->sheet->getHighestColumn();
                for($i = 1; $i<=$highest_row; $i++){
                    $event->sheet->getRowDimension(strval($i))->setRowHeight(30);
                }
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setSize(12);
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->getFont()->setName('Arial');
                $event->sheet->getDelegate()->getStyle('A1:'.$highest_col.$highest_row)->applyFromArray([
                    'alignment'=>[
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                    ]
                ]);

                $event->sheet->getDelegate()->getStyle('A1:G1')->applyFromArray($style1);
                $event->sheet->getDelegate()->getStyle('A2:B5')->applyFromArray($style);
                $event->sheet->getDelegate()->getStyle('A7:G7')->applyFromArray($style3);
                $event->sheet->getDelegate()->getStyle('A12:G12')->applyFromArray($style3);
                $event->sheet->getDelegate()->getStyle('A19:G19')->applyFromArray($style2);
                $event->sheet->getDelegate()->getStyle('B17')->applyFromArray([
                    'font' => [
                        'color' => ['argb'=>'19E13E']
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT,
                    ],
                ]);
                $event->sheet->getDelegate()->getStyle('C2:G5')->applyFromArray([     
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'rotation' => 90,
                        'startColor' => [
                            'argb' => '8731C5'
                        ],           
                    ],                
                    'borders' => [
                        'horizontal' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['argb' => 'F7EFF1'],
                        ],
                    ],
                ]);
                $event->sheet->getDelegate()->getStyle('D17')->applyFromArray([
                    'font'=>[
                        'color'=>['argb'=>'F08615']
                    ]
                ]);
                $event->sheet->getDelegate()->getStyle('F17')->applyFromArray([
                    'font'=>[
                        'color' =>['argb'=>'BE1717']
                    ]
                ]);

            },
        ];
    }
    public function title(): string
    {
        return 'Overview';
    }
}
