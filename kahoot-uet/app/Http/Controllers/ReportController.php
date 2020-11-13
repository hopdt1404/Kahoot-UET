<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Reports;
use App\Messager;
use Illuminate\Support\Facades\Validator;

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

    /*
     *  Create Report when create room
    */

    public function create (Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'bail|required',
            'room_id' => 'bail|required|integer',
            'owner_id' => 'bail|required|integer',
        ]);
        $data = [];
        if ($validator->fails()) {
            $data['message'] = Messager::$MESSAGE_EROORS['400'];
            $data = json_encode($data);
            return view('pages.topic', ['data' => $data]);
        }
        $report = Reports::create([
            'name' => $request['name'],
            'room_id' => $request['room_id'],
            'owner_id' => $request['owner_id']
        ]);
        $data['report'] = $report;
        $data = json_encode($data);
        return view('pages.topic', ['data' => $data]);

    }

    public function exportData () {

    }

}
