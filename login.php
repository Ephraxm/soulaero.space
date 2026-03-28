
<?php session_start(); ?>
<form method="POST">
<input name="user" placeholder="Username">
<input name="pass" type="password" placeholder="Password">
<button>Login</button>
</form>
<?php
if($_POST){
$_SESSION['user']=$_POST['user'];
header("Location: index.php");
}
?>
