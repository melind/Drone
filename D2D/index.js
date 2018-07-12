// ANMATION PAGE ADMIN.PHP
$("#form_product").hide();

$(document).ready(function(){
    $("#show_left").click(function(){
        $("#form_product").toggle();
    });
});

$("#form_rank").hide();

$(document).ready(function(){
    $("#show_right").click(function(){
        $("#form_rank").toggle();
    });
});


// ANIMATION INDEX.PHP
$(document).ready(function(){
    $("#panel_image").mouseover(function(){
        $(this).css("width", "90px");
        $(this).css("transition", "1s");
            });
});

$(document).ready(function(){
    $("#panel_image").mouseout(function(){
        $(this).css("width", "50px");
            });
});

function colorTwo() {
  $('#c').attr('selected','selected');
}




const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const city = document.getElementById("city");

let mouseX =0, mouseY=0;
let offsets = document.getElementById("myCanvas").getBoundingClientRect();
let ctop = offsets.top;
let cleft = offsets.left;

let mouseDown = false;
let mouseClicked = false;
let HP = 100;
let maxHP = 100;
let score = 0;
let level = 1;

let fireDelay = 6;
let fireCnt = 0;

let gameState = "mainMenu";

const mouseMove=function(e){
  mouseX = Math.floor(e.clientX-cleft);
  mouseY = Math.floor(e.clientY-ctop);
};

const _mouseDown = function(){ mouseDown=true; mouseClicked=false; };
const _mouseUp = function(){
  mouseDown=false;
  mouseClicked=true;
  setTimeout(()=>{ mouseClicked=false; },50);
};


const dist=function(x,y,x2,y2){
    return Math.sqrt(Math.pow(x2-x,2)+Math.pow(y2-y,2));
    };

const BD = {
  center: { x:Math.floor(canvas.width/2), y:Math.floor(canvas.height/2+20) },
  radius: (canvas.width/2)-30,
  beamAngle: 0.00,
};

const bullet = function(data){
  //console.log(data.angle);
  this.pos = data.pos || { x:BD.center.x, y:BD.center.y };
  this.angle = data.angle || 0.0;
  this.speed = data.speed || 1.0;
  this.radius = data.radius || 1;
  this.color = data.color || "#FFF";
  this.alive = true;

  if(typeof(this.update)!=="function") {
    bullet.prototype.update = function(){
      if(!this.alive){ return; }
      this.pos.x+= Math.sin(this.angle)*this.speed;
      this.pos.y+= Math.cos(this.angle)*this.speed;
      if(dist(this.pos.x,this.pos.y,BD.center.x,BD.center.y)>BD.radius){
        this.alive = false;
      }
    };
  }

  if(typeof(this.draw)!=="function") {
    bullet.prototype.draw = function(){
      if(!this.alive){ return; }
      ctx.beginPath();
      ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };
  }
};

const enemy = function(data){
  this.pos = data.pos || { x:0,y:0 };
  this.angle = data.angle || 0.0;
  this.radius = data.radius || 6;
  this.speed = data.speed || 1.0;
  this.colors = data.colors || ["#F88","#F00"];
  this.alive = true;
  this.swerve = false;
  this.swerveCnt = 0;

  if(typeof(this.update)!=="function") {
    enemy.prototype.update = function(){
      if(!this.alive){ return; }
      if(!this.swerve && dist(this.pos.x,this.pos.y,BD.center.x,BD.center.y)>50 && Math.random()<0.1){
        this.swerve=true;
        this.angle+=(Math.random()*0.8)-0.4;
      }
      if(this.swerve){
        this.swerveCnt++;
        if(this.swerveCnt>25){
          this.swerveCnt=0;
          this.swerve = false;
          this.angle = Math.atan2(BD.center.x-this.pos.x,BD.center.y-this.pos.y);
        }
      }
      this.pos.x+=Math.sin(this.angle)*this.speed;
      this.pos.y+=Math.cos(this.angle)*this.speed;
    };
  }

  if(typeof(this.draw)!=="function") {
    enemy.prototype.draw = function(){
    if(!this.alive){ return; }
    ctx.beginPath(); //Body
    ctx.arc(this.pos.x,this.pos.y,2,0,2*Math.PI);
    ctx.fillStyle = this.colors[0];
    ctx.fill();
    ctx.closePath();

    ctx.beginPath(); //Wings
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x+(Math.sin(this.angle+2.3)*(2*this.radius)),this.pos.y+(Math.cos(this.angle+2.3)*(2*this.radius)));
    ctx.strokeStyle = this.colors[1];
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath(); //Wings
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x+(Math.sin(this.angle-2.3)*(2*this.radius)),this.pos.y+(Math.cos(this.angle-2.3)*(2*this.radius)));
    ctx.strokeStyle = this.colors[1];
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath(); //Nose
    ctx.moveTo(this.pos.x-(Math.sin(this.angle)*this.radius),this.pos.y-(Math.cos(this.angle)*this.radius));
    ctx.lineTo(this.pos.x+(Math.sin(this.angle)*this.radius),this.pos.y+(Math.cos(this.angle)*this.radius));
    ctx.lineWidth = this.radius-1;
    ctx.strokeStyle = this.colors[0];
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath(); //Nose
    ctx.moveTo(this.pos.x-(Math.sin(this.angle)*this.radius),this.pos.y-(Math.cos(this.angle)*this.radius));
    ctx.lineTo(this.pos.x+(Math.sin(this.angle)*(this.radius+3)),this.pos.y+(Math.cos(this.angle)*(this.radius+3)) );
    ctx.lineWidth = this.radius/3;
    ctx.strokeStyle = this.colors[0];
    ctx.stroke();
    ctx.closePath();


  };
  }
};

const expl = function(data){
  this.pos = data.pos || { x:0,y:0 };
  this.alive = true;
  this.cnt = 0;
  this.radius = 2;
  this.maxRadius = data.maxRadius || 10;
  this.colorData = { r:255,g:141,b:121,a:1 };
  if(typeof(this.update)!=="function") {
    expl.prototype.update = function(){
    if(!this.alive){ return; }
    this.cnt++;
    const mod = Math.round(155/this.maxRadius);
    if(this.cnt<this.maxRadius){
      this.radius++;
      //this.colorData.r+=mod;
      //this.colorData.g+=mod;
      //this.colorData.b+=mod;
    }
    else{ this.radius--; this.colorData.a-=0.2; }
    if(this.radius<2){ this.alive=false; }
  };
  }

  if(typeof(this.draw)!=="function") {
    expl.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
    if(Math.random()<0.9){ ctx.fillStyle = "rgba("+this.colorData.r+","+ this.colorData.g+","+this.colorData.b+ ","+this.colorData.a+")"; }
     else { ctx.fillStyle = "rgba(255,255,255,1)"; }
    ctx.fill();
    ctx.closePath();
  };
  }
};

const checkCol = function(objA,objB){
  if(!objA.alive || !objB.alive){ return false; }
  if(dist(objA.pos.x,objA.pos.y,objB.pos.x,objB.pos.y)<=objA.radius+objB.radius){
    objA.alive = false;
    objB.alive = false;
    return true;
  }
  return false;
};

let bulletList = [];
let enemyList = [];
let explList = [];

let colorsList = [
  ["#F88","#F00"],
  ["#8F8","#0F0"],
  ["#88F","#00F"],
  ["#F8F","#F0F"],
  ["#AAA","#FFF"]
];

const initWave = function(data){
  let angle = 0.0,x=0.0,y=0.0,c=0;
  let cnt = data.waveList[data.curwave];
  for(let i=0;i<cnt;i++){
    angle = (Math.random()*(2*Math.PI))-Math.PI; // -PI to PI
    x = BD.center.x+(Math.sin(angle)*BD.radius);
    y = BD.center.y+(Math.cos(angle)*BD.radius);
    c = Math.floor(Math.random()*colorsList.length);
    enemyList.push(new enemy({
      pos:{ x:x, y:y },
      angle: Math.atan2(BD.center.x-x,BD.center.y-y),
      speed: data.speed+(Math.random()*data.speedVar),
      radius: data.radius,
      colors: colorsList[c]
    }));
  }
};

const levelData = [

  { //Level 1
    waveList: [ 8,10,15 ],
    curwave: 0,
    radius: 8,
    speed: 0.5,
    speedVar: 0.5
  },

  {//Level 2
    waveList: [ 15,15,20,20 ],
    curwave: 0,
    radius: 8,
    speed: 0.5,
    speedVar: 0.5
  },

  {//Level 3
    waveList: [ 30,35,40,40 ],
    curwave: 0,
    radius: 6,
    speed: 0.5,
    speedVar: 0.75
  },

    {//Level 4
    waveList: [ 50,55,65,65 ],
    curwave: 0,
    radius: 6,
    speed: 0.75,
    speedVar: 0.75
  },

  {//Level 5
    waveList: [ 70,70,80,100 ],
    curwave: 0,
    radius: 5,
    speed: 0.75,
    speedVar: 0.85
  },

  {//Level 6
    waveList: [ 100,100,100,100 ],
    curwave: 0,
    radius: 5,
    speed: 0.85,
    speedVar: 1
  },

    {//Level 7
    waveList: [ 150 ],
    curwave: 0,
    radius: 5,
    speed: 0.85,
    speedVar: 1
  },

  {//Level 8
    waveList: [ 250 ],
    curwave: 0,
    radius: 4,
    speed: 1,
    speedVar: 1
  },

];

const upgradeCost = [ 300,1750,5000,20000 ];
let upgradeLvl = 0;

let gunType = 0;

const fireGun = function(){
  let a = Math.atan2(mouseX-BD.center.x,mouseY-BD.center.y);
  let first ={};
  let sec = {};
  //console.log(gunType);
  switch(gunType){
    case 0:
      bulletList.push(new bullet({ angle:Math.atan2(mouseX-BD.center.x,mouseY-BD.center.y), radius:1, speed:4 }));
    break;
    case 1:
      bulletList.push(new bullet({ angle:Math.atan2(mouseX-BD.center.x,mouseY-BD.center.y), radius:2.5, speed:4 }));
    break;
    case 2:
      first = { x:BD.center.x+(Math.sin(a-1.56)*2), y:BD.center.y+(Math.cos(a-1.56)*2) }
      sec = { x:BD.center.x+(Math.sin(a+1.56)*2), y:BD.center.y+(Math.cos(a+1.56)*2) };
      bulletList.push(new bullet({ pos:first, angle:a, radius:1, speed:4 }));
      bulletList.push(new bullet({ pos:sec, angle:a, radius:1, speed:4 }));
    break;

    case 3:
      first = { x:BD.center.x+(Math.sin(a-1.56)*4), y:BD.center.y+(Math.cos(a-1.56)*2) }
      sec = { x:BD.center.x+(Math.sin(a+1.56)*4), y:BD.center.y+(Math.cos(a+1.56)*2) };
      bulletList.push(new bullet({ pos:first, angle:a+0.2, radius:2, speed:5 }));
      bulletList.push(new bullet({ angle:a, radius:2.5, speed:5 }));
      bulletList.push(new bullet({ pos:sec, angle:a-0.2, radius:2, speed:5 }));
    break;

    case 4:
      first = { x:BD.center.x+(Math.sin(a-1.56)*4), y:BD.center.y+(Math.cos(a-1.56)*2) }
      sec = { x:BD.center.x+(Math.sin(a+1.56)*4), y:BD.center.y+(Math.cos(a+1.56)*2) };
      bulletList.push(new bullet({ pos:first, angle:a+0.2, radius:2.5, speed:5 }));
      bulletList.push(new bullet({ angle:a, radius:5, speed:5 }));
      bulletList.push(new bullet({ angle:a-Math.PI, radius:2.5, speed:5 }));
      bulletList.push(new bullet({ pos:sec, angle:a-0.2, radius:2.5, speed:5 }));
    break;
  }
}

const checkWaveEnd = function(){
  return enemyList.length<1;
};

const drawMainMenu = function()
{
  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius,0,2*Math.PI);
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font="40px Georgia";
  ctx.fillStyle = "#050";
  ctx.textAlign = "center";
  ctx.fillText("Drone Invasion!",BD.center.x,BD.center.y-100);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="14px Georgia";
  ctx.fillText("Ver 0.5 - By: Josh S",BD.center.x,BD.center.y-70);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Start",BD.center.x,BD.center.y+100);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-30,BD.center.y+82,60,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();
};

const drawLevelDone = function()
{
    ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius,0,2*Math.PI);
  ctx.fillStyle = "rgba(155,155,255,0.25)";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font="40px Georgia";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.fillText("Level "+level+" Complete",BD.center.x,BD.center.y-70);
  ctx.closePath();

   ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Points: "+score,BD.center.x,BD.center.y);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Next",BD.center.x,BD.center.y+100);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-30,BD.center.y+82,60,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();

  if(upgradeLvl<upgradeCost.length){
  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Upgrade: "+upgradeCost[upgradeLvl],BD.center.x,BD.center.y+70);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-90,BD.center.y+52,180,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();
  }
};

const drawUpgradeMenu = function()
{
  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius,0,2*Math.PI);
  ctx.fillStyle = "rgba(155,155,255,0.25)";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font="40px Georgia";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.fillText("Upgrades:",BD.center.x,BD.center.y-70);
  ctx.closePath();

   ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Points: "+score,BD.center.x,BD.center.y-40);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("HP+10",BD.center.x,BD.center.y+10);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-30,BD.center.y+82,60,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("HP +10",BD.center.x,BD.center.y+10);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-40,BD.center.y+52,80,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();
};


const drawGameOver = function()
{
  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius,0,2*Math.PI);
  ctx.fillStyle = "rgba(255,155,155,0.15)";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.font="40px Georgia";
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.fillText("Game Over",BD.center.x,BD.center.y-70);
  ctx.closePath();

   ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Points: "+score,BD.center.x,BD.center.y);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillText("Menu",BD.center.x,BD.center.y+100);
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(BD.center.x-30,BD.center.y+82,60,24);
  ctx.strokeStyle = "#0F0";
  ctx.stroke();
  ctx.closePath();
};


const drawMain = function(){

  ctx.beginPath();
  ctx.rect(0,0,500,500);
  ctx.fillStyle= "rgba(30,30,30,0.25)";
  ctx.fill();
  ctx.closePath();

  //Background
  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius,0,2*Math.PI);
  ctx.fillStyle = "rgba(50,50,100,0.25)";
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 6;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,10,0,2*Math.PI);
  ctx.fillStyle = "#999";
  ctx.fill();
  ctx.closePath();

  //Overlay
  ctx.beginPath();
  ctx.moveTo(BD.center.x-(Math.cos(0)*BD.radius-5), BD.center.y-(Math.sin(0)*BD.radius-5));
  ctx.lineTo(BD.center.x+(Math.cos(0)*BD.radius-5),
             BD.center.y+(Math.sin(0)*BD.radius-5));
  ctx.strokeStyle = "rgba(0,200,0,0.25)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.moveTo(BD.center.x-(Math.cos(1.56)*BD.radius-5),
             BD.center.y-(Math.sin(1.56)*BD.radius-5));
  ctx.lineTo(BD.center.x+(Math.cos(1.56)*BD.radius-5),
             BD.center.y+(Math.sin(1.56)*BD.radius-5));
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(BD.center.x,BD.center.y,BD.radius/4,0,2*Math.PI);
  ctx.stroke();
  ctx.arc(BD.center.x,BD.center.y,BD.radius/2,0,2*Math.PI);
  ctx.stroke();
  ctx.arc(BD.center.x,BD.center.y,BD.radius/4*3,0,2*Math.PI);
  ctx.stroke();
  ctx.closePath();

  //beam
  ctx.beginPath();
  ctx.moveTo(BD.center.x,BD.center.y);
  ctx.lineTo(BD.center.x+(Math.cos(BD.beamAngle)*BD.radius),
             BD.center.y+(Math.sin(BD.beamAngle)*BD.radius));
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;
  BD.beamAngle+=0.02;
  if(BD.beamAngle>Math.PI){ BD.beamAngle=-Math.PI; }

  if(gameState==="inGame" || gameState==="upgrade"){
  ctx.beginPath();
  ctx.font="30px Georgia";
  ctx.fillStyle = "#050";
  ctx.textAlign = "center";
  ctx.fillText("HP: "+HP,440,480);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="30px Georgia";
  ctx.fillStyle = "#050";
  ctx.textAlign = "center";
  ctx.fillText("Level: "+level,440,40);
  ctx.closePath();

  ctx.beginPath();
  ctx.font="20px Georgia";
  ctx.fillStyle = "#050";
  ctx.textAlign = "left";
  ctx.fillText("Points: "+score,10,480);
  ctx.closePath();
  }
};

const blowUp = function(x,y){
   explList.push( new expl( { pos:{ x:x,y:y },maxRadius:(5+Math.random()*10) } ) );
    explList.push( new expl( { pos:{ x:x+5,y:y },maxRadius:(5+Math.random()*5) } ) );
    explList.push( new expl( { pos:{ x:x,y:y+5 },maxRadius:(5+Math.random()*5) } ) );
    explList.push( new expl( { pos:{ x:x+5,y:y+5 },maxRadius:(5+Math.random()*5) } ) );
}

const main = function(){
  //if(gameState==="mainMenuHold" && !mouseDown){ gameState="mainMenu"; }
  if(gameState==="mainMenu"){
    drawMain();
    drawMainMenu();
    if(mouseClicked && mouseX>BD.center.x-30 && mouseX<BD.center.x-30+60 && mouseY>BD.center.y+82 && mouseY<BD.center.y+82+24){
      mouseClicked=false;
      gameState="inGame";
    }
    return;
  }
  if(gameState==="gameOver"){
    if(mouseClicked && mouseX>BD.center.x-30 && mouseX<BD.center.x-30+60 && mouseY>BD.center.y+82 && mouseY<BD.center.y+82+24){
      mouseClicked = false;
      gameState="mainMenu";
      HP = 100;
      level = 1;
      score = 0;
      currentWave = 0;
      enemyList = [];
      bulletList = [];
      explList = [];
      upgradeLvl = 0;
      gunType = 0;
      fireDelay = 6;
    }
    drawMain();
    drawGameOver();
    return;
  }
  if(gameState==="nextLevel"){
    if(mouseClicked && mouseX>BD.center.x-30 && mouseX<BD.center.x-30+60 && mouseY>BD.center.y+82 && mouseY<BD.center.y+82+24){ //Start next level
      mouseClicked=false;
      levelData[level-1].curwave = 0;
      level++;
      initWave(levelData[level-1]);
      gameState="inGame";
    }
     if(mouseClicked && mouseX>BD.center.x-90 && mouseX<BD.center.x+90 && mouseY>BD.center.y+52 && mouseY<BD.center.y+52+24){ //Upgrade
       if(score>=upgradeCost[upgradeLvl]){
         score-=upgradeCost[upgradeLvl];
         upgradeLvl++;
         gunType++;
         if(upgradeLvl===2){ fireDelay=4; }
         else if(upgradeLvl===3){ fireDelat=3; }
       }
     }
    drawMain();
    drawLevelDone();
    return;
  }
  if(gameState==="inGame"){
  if(checkWaveEnd()){
      //initWave(waveList[currentWave]); currentWave++;
      levelData[level-1].curwave++;
      if(levelData[level-1].curwave>=levelData[level-1].waveList.length){
        mouseClicked = false;
        gameState="nextLevel";
        return;
      }
      initWave(levelData[level-1]);
    }

    fireCnt+=1;
    if(mouseDown && fireCnt>=fireDelay){
      fireCnt=0;
      fireGun();
      score-=upgradeLvl; //Bullet Cost
  }

    bulletList=bulletList.filter((cv)=>{
    cv.update();
    enemyList.forEach((e)=>{
      if(checkCol(cv,e)){
        blowUp(e.pos.x,e.pos.y);
        score+=2+(levelData[level-1].curwave*2)+(level*10);
      }
    });
    cv.draw();
    return cv.alive;
  });
    enemyList=enemyList.filter((cv)=>{
    cv.update();
    if(dist(cv.pos.x,cv.pos.y,BD.center.x,BD.center.y)<10){
      HP-=10;
      explList.push(new expl({ pos:{ x:cv.pos.x,y:cv.pos.y }, maxRadius:20 }));
      cv.alive = false;
    }
    cv.draw();
    return cv.alive;
  });
    explList=explList.filter((cv)=>{
    cv.update();
    cv.draw();
    return cv.alive;
  });
    if(HP<1){ gameState="gameOver"; mouseClicked=false; }
  }
  drawMain();

};

setInterval(main,50);
