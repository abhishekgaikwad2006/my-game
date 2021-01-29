var player,playerImage;
var enemy1,enemy1Image;
var enemy2,enemy2Image;
var enemy3,enemy3Image;
var obstaclesGroup;
var backgroundImage;
var bullet,bulletImage;
var gameState = 0;
var score1=0;
var player2,player2Image;
var score2=0;
var bullet2,bullet2Image,bullet2Group;
var form;
function preload(){
playerImage=loadImage("Images/boy.png");
player2Image=loadImage("Images/player2.png");
enemy1Image=loadImage("Images/zombie.png");
enemy2Image=loadImage("Images/zombie2.png");
enemy3Image=loadImage("Images/zombie3.png");
backgroundImage=loadImage("Images/forest[71].jpg");
bulletImage=loadImage("Images/bullet.png");
bullet2Image=loadImage("Images/bullet2.png");
}

function setup(){
createCanvas(1200,500);

bg=createSprite (600,250,50,50);
bg.addImage(backgroundImage);
bg.scale=0.7;
bg.velocityX=-2;

player=createSprite (240,340,50,50);
player.addImage(playerImage);
player.scale=0.5;

player2=createSprite (90,385,50,50);
player2.addImage(player2Image);
player2.scale=0.4;

bulletGroup=new Group();
bullet2Group=new Group();
obstaclesGroup=new Group();

form=new Form();
}

function draw(){
background("black");

if(gameState===0){
form.display();
}



if (gameState=== "PLAY"){

  if(bg.x<0){
    bg.x=600;
  }
 
  obstaclesGroup.velocityX = -6;  //(6 + 3*score/100);
  
  if(keyDown("space")) {
    createBullet2();
    bullet2.velocityX = 500;
  }
  if(keyDown("enter")) {
    createBullet();
    bullet.velocityX = 500;
  }
  if(keyDown("UP_Arrow")){
    player.y=player.y-5;
  }

  if(keyDown("DOWN_Arrow")){
    player.y=player.y+5;
  }
  if(keyDown("w")){
    player2.y=player2.y-5;
  }

  if(keyDown("s")){
    player2.y=player2.y+5;
  }
  
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bulletGroup)){
    obstaclesGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score1=score1+1;
 }
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bullet2Group)){
    obstaclesGroup.get(i).destroy();
    bullet2Group.destroyEach();
    score2=score2+1;
 }
}


spawnObstacles();

drawSprites();
textSize(20);
fill("white");
textFont("Comic Sans MS");
text("Player1 Score: "+ score1, 100,50);
text("Player2 Score: "+ score2, 600,50);
}


function spawnObstacles() {
  if(frameCount % 250 === 0) {
    var obstacle = createSprite(1000,350,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -8;//(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(enemy1Image);
              break;
      case 2: obstacle.addImage(enemy2Image);
              break;
              case 3: obstacle.addImage(enemy3Image);
              break;
              
      default: break;
    }


    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function createBullet (){
  bullet=createSprite (205,312,50,50);
  bullet.y=player2.y-60;
  bullet.addImage(bulletImage);
  bullet.scale=0.13;

  bulletGroup.add(bullet);
}
function createBullet2 (){
  bullet2=createSprite (330,312,50,50);
  bullet2.y=player.y-40;
  bullet2.addImage(bullet2Image);
  bullet2.scale=0.1;

  bullet2Group.add(bullet2);
}