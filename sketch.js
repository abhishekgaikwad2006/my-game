var player,playerImage;
var enemy1,enemy1Image;
var enemy2,enemy2Image;
var obstaclesGroup;
var backgroundImage;
var bullet,bulletImage;

function preload(){
playerImage=loadImage("Images/boy.png");
enemy1Image=loadImage("Images/rob1.png");
enemy2Image=loadImage("Images/rob2.png");
backgroundImage=loadImage("Images/bg.jpg");
bulletImage=loadImage("Images/bullet.png");
}

function setup(){
createCanvas(1200,500);
player=createSprite (120,350,50,50);
player.addImage(playerImage);
player.scale=0.5

bullet=createSprite (215,312,50,50);
bullet.addImage(bulletImage);
bullet.scale=0.11;


obstaclesGroup=new Group();
}

function draw(){
background(backgroundImage);
if(keyDown("space")){
bullet.velocityX=5
}
spawnObstacles();
drawSprites();
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1000,350,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;//(6 + 3*score/100);
    
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

