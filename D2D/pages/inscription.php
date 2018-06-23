<?php
session_start();
include_once('../includes/includes.php');

if(isset($_SESSION['pseudo'])){
	header('Location: accueil.php');
	exit;
}

if(!empty($_POST)){
	extract($_POST);
	$valid = true;

	$Mail = htmlspecialchars(trim($Mail));
	$Nom = htmlspecialchars(ucfirst(trim($Nom)));
	$Prenom = htmlspecialchars(ucfirst(trim($Prenom)));
	$Password = trim($Password);
	$PasswordConfirmation = trim($PasswordConfirmation);
	$Adresse = htmlspecialchars(ucfirst(trim($Adresse)));
	$CodeP = trim($CodeP);
	$Ville = htmlspecialchars(ucfirst(trim($Ville)));

	if(empty($Nom)){
		$valid = false;
		$_SESSION['flash']['danger'] = "Veuillez mettre un pseudo !";
	}

	if(empty($Mail)){
		$valid = false;
		$_SESSION['flash']['danger'] = "Veuillez mettre un mail !";
	}

	$req = $DB->query('Select mail from user where mail = :mail', array('mail' => $Mail));
	$req = $req->fetch();

	if(!empty($Mail) && $req['mail']){
		$valid = false;
		$_SESSION['flash']['danger'] = "Ce mail existe déjà";

	}
	if(!preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $Mail)){
		$valid = false;
		$_SESSION['flash']['danger'] = "Veuillez mettre un mail conforme !";
	}

	if(empty($Password)){
		$valid = false;
		$_SESSION['flash']['danger'] = "Veuillez renseigner votre mot de passe !";

	}elseif($Password && empty($PasswordConfirmation)){
		$valid = false;
		$_SESSION['flash']['danger'] = "Veuillez confirmer votre mot de passe !";

	}elseif(!empty($Password) && !empty($PasswordConfirmation)){
		if($Password != $PasswordConfirmation){

			$valid = false;
			$_SESSION['flash']['danger'] = "La confirmation est différente !";
		}

	}

	if($valid){

		$id_public = uniqid();

		$DB->insert('INSERT INTO user (nom, prenom, mail, password, adresse, code_postale, ville, idpublic) values (:nom, :prenom, :mail, :password, :adresse, :code_postale, :ville, :idpublic)', array('nom' => $Nom, 'prenom' => $Prenom, 'mail' => $Mail, 'password' => crypt($Password, '$2a$10$1qAz2wSx3eDc4rFv5tGb5t'), 'adresse' => $Adresse, 'code_postale' => $CodeP, 'ville' => $Ville, 'idpublic' => $id_public));


		$_SESSION['flash']['success'] = "Votre inscription a bien été prise en compte, connectez-vous !";
		header('Location: ../index.php');
		exit;

	}
}
?>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="index.css">
	<title>D2D</title>
</head>
<body>
	<?php
			if(isset($_SESSION['flash'])){
					foreach($_SESSION['flash'] as $type => $message): ?>
			<div id="alert" class="alert alert-<?= $type; ?> infoMessage"><a class="close">X</span></a>
				<?= $message; ?>
			</div>

		<?php
				endforeach;
				unset($_SESSION['flash']);
		}
	?>
<div class="contour">

	<div class="head"> <h1>INSCRIPTION</h1> </div>
		<div class="containeur ">



			<form method="post"  id="form">
				<fieldset class="infoperso ">

		 			<legend> informations personelles </legend>

						<table>
							<tr>
								<td><label>*nom</label>
			<?php
				if(isset($error_pseudo)){
					echo $error_pseudo."<br/>";
				}
			?>
								<input type="text" name="Nom" placeholder="Nom" value="<?php if (isset($Nom)) echo $Nom; ?>" required="required" class="input1"></td>
								<td><label>*prenom</label>
			<?php
				if(isset($error_pseudo)){
					echo $error_pseudo."<br/>";
				}
			?>
								<input type="text" name="Prenom" placeholder="Prenom" value="<?php if (isset($Prenom)) echo $Prenom; ?>" required="required" class="input1"></td>
 							</tr>

  						<tr>
  							<td><label>*adresse mail</label>
									<input type="mail" name="Mail" placeholder="Mail" value="<?php if (isset($Mail)) echo $Mail; ?>" required="required" class="input1"></td>
 							</tr>

   						<tr>
								<td><label>*mot de passe</label>
			<?php
				if(isset($error_password)){
					echo $error_password."<br/>";
				}
			?>
        				<input type="password" name="Password" placeholder="Mot de passe" value="<?php if (isset($Password)) echo $Password; ?>" required="required" class="input1"></td>
								<td><label>*confirmation</label>
			<?php
				if(isset($error_passwordConf)){
					echo $error_passwordConf."<br/>";
				}
			?>
								<input type="password" name="PasswordConfirmation" placeholder="Confirmation du mot de passe" required="required" class="input1"></td>
							</tr>
						</table>
					</fieldset>

					<fieldset class="infolivraison">

						<legend> informations livraison </legend>

						<div class="cnt1">
							<label>*Adresse</label>
								<input type="text" name="Adresse" placeholder="Adresse" value="<?php if (isset($Adresse)) echo $Adresse; ?>" required="required"class="inputadresse">
					  </div><br>

						<div class="cnt2">
            	<label class="col-label1" for="textinput">*Ville</label>
            		<div class=" col-input1">
              		<input type="text" name="Ville" placeholder="Ville" value="<?php if (isset($Ville)) echo $Ville; ?>"  required="required" class="inputa">
            		</div>

          		<label class="col-label2" for="textinput">*code postal</label>
             		<div class=" col-input2">
              		<input type="text"name="CodeP" placeholder="CodeP" value="<?php if (isset($CodeP)) echo $CodeP; ?>"  required="required" class="inputb">
            		</div>
          	</div>

					</fieldset>

					<br><br>

  				<input type="checkbox" name="v" value="B" checked> Vous acceptez les condition generales d'utilisattion<br>
  				<input type="checkbox" name="v" value="B" checked> Vous accepter de recevoir des mails de la part de DronDeDame sur nos nouveaux arrivages <br><br>
  				<input type="submit" value="S'inscrire" color="red" class="submit">
		</form>

		<P>* Remplir les champs </P>

	</div>

</div>
</body>
</html>
