<?php
session_start();
include_once('../includes/includes.php');

  if (!isset($_SESSION['nom'])){
        header('Location: ../index.php');
        exit;
    }
?>

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>BONJOUR</h1>
</body>
</html>