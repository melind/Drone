<?php
include_once('includes.php');

$cat = $DB->query('SELECT * FROM categories');
$cat = $cat->fetchAll();

if(empty($_SESSION["panier_item"])){
  // Compte le nombre de produit présent dans le panier.
  $session_items = "";//compte le nbre d'item différents
}
 else { 	$session_items=count($_SESSION["panier_item"]);
 }
 	?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<title>Document</title>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<!-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> -->
<link rel="stylesheet" href="/D2D/nav.css">
</head>

 <body>



 <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center"class="container-fluid" id="navigation">
 	<div class="navbar-collapse" id="collapsingNavbar3">
 		<div id="navbar">
 			<ul class="nav navbar-nav ml-auto">
 				<li class="nav-item active">
 					<a class="nav-link " href="/D2D/index.php">ACCUEIL<span class="sr-only">(current)</span></a> <!-- lecteur pour malvoyant-->
 				</li>
 				<li class="nav-item">
 					<a class="nav-link" href="#">|</a>
 				</li>
        <li class="nav-item dropdown">
          	<div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          PRODUIT
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <?php
						// Boucle pour afficher tout les noms des catégories présente sur la bdd
							foreach ($cat as $c) {
						 ?>
						 <a class="dropdown-item" id="drop_bouton"href="/D2D/pages/afficher_catgories.php?id_cat=<?php echo $c['id_cat'];?>"><?php echo $c['nom'];?></a>
						 <?php
						 } ?>
          </div>
        </div>
      </li>


 				<li class="nav-item">
 					<a class="nav-link" href="#">| </a>
 				</li>
 				<li class="nav-item">
 					<a class="nav-link" href="/D2D/pages/panier.php"> PANIER <?php echo $session_items; ?></a>
 				</li>

 				<?php

 				if(!empty($_SESSION['prenom'])){
 					echo '
 					<li class="nav-item">
 					<a class="nav-link" href="#">| </a>
 					</li>
 					<li class="nav-item">
 					<a class="nav-link" href="/D2D/pages/profil.php">PROFIL </a>
 					</li>';
 				}
 				else{
 					echo '<li class="nav-item">
 					<a class="nav-link" href="#">| </a>
 					</li>
 					<li class="nav-item">
 					<a class="nav-link" href="/D2D/pages/inscription.php">INSCRIPTION</a>
 					</li>';
 				}
 				?>

 				<?php

 				if(!empty($_SESSION['prenom'])){
 					echo '<li class="nav-item">
 					<a class="nav-link" href="#php">| </a>
 					</li>
 					<li class="nav-item">
 					<a class="nav-link" href="/D2D/includes/deconnexion.php">DECONNEXION <img id="off" src="/D2D/images/power.svg" alt="deco"></a>
 					</li>';
 				}
 				else{
 					echo '<li class="nav-item">
 					<a class="nav-link" href="#">| </a>
 					</li>
 					<li class="nav-item">
 					<a class="nav-link" href="/D2D/pages/connexion.php">CONNEXION </a>
 					</li>';
 				}
 				?>
 			</ul>
 		</div>
 	</div>

 </nav>
</body>
 </html>
