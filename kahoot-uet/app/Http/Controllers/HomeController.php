<?php

namespace App\Http\Controllers;

use App\Questions;
use App\Reports;
use App\Topics;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home (Request $request) {
        $user = $request->user();
        $data['fullname'] = $user['name'];
        $data['username'] = $user['name'];
        $topics = Topics::select('id', 'name')->where([
            'creator_id' => $user['id'],
            'is_deleted' => 0
        ])->get();
        $resultTopic = [];
        for ($i = 0; $i < count($topics); $i++) {
            $num_quest = Questions::where('topic_id', $topics[$i]['id'])->count();
            $topic['num_quest'] = $num_quest;
            $topic['img'] = null;
            $topic['id'] = $topics[$i]['id'];
            $topic['name'] = $topics[$i]['name'];
            array_push($resultTopic, $topic);
        }
        $data['kahootlist'] = $resultTopic;
        $reports = Reports::select('id', 'name', 'created_at')->where([
            'owner_id' => $user['id']
        ])->get();
        $data['reportlist'] = $reports;
        return response()->json(['success' => "Home ", $data]);
    }
}
