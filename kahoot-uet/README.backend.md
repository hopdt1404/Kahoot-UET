# Backend Rule

## A. Database
1. CURD - Database
- `Bất cứ thay đổi nào liên quan đến DB (tạo/xóa/sửa - bảng, cột trong bảng).
Thì mọi thay đổi đó đều sử dụng migration - đồng bộ DB giữa những dev khác`
2. Run 
- `Pull code mới về thì cần update migrate`
3. Đặt tên cột 
- `Quy tắt ten_cot. Ngăn cách nhau bởi dấu "_"`



## API



API: Unlock rook
Report làm tiếp

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






	



