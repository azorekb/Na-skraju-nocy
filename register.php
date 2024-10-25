<html>
<?php
session_start();
$connected = false;
$mysql = mysql_connect('mysql1.ugu.pl','db699059','MalaRuka.037');
if($mysql)
{
    if(mysql_select_db('db699059', $mysql))
    {
        $connected = true;
    }
    else echo 'can\'t select db';
}
else echo 'Could not connect to database';

if($connected)
{
    if(isset($_GET['what']))
    {
        switch($_GET['what'])
        {
            case 'new':
            {
                if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['mail']))
                {
                    $result = mysql_query("select username,mail from nsn_login where username = '" . $_POST['username'] . "' or mail = '" . $_POST['mail'] . "';", $mysql);
                    if($result)
                    {
                        $array = mysql_fetch_array($result);
                        if($array[0] == $_POST['username']) header('location: index.php?what=register&error=1');
                        if($array[1] == $_POST['mail']) header('location: index.php?what=register&error=2');
                        
                        if(!$array)
                        {
                            $kod = '';
                            for($i = 0; $i < 8; $i++)
                            $kod .= rand(0,9);
                        
                            $to = $_POST['mail'];
                            $subject = "Na skraju nocy - wizja";
                            
                            $message = "<img src='http://naskrajunocy.ugu.pl/img/scroll.png' style='margin-bottom:-400px; width: 340px;height: 360px'><div style=\"width: 340px;height: 360px;color: darkblue;font-family: MV Boli;text-align: center;display: flex;\"><p style=\"display: inline-block;align-self: center;padding: 0 65px;\">{$_POST['username']}<br><br>W nocy ukazały ci się przedziwne znaki:<br><br>{$kod}<br><br>[link będzie później]</p></div>";
                            
                            $headers = "MIME-Version: 1.0\r\n";
                            $headers .= "Content-type: text/html; charset=UTF-8\r\n";
                            $headers .= 'From: <szibi@naskrajunocy.ugu.pl>';
                            
                            mail($to,$subject,$message,$headers);
                            
                            mysql_query("insert into nsn_login(username,password,mail,code) values ('{$_POST['username']}','{$_POST['password']}','{$_POST['mail']}','{$kod}');", $mysql) or die(mysql_error());
                            
                            $_SESSION["username"] = $_POST["username"];
                            $_SESSION["mail"] = $_POST["mail"];
                            
                            header("location: index.php?action=registered");
                        }
                        
                    }
                    else echo 'error: ' . mysql_error();
                }
                else header("location: index.php");
            } break;
            case "confirm":
            {
                if(isset($_POST["vision"]))
                {
                    $result = mysql_query("select code,id from nsn_login where username = '" . $_SESSION['username'] . "';", $mysql);

                    if($result)
                    {
                        $array = mysql_fetch_array($result);
                        if($array[0] == $_POST["vision"])
                        {
                            mysql_query("update nsn_login set confirmed = 1 where username = '" . $_SESSION['username'] . "';", $mysql);
                            $_SESSION['userID'] = $result[1];
                            header("location:  game/index.html");
                        }
                        else header("location:  index.php?action=registered&error=3");
                    }
                }
                else header("location: index.php");
            } break;
            case "login":
            {
                $result = mysql_query("select id from nsn_login where username = '" . $_POST['username'] . "' and password = '" . $_POST['password'] . "';", $mysql);

                if($result)
                {
                    $array = mysql_fetch_array($result);
                    if($array[0])
                    {
                        $_SESSION['userID'] = $result[0];
                        header("location:  game/index.html");
                    }
                    else header("location:  index.php?action=login&error=4");
                }
            } break;
    
            default: header("location: index.php");
        }
    }
    else header("location: index.php");
}

?>

</html>