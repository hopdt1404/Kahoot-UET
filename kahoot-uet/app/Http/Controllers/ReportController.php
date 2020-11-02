<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reports;
use App\Rooms;

class ReportController extends Controller
{
//    private $reportModel = new Report();
    public function index ()
    {
        $ownerId = 1;
        $column = 'name';
        $type = 'desc';
        $reports = Reports::select('id', 'name', 'room_id', 'game_mode', 'created_at')->where('owner_id', $ownerId)->orderBy($column, $type)->get();
        for ($i = 0; $i < count($reports); $i++) {
            $report = $reports[$i];
            $reportId = $report['id'];
            $report['number_player'] = Players::where('report_id', $reportId)->count();
        }
        return view('pages.topic', ['data' => $reports]);
    }
    public function show ()
    {
        $reportId = 10;
//        $report
//        return view('pages.topic', ['data' => $reports]);
    }

    public function searchReportByName ()
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

    public function reportDetail ()
    {

    }

    public function create (Request $request)
    {


    }
}
