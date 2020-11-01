<?php

namespace App\Http\Controllers;

use App\Questions;
use App\Rooms;
use App\Topics;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Faker\Generator as Faker;

class TopicController extends Controller
{
    public function index () {
        $creator_id = 1;

        $myTopic = Topics::select('id' ,'name', 'creator_id', 'created_at', 'is_public', 'is_daft', 'is_played', 'created_at')->where('creator_id', $creator_id)->where('is_deleted', 0)->get();
        $result = [];
        for ($i = 0; $i < count($myTopic); $i++) {
            $topic = $myTopic[$i];
            $creatorName = User::select('username')->where('id', $topic['creator_id'])->get();
            $creatorName = $creatorName[0]['username'];
            $topic['creator_name'] = $creatorName;
            $topic['number_question'] = Questions::where('topic_id', $topic['id'])->count();
            if ($topic['is_played']) {
                $numberPlayer = Rooms::select('id')->where('topic_id', $topic['id'])->count();
                $topic['number_played'] = $numberPlayer;
            }
        }
        return view('pages.topic', ['data' => $myTopic]);
    }
    public function show ($creator_id = 1) {
//        if (is_null($creator_id)) {
//            return view ('Error');
//        }
        $data = Topics::where('creator_id', $creator_id)->get();
        return view('pages.topic', ['data' => $data]);
    }
    public function store () {
        $numberQuestion = 10;
        $questions = [];
        $faker = Faker::class;
        for ($i = 0; $i < $numberQuestion; $i++ ) {
            $question = Topics::create([
                'name' => 'Faker::class.name',
                'creator_id' => rand(1, 10),
                'is_deleted' => rand(0, 1),
                'is_public'  => rand(0, 1),
                'is_daft'  => rand(0, 1),
                'is_played' => rand(0,1),
                'created_at' => now()
            ]);
//            $question->save();

            array_push($questions, $question);

        }
        return view('pages.topic', ['data' => $questions]);
    }



    public function update () {
        $creatorId = 1;

        $dataGet = Topics::where('creator_id', $creatorId)->limit(1)->get();
        Topics::where('creator_id', $creatorId)->limit(1)->update(['name' => 'con cac', 'is_played' => 1]);
        $data = [];
        array_push($data, $dataGet);

        return view('pages.topic', ['data' => json_encode($data, JSON_PRETTY_PRINT)] );
    }

    public function destroy () {
        $creatorId = 1;
        $dataGet = Topics::where('creator_id', $creatorId)->orderBy('id', 'asc')->limit(1)->get();
        $dataGet['objcet'] = 'GEt';
        $data = [];
        array_push($data, $dataGet);
        $id = $dataGet[0]['id'];
        Topics::where('id', $id)->delete();
        $dataGetAfterDelete = Topics::where('creator_id', $creatorId)->orderBy('id', 'asc')->limit(1)->get();
        $dataGetAfterDelete['object'] = 'object after delete';

        array_push($data, $dataGetAfterDelete);
        return view('pages.topic', ['data' => json_encode($data, JSON_PRETTY_PRINT)] );
    }
}
