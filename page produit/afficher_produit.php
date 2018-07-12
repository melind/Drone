<?php
session_start();
include('../includes/navbar.php');
include('../includes/includes.php');

// $id = mysqli_real_escape_string($DB, $_GET["id"]);


$afficherDrone = $DB->query("SELECT * FROM product  WHERE id_drone ='" . $_GET["id"] . "'");
$afficherDrone = $afficherDrone->fetchAll();

foreach ($afficherDrone as $ad) {

}

 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	<link rel="stylesheet" href="../index.css">
	<title>Description</title>
</head>
<body>
	<img src="../images/logo.png" id="logo" alt="">

  <div class="card cardf">
    <div class="card-body cb">
      <div class="tinypictures">
        <div class="tiny"><img id="tinyu" src="<?= $ad['image'] ?>" alt="drone"></div>
        <div class="tiny"><img id="tinyd" src="<?= $ad['image2'] ?>" alt="drone"></div>
        <div class="tiny"><img id="tinyt" src="<?= $ad['image3'] ?>" alt="drone"></div>
        <div class="tiny"><img  id="tinyq" src="<?= $ad['image4'] ?>" alt="drone"></div>
    <?php if($ad['id_drone']== 11) {
      echo '<div class="tiny"><img id="tinyc"src="'.$ad['image5'].'"/></div>';
    }
    else {
      echo '';
    }
    ?>
      </div>
      <div class="bigpicture">
        <img  id="bigpicture"  src="<?= $ad['image'] ?>"   alt="drone">
      </div>
    <div class="comment">
    <img class="dronelogo" src="<?= $ad['logo'] ?>" alt="logo_drone"></br></br>
    <h4 class="card-title nom"><?= $ad['nom_drone'] ?></h4></br>
      <?php
        if($ad['id_drone']== 11) {
          echo
            '<div class="select">
              <div class="form-check form-check-inline">
                <input class="form-check-input" onclick="colorOne()";
                type="checkbox" id="inlineCheckbox1" value="option1" >
                <label class="form-check-label" for="inlineCheckbox1">blanc</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorTwo()";
              type="checkbox" id="inlineCheckbox2" value="option2">
              <label class="form-check-label" for="inlineCheckbox2">bleu</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorThree()";
              type="checkbox" id="inlineCheckbox3" value="option3">
              <label class="form-check-label" for="inlineCheckbox3">rouge</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorFour()";
              type="checkbox" id="inlineCheckbox3" value="option4">
              <label class="form-check-label" for="inlineCheckbox3">vert</label>
           </div>
           <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorFive()";
              type="checkbox" id="inlineCheckbox3" value="option5">
              <label class="form-check-label" for="inlineCheckbox3">jaune</label>
           </div>
          </div>' ;
    }
     else if($ad['id_drone']== 13) {
        echo
        '<div class="select">
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorOne()";
              type="checkbox" id="inlineCheckbox1" value="option1">
              <label class="form-check-label" for="inlineCheckbox1">orange</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorTwo()";
              type="checkbox" id="inlineCheckbox2" value="option2">
              <label class="form-check-label" for="inlineCheckbox2">bleu</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorThree()";
              type="checkbox" id="inlineCheckbox3" value="option3">
              <label class="form-check-label" for="inlineCheckbox3">rose</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" onclick="colorFour()";
              type="checkbox" id="inlineCheckbox3" value="option4">
              <label class="form-check-label" for="inlineCheckbox3">vert</label>
            </div>
        </div>' ;
    }
    else{
      echo '';
    }
  ?>
          Prix : <?= $ad['prix'] ?> € </br>
          </br><input type="text" name="quantite" value="1" size="2" />
          <input type="submit" value="Ajouter" class="btn" />
    </br></br>
    <p><?= $ad['description'] ?></p>

    </div>
   </div>
  </div>

  <div class="carac">  Caractéristiques: </br><?php  echo $ad['caracteristiques']?></div>

  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  <script type="text/javascript" >
  <?php $afficherDrone = $DB->query("SELECT * FROM product  WHERE id_drone ='" . $_GET["id"] . "'");
  $afficherDrone = $afficherDrone->fetchAll();

  foreach ($afficherDrone as $ad) {

  }

   ?>
   $("#tinyu").hover(
      function () {
        $('#bigpicture').attr('src', '<?= $ad['image'] ?>');//change la source de l'image
      }
   );
  $("#tinyd").hover(
     function () {
       $('#bigpicture').attr('src', '<?= $ad['image2'] ?>');
     }
  );
  $("#tinyt").hover(
     function () {
       $('#bigpicture').attr('src', '<?= $ad['image3'] ?>');
     }
  );
  $("#tinyq").hover(
     function () {
       $('#bigpicture').attr('src', '<?= $ad['image4'] ?>');
     }
  );
  $("#tinyc").hover(
     function () {
       $('#bigpicture').attr('src', '<?= $ad['image5'] ?>');
     }
  );
  function colorOne() {
    $('#bigpicture').attr('src', '<?= $ad['image'] ?>');
  }
  function colorTwo() {
    $('#bigpicture').attr('src', '<?= $ad['image2'] ?>');
  }
  function colorThree() {
    $('#bigpicture').attr('src', '<?= $ad['image3'] ?>');
  }
  function colorFour() {
    $('#bigpicture').attr('src', '<?= $ad['image4'] ?>');
  }
  function colorFive() {
    $('#bigpicture').attr('src', '<?= $ad['image5'] ?>');
  }
</script>
</body>
</html>
