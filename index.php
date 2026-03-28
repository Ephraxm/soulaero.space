
<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
<title>meant2be Shop</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header>
<h1>meant2be</h1>
<nav>
<a href="index.php">Shop</a>
<?php if(isset($_SESSION['user'])): ?>
<a href="account.php">Account</a>
<a href="logout.php">Logout</a>
<?php else: ?>
<a href="login.php">Login</a>
<?php endif; ?>
</nav>
</header>

<div class="products">
<div class="card">
<h2>Starter Pack</h2>
<p>£9.99</p>
<a href="checkout.php?product=starter">Buy</a>
</div>

<div class="card">
<h2>Pro Pack</h2>
<p>£19.99</p>
<a href="checkout.php?product=pro">Buy</a>
</div>

<div class="card">
<h2>Ultimate Pack</h2>
<p>£39.99</p>
<a href="checkout.php?product=ultimate">Buy</a>
</div>
</div>
</body>
</html>
