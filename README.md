# Kahoot-UET

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
