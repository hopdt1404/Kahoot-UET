<html>
  <head>
    <style>
      .button {
        background-color: #1c87c9;
        border: none;
        color: white;
        padding: 10px 30px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        margin: 4px 2px;
        cursor: pointer;
      }
      label{
        font-size: 20px;
        color:slategray;
        
        
      }
    </style>
  </head>
  <body>
    <label> Hello! <label>
    <br>
    <label> Click to reset your password </label>
    <br>
    <a href="{{$reset_link}}" class="button">Click Here</a>
    <br>
    <label>Thank you for using our application!</label>
    <br>
    <label>Regard,</label>
    <br>
    <label>Kahoot</label>
  </body>