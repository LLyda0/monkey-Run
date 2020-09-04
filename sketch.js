
var invisGround, backGround;

var monkey, monk1;

var bananaImage, obstacleImage, backImage;

var foodGroup, obstaclesGroup;

var score=0;

function preload(){
  
  monk1 = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 300);
  
  backGround = createSprite(600,50,10,10);
  backGround.addImage("back", backImage);
  backGround.scale=1.2
  backGround.velocityX=-7;
  
  monkey = createSprite(80,230,20,50);
  monkey.addAnimation("Running_Monkey", monk1); 
  monkey.scale=0.12;
  
  invisGround = createSprite(300,270,600,5);
  invisGround.visible= false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(220);
  
  if(keyDown("space") && monkey.y>= 232){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  monkey.collide(invisGround);
  
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2;
  }
  
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
   }
  
  switch(score){
      
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
    case 50: monkey.scale=0.20;
      break;
    default: break;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    score=0; 
    monkey.scale=0.12;
  }
  
  fruit();
  obstacle();
  
  drawSprites();
  
   stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score, 500, 50);
  
}

function fruit() {
  if(frameCount % 80 === 0){
  var banana = createSprite(600,random(120,200),20,20);
  banana.addAnimation("Banana", bananaImage);
  banana.scale=0.05;
  banana.velocityX=-7;
  banana.lifetime=90;
  foodGroup.add(banana);
  }
}

function obstacle() {
  if(frameCount % 300 === 0){
  var stone = createSprite(600,240,20,20);
  stone.addImage("Stone",obstacleImage);
  stone.scale=0.15;
  stone.velocityX=-7;
  stone.lifetime=90;
  obstaclesGroup.add(stone);
  }
}