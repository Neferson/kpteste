<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href='{{ asset("css/main.css") }}' rel="stylesheet">
</head>
<body>
    <div class="row">
        <div class="box-404 text-center text-white">
            <h1 class=" big-text ">404</h1>
            <p>OOPS, NÃO CONSEGUIMOS ENCONTRAR A PÁGINA</p>
            <a href="{{ route('dashboard') }}" class="btn btn-main">VOLTAR A PÁGINA INICIAL</a>
        </div>
    </div>
</body>
</html>

