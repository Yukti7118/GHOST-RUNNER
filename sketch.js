var tower,towerImg;
var ghost,ghostImg;
var door,doorG,doorImg;
var backgroundSound;
var climber,climberImg,climberG;
var invisibleBlock,invisibleBG;
var gameState="PLAY";

function preload(){
towerImg=loadImage("tower.png");
ghostImg=loadImage("ghost-standing.png")
doorImg=loadImage("door.png");
backgroundSound=loadSound("spooky.wav");
climberImg=loadImage("climber.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  backgroundSound.loop();
  
 doorG = new Group();
  climberG=new Group();
  invisibleBG = new Group();
  
  tower=createSprite(300,200);
  tower.addImage("tower",towerImg);
  tower.velocityY=2;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  
  
}


function draw(){
  background("white");
  if(gameState === "PLAY")
{
    if(keyDown("left_Arrow"))
    {
      ghost.x=ghost.x-5;
    }
    if(keyDown("right_Arrow"))
    {
      ghost.x=ghost.x+5;
    }
    if(keyDown("space"))
    {
      ghost.velocityY=-10;
    }
    ghost.velocityY = ghost.velocityY + 0.8
  
  if(tower.y>400)
  {
    tower.y=200;
   }

  if(climberG.isTouching(ghost)|| invisibleBG.isTouching(ghost)||doorG.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.destroy();
    gameState="END";
  }
  
drawSprites();
  Spawndoors();
}
if(gameState==="END")
{ 
  background("black");
  fill("yellow");
  textSize(20);
  text("GAME OVER",200,200);
  
  
}}
function Spawndoors(){
  if (frameCount % 220 === 0) {
    var door = createSprite(600,120,40,10);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.scale = 0.5;
    door.velocityY= 2;
    
    var climber = createSprite(600,150,40,5);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.scale = 0.5;
    climber.velocityY=2;
    
    var invisibleGroup= createSprite(600,160,40,5);
    invisibleGroup.x= climber.x;
    invisibleGroup.velocityY=2;
    invisibleGroup.debug=true;
     //assign lifetime to the variable
    door.lifetime = 200;
    climber.lifetime=200;
    
    //adjust the depth
    door.depth = ghost.depth;
    climber.depth=ghost.depth;
    ghost.depth = ghost.depth + 1;
    ghost.depth=ghost.depth+1;
    
    
    //add each door to the group
    doorG.add(door);
    climberG.add(climber);
    invisibleBG.add(invisibleGroup);
  }



}
