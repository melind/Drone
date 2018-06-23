<?php
session_start();
$titre="Connexion";
$titre="Enregistrement";
include("../includes/connexionDB.php");
include_once('../includes/includes.php');

if(isset($_SESSION['prenom'])){
	header('Location: ../index.php');
	exit;
}

if(!empty($_POST)){
	extract($_POST);
	$valid = true;

	$Mail = htmlspecialchars(trim($Mail));
	$Password = trim($Password);

	if(empty($Mail)){
		$valid = false;
		$_SESSION['flash']['warning'] = "Veuillez renseigner votre mail !";
	}

	if(empty($Password)){
		$valid = false;
		$error_password = "Veuillez renseigner un mot de passe !";
	}


	$req = $DB->query('Select * from user where mail = :mail and password = :password', array('mail' => $Mail, 'password' => crypt($Password, '$2a$10$1qAz2wSx3eDc4rFv5tGb5t')));
	$req = $req->fetch();

	if(!$req['mail']){
		$valid = false;
		$_SESSION['flash']['danger'] = "Votre mail ou mot de passe ne correspondent pas";
	}


	if($valid){

		//$_SESSION['id'] = $req['id'];
		$_SESSION['id'] = $req['id'];
		$_SESSION['nom'] = $req['nom'];
		$_SESSION['prenom'] = $req['prenom'];
		$_SESSION['mail'] = $req['mail'];
		$_SESSION['password'] = $req['password'];
		$_SESSION['adresse'] = $req['adresse'];
		$_SESSION['code_postale'] = $req['code_postale'];
		$_SESSION['ville'] = $req['ville'];

		$_SESSION['flash']['info'] = "Bonjour " . $_SESSION['prenom'];
		header('Location: ../index.php');
		exit;

	}

}

var_dump($_SESSION['id']);
?>


<!DOCTYPE html>
<html>
<head>
	<? php include 'fiche.php' ; ?>
	<link rel="stylesheet" type="text/css" href="index.css">
	<title>D2D</title>
</head>
<body>

	<div class="contourconnect">

	<div class="head"> <h1>CONNEXION</h1> </div>
<div class="containeur ">



<form class="con-form" method="post">
	<table class="table">
    <tr>
  	    <td><label class="labelconnect">email </label ><br>
		<input type="mail" name="Mail" placeholder="Mail" class=" input2" value="<?php if (isset($Mail)) echo $Mail; ?>" required="required"></td>
   </tr>
   <tr>
		<td><label class="labelconnect">mot de passe </label><br>
			<?php
				if(isset($error_password)){
					echo $error_password."<br/>";
				}
			?>
        <input class="input2" type="password" name="Password" placeholder="Mot de passe" value="<?php if (isset($Password)) echo $Password; ?>" required="required"></td>

	 </tr>
	</table><br><br>
	  <input type="submit" value="S'inscrire" class="submit">
</form>


</div>

</div>
</body>
</html>
