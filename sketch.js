var player,playerImage;
var enemy1,enemy1Image;
var enemy2,enemy2Image;
var obstaclesGroup;
var backgroundImage;
var bullet,bulletImage;
var gameState = "PLAY";
var score=0;

function preload(){
playerImage=loadImage("Images/boy.png");
enemy1Image=loadImage("Images/rob1.png");
enemy2Image=loadImage("Images/zombie.jpeg");
backgroundImage=loadImage("Images/forest[71].jpg");
bulletImage=loadImage("Images/bullet.png");
}

function setup(){
createCanvas(1200,500);

bg=createSprite (600,250,50,50);
bg.addImage(backgroundImage);
bg.scale=0.7;
bg.velocityX=-2;

player=createSprite (120,350,50,50);
player.addImage(playerImage);
player.scale=0.5

bulletGroup=new Group();
obstaclesGroup=new Group();
}

function draw(){
background("black");

if(bg.x<200){
  bg.x=bg.width/2;
}
if (gameState=== "PLAY"){
 
  obstaclesGroup.velocityX = -(6 + 3*score/100);
  
  if(keyDown("space")) {
    createBullet();
    bullet.velocityX = 25;
  }

  if(keyDown("UP_Arrow")){
    player.y=player.y-5;
  }

  if(keyDown("DOWN_Arrow")){
    player.y=player.y+5;
  }
  
}
for(var i=0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(bulletGroup)){
    obstaclesGroup.get(i).destroy();
    bulletGroup.destroyEach();
    score=score+1;
 }
}
 


spawnObstacles();
drawSprites();
text("Score: "+ score, 500,50);

}


function spawnObstacles() {
  if(frameCount % 250 === 0) {
    var obstacle = createSprite(1000,350,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -8;//(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(enemy1Image);
              break;
      case 2: obstacle.addImage(enemy2Image);
              break;
    
      default: break;
    }


    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function createBullet (){
  bullet=createSprite (215,312,50,50);
  bullet.addImage(bulletImage);
  bullet.scale=0.11;

  bulletGroup.add(bullet);
}
