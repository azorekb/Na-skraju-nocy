<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Na skraju nocy (prealfa czy coś, nie wiem, ja tu tylko sprzątam)</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel='stylesheet' type='text/css' media='screen' href='style.css'>
    </head>
    <body>
        <?php
            if(isset($_GET['error']))
            {
                echo '<p class = "error">';
                switch($_GET['error'])
                {
                    case '1': echo "Wygląda na to, że przysięga została już złożona na podane imię."; break;
                    case '2': echo "Z podanej wioski przybył już jej przedstawiciel. Niestety obowiązuje limit jednego przedstawiciela na wioskę."; break;
                    case '3': echo "Podana wizja jest niepoprawna. Wróć gdy przypomnisz sobie poprawną."; break;
                }
                echo '</p>';
            }
            if(isset($_GET['action']))
            {
                echo '<div class="regDiv">
                        <div class="row">
                            <div class="cell diamond"></div>
                            <div class="cell horizontal"></div>
                            <div class="cell diamond"></div>
                        </div>
                        <div class="row center">
                            <div class="cell verticaly"></div>
                            <div class="cell main">';
            
                switch($_GET['action'])
                {
                    case 'register':
                    {
                        echo '<form action="register.php?what=new" method="post">
                        <label>Ja, niżej podpisany</label><br>
                        <input type="text" placeholder="nazwa użytkownika" name="username"><br>
                        <label>pochodzący z wioski</label><br>
                        <input type="text" placeholder="adres e-mail" name="mail"><br>
                        <label>uroczyście przysięgam wierność władcy Mirgrodu i  jego mieszkańcom, a także, że będę opiekować się powierzonymi mi smokami najlepiej jak potrafię.<br>Słowa swe przypieczętowuję zaś własną krwią.</label><br>
                        <input type="password" placeholder="hasło" name="password"><br>
                        <label>i niechaj skonam jeśli kiedykolwiek się im sprzeniewierzę i powyższą Przysięgę Krwi złamię</label><br>
                        <button class="register"></button></form>';
                    } break;
                    case 'registered':
                    {
                        session_start();
                        if(isset($_SESSION['username']))
                        {
                            echo "<form action='register.php?what=confirm' method='post'>
                            <label>Ja, niżej podpisany</label><br>
                            <i>{$_SESSION['username']}</i><br>
                            <label>pochodzący z wioski</label><br>
                            <i>{$_SESSION['mail']}</i><br>
                            <label>uroczyście przysięgam wierność władcy Mirgrodu i  jego mieszkańcom, a także, że będę opiekować się powierzonymi mi smokami najlepiej jak potrafię.<br>Słowa swe przypieczętowuję zaś własną krwią.</label><br>
                            <div class='blood'><img src='img/blood.png'></div><br>
                            <label>i niechaj skonam jeśli kiedykolwiek się im sprzeniewierzę i powyższą Przysięgę Krwi złamię</label><br>
                            <button class='register'></button><br>
                            <label>Udaj się teraz do swojej wioski i powróć, gdy otrzymasz wizję, by nam ją opowiedzieć</label><br>
                            <input type='text' placeholder='twoja Wizja' name='vision'></form>";
                        }
                    } break;
                    case "login":
                    {
                        echo '<form action="register.php?what=login" method="post">
                        <label>Ja niżej podpisany</label><br>
                        <input type="text" placeholder="nazwa użytkownika" name="username"><br>
                        <label>pragnę powrócić do opieki nad moimi smokami</label></br>
                        <input type="password" placeholder="hasło" name="password"><br>
                        <button>wejdź</button></form>';
                    } break;
                    
                    
                    default: header("location: index.php");
                }
                echo '      </div>
                            <div class="cell verticaly"></div>
                        </div>
                        <div class="row">
                        <div class="cell diamond"></div>
                        <div class="cell horizontal"></div>
                        <div class="cell diamond"></div>
                    </div></div>';
            }
            else
            {
                echo '<div class = "background">
                    <img src="img/logo_v1.webp"><br>
                    <div class = "linkButtons"><div onclick = "document.location.href = \'?action=register\'">Rejestracja</div> <div onclick = "document.location.href = \'?action=login\'">Logowanie</div> 
                </div>';
            }

?>
            
    </body>
</html>