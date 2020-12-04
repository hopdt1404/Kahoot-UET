# Kahoot-UET

### Run 
 - php artisan migrate:fresh 
 - php artisan config:cache
 - composer require laravel/passport "~9.0"
 - php artisan passport:install
 - php artisan passport:client --personal
 - php artisan make:middleware CheckApiToken
- composer require maatwebsite/excel:^3.0.1
 
### Install Socket
- Redis 3.2.100: doing 
- NodeJS moij version: Done</br>

=> composer require predis/predis: Done
=> Npm install socket.io ioredis : Done

Config  file .env
Change 
--- 
BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=1000


MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=c0298fd2f5e0c4
MAIL_PASSWORD=cd12739969fe0c
MAIL_ENCRYPTION=tls


---- 
### Create folder 
- server_node
- cd server_node
- create file server.js
- copy page: content
"var io = require('socket.io')(6001)
 console.log('Connected to port 6001')
 io.on('error',function(socket){
 	console.log('error')
 })
 io.on('connection',function(socket){
 	//console.log('Co nguoi vua ket noi'+socket.id)
 })
 var Redis = require('ioredis')
 var redis = new Redis(1000)
 redis.psubscribe("*",function(error,count){
 	//
 })
 redis.on('pmessage',function(partner,channel,message){
 	 console.log(channel)
 	// console.log(message)
 	//console.log(partner)
 
 	message = JSON.parse(message)
 	io.emit(channel+":"+message.event, message.data.message)
 	console.log(message)
 	//console.log('Sent')
 })
"
### config/database.php
- kéo xuống dưới cùng => 
Chỉnh client: 'client' => env('REDIS_CLIENT', 'predis'),
- comment dòng: prefix 

## Run
- Bật redis: sudo redis-server --port 1000 (1)  
- Chạy khi có thay đổi  file .env
+ php artisan config:cache
+ php artisan cache:clear


- Bật "Queue": php artisan queue:listen (2) 
- Bật server: php artisan sever (3)
- Bật server node: (Server node thường sẽ ở trong app/)
+  truy cập đến folder server_node
+ Run: node server (4)

#### Cả 4 môi trường đều cùng chạy 1 lúc 
 


 
 

## API

A. Topic - Question

Update topic -> create new topic
update question of topic => create new topic

B. Room:
- Create new room:
    RoomController@index: Tạo 1 room và lấy thông tin room (có mã PIN) 
- Lock room
    RoomController@lockRoom
- Finish:
    RoomController@finishRoom


C: Player:
- Join room: PlayerController@create
- Get out player: PlayerController@getOutPlayer

- Danh sách top 5 player điểm cao nhất: PlayerController@topFiveMaxScore 

D: Report:

**
- List Report: ReportController@index
- Cập kết quả sau mỗi câu trả lời: ReportPlayerControler@create
- 
** 
- Report detail: ReportController@reportDetail
- Report detail - Question 


### Question and Answer

- Cần làm: Favortity
API Favoriest
- Unlock room


Done: 
+ Overview
+ FinalScore 

Now: 
Each question detail
Export Report data
Kahoot summary => Map result to question 


Sheets
1: Overview 

a. Big Test:<br>
	+ placed on: ngày chơi => ok<br>
	+ Hosted by: người tạo phòng=> ok<br>
	+ Played with: ?? sự khác biệt nào với Played<br>
	+ Played: ??<br>
	
b. Overall Performance

	+ Total correct answer: ? định nghĩa là gì ?
	+ Total incorrect answer: ? định nghĩa là gì ?
	+ Average score: Điểm trung bình của mỗi player: ok

c. Feedback ?? : Có phần feedback thì ở chỗ nào thế ?? sau khi chơi thì feedback à ?

	+ Number of responses
	+ How fun was it? (out of 5)
	+ Did you learn something?
	+ Do you recommend it?
	+ How do you feel?

=> Định nghĩa sau

2. Final Score: Ok

3. Kahoot!Summary: Ok

	+ Q[i]: Số điểm câu thứ i
	+ Title: câu hỏi
	+ Đáp án lựa chọn
	
4. Quiz - T/F

a. I [Quiz]<br>
	+ Correct answers: ok
	+ Players correct (%): ok
	+ Question duration: time : ok


b. Answer Summary:
	+ Answer options: content answers : ok
	+ is answer correct: ok
	+ Average time taken to answer: ok
	
c. Player Detail:
	+ Player: Name : ok
	+ Answer: answer select
	+ Score: ok
	+ Current Total Score: ok => Xem lai DB chut
	+ Answer time
 

5. RawReportData Data

	+ Number question: ok (questions order by sequence)
	+ Question: Title question: ok
	+ Answer 1, 2, 3, 4: Content answer : ok
	+ Correct Answer : ok
	+ Time Allotted to Answer (seconds): time set of question
	+ Player: ok
	+ Answer: ok
	+ Correct / Incorrect: ok
	+ Correct: 1 (vd có multi 1/2 ) ??
	+ Incorrect: 0 (vd có multi 1/2 ) ??
	+ Score: ok (có cả điểm thưởng)
	+ Score without Answer Streak Bonus (points): điểm thật
	+ Current Total Score (points): ok
	+ Answer Time (%): ok
	+ Answer Time (seconds): ok






	




## Quy tắc chung.

### A. Git
0. Backup_code
- `Mọi người nên fork project về repository của mình và code trên đó`
- `Sau khu code xong trên repository của mình thì tạo merge request đến repo của mình`

1. Code<br>
- `Mỗi một chức năng, thao tác thì tạo branch riêng để phát triển độc lập. Tránh conflict code`<br>
- `Trước khi code thì fetch -> merge code (hoặc pull) - khuyến khích fetch - merge`

2. Commit
- `Commit có nghĩa để tiện revert `
- `Đang code dở mà phải sang branch khác thì nên dùng "git rebase" `
3. Push
- `Trước khi push thì luôn pull (fetch - merge) code`
- `Chỉ được push trên các nhánh được chỉ định. Các branch nhà nhánh của branch develop`
- <b>`Tuyệt đối không được push thằng lên origin master`</b>

4. Merge
- `Người được giao nhiệm vụ sẽ thực hiện meger code branch vào branch lớm hơn (develop, master)`
- `Phải tạo merge request cho người thưc hiện merge`

5. Đặt tên branch
- `ten: là tên viết tắt theo hình thức: Đỗ Thiện Hợp => hopdt. Với "hop" tên viết thường không dấu, "dt" viết tắt của họ và tên đệm`
- `group: backend hoặc frontend`
- `name-branch: ví dụ fix-method-save-img-topic`
- <b>[ ten_group_name-branch]</b>

### B. Cấu trúc thư mục
1. Backend

2. Frontend
- `Thư mục lưu source code frontend ./kahoot-uet/app/frontend/`



### C. Câu lệnh phổ biến

1. Backend 

A. Migration


B. Seeder

- php artisan make:seed FakeNameSeeder 

C. Factory

- php artisan make:factory NameFactory --model=NameModel

D. Data 

- php artisan db:seed --class=FakeAllDataSeed
(Fake all data)

- php artisan db:seed --class=FakeSpecSeed
(Run speci Fake)

E. Database

- php artisan migrate:reset
(rollback all migration)

- php artisan migrate:fresh 
(Rerun all migrate)

 


- php artisan make:migration name_migration --create=name_table

- php artisan make:migration name_migration --table=name_table

F. Controller

- php artisan make:controller NameController --resource

G.
