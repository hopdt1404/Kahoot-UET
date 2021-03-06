<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        {{-- error icon tab browser --}}
        <link rel="shortcut icon" src="{{url('images/icon_kahoot.png')}}" type="image/x-icon"/> 
        <title>Kahoot!</title>
        <link href='https://fonts.googleapis.com/css?family=Archivo Black' rel='stylesheet'>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="index"></div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>