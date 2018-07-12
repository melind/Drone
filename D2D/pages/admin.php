<?php
session_start();

include('../includes/navbar.php');
include('../includes/includes.php');

$lvl=(isset($_SESSION['rang']))?(int) $_SESSION['rang']:1;//si on trouve pas le rang daans session on lui donne la valeur de 1 par défaut

// Si $lvl n'est pas = à 1 alors la personne est directement renvoyer sur l'index.
if ($lvl !== 1){
	header('Location: ../index.php');
	exit;
}




if(!empty($_GET)) {
	extract($_GET);//recup de l'intérieur
	$valid = true;
	$Rang = htmlspecialchars(trim($Rang));
	$User = htmlspecialchars(trim($User));

	if ($valid) {
		$DB->update('UPDATE user SET rang ="' . $Rang .'" WHERE nom= "' . $User . '"');
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<head>

	<title>Document</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	<link rel="stylesheet" href="../index.css">
</head>
<body>

	<div class="administration">
		<h2>PANNEL D'ADMINISTRATION</h2>
	</div>

  <div class="pan_admin">

   <div id="left">


		<br>
<div id="right">
	<div id="show_right">
		<h4>Définir le rang d'un utilisateur</h4>
		</div>
		<div id="form_rank">
		<form action="admin.php" method="GET">
			<label>Rank :</label><br>
			<input type="radio" name="Rang" value="0" /> <label for="Rang">Visiteur</label><br>
           <input type="radio" name="Rang" value="1" /> <label for="Rang">Administrateur</label><br>
				<!-- <input  type="number" name="Rang" placeholder="rank" value="<?php if (isset($Rang)) echo $Rang; ?>" required="required"> -->
			<br>
			<label>Nom d'utilisateur:</label>
				<input  type="text" name="User" placeholder="User" value="<?php if (isset($User)) echo $User; ?>" required="required">
			<br>

			<input type="submit" value="Ajouter">

		</form>
	 </div>
	</div>
</div>





	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
	<script src='../index.js'></script>
</body>
</html>
