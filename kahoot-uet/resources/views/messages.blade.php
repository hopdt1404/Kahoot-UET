<html>

<head>
    <title>Demo chat</title>
</head>
<body>
    <div id="data">
        @foreach($messages ?? '' as $message)
        <p id="{{$message->id}}"><strong>{{$message->author}}</strong>: {{$message->content}}</p>
        @endforeach
    </div>
    <div>
        <form action="send-message" method="POST">
        {{csrf_field()}}
        Name: <input type="text" name="author">
        <br>
        <br>
        Content: <textarea name="content" rows="5" style="width:100%"></textarea>
        <button type="submit" name="send">Send</button>
        </form>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.1/socket.io.js" integrity="sha512-vGcPDqyonHb0c11UofnOKdSAt5zYRpKI4ow+v6hat4i96b7nHSn8PQyk0sT5L9RECyksp+SztCPP6bqeeGaRKg==" crossorigin="anonymous"></script>
        <script>
            
                var socket = io('http://localhost:6001');
                console.log(socket)
                socket.on('chat:message',function(data){
                    //console.log(data)
            
                //$('#data').append('<h1>'+'New Message'+'</h1>')
                $('#data').append('<p><strong>'+data.author+'</strong>: '+data.content+'</p>')
                
                })

        </script>
    </div>
</body>

</html>