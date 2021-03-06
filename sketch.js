var Naruto;
var NarutoIMG;
var staticNaruto;
var Sasuke;
var SasukeIMG;
var staticSasuke;
var scene;
var backgroundIMG;
var backgroundIMG2;
var rock;
var rockIMG;
var invisibleGround;
var score;
var ObstacleGroup;
var gameState;

function preload() {
  NarutoIMG = loadAnimation("images/Naruto/Naruto_P1.png","images/Naruto/Naruto_P2.png","images/Naruto/Naruto_P3.png","images/Naruto/Naruto_P4.png","images/Naruto/Naruto_P5.png",);
  staticNaruto = loadAnimation("images/Naruto/Naruto_P5.png")
  SasukeIMG = loadAnimation("images/Sasuke/Sasuke_P1.png","images/Sasuke/Sasuke_P2.png","images/Sasuke/Sasuke_P1.png","images/Sasuke/Sasuke_P2.png",);
  staticSasuke = loadAnimation("images/Sasuke/Sasuke_P1.png");
  backgroundIMG = loadImage("images/Naruto_Background.png");
  backgroundIMG2 = loadImage("images/Naruto_Background_2.png");
  rockIMG = loadImage("images/rock.png");
}

function setup() {
  createCanvas(1200,600);
  ground = createSprite(300, height/2, width, height);
  ground.addImage("bg1",backgroundIMG);
  ground.addImage("bg2",backgroundIMG2);
  //ground.addImage(backgroundIMG2);
  ground.scale = 2.4;
  ground.velocityX = 3

  Naruto = createSprite(400,430,20,20)
  Naruto.addAnimation("Naruto", NarutoIMG);
  Naruto.addAnimation("staticNaruto", staticNaruto);
  Naruto.scale = 0.6;
  Naruto.velocityY += 0.5;
  Naruto.setCollider("rectangle", 0, -50, Naruto.width/2, Naruto.height - 250);
  //Naruto.debug = true;

  Sasuke = createSprite(1050,430,20,20)
  Sasuke.addAnimation("Sasuke", SasukeIMG);
  Sasuke.addAnimation("staticSasuke", staticSasuke)
  Sasuke.scale = 0.65;
  Sasuke.setCollider("rectangle", 0, -200, Sasuke.width/2, SasukeIMG.height);
  //Sasuke.debug = true;

  invisibleGround = createSprite(600,590,1200,150)
  invisibleGround.visible = false;
  //invisibleGround.debug = true;

  ObstacleGroup = new Group();

  score = 0;

  gameState = "play";
}

function draw() {
  background(0,0,0);

  if(gameState === "play"){
  spawnRocks();
  
    if(ground.x > width){
      ground.x = ground.width/2;
    }
  
    if(Naruto.isTouching(ObstacleGroup)){
      gameState = "end";
    }

    if(frameCount%5 === 0){
      score++;
    }

    if(score > 5){
      ground.changeImage("bg2",backgroundIMG2)
      ground.scale = 0.95;
      if(ground.x < 0){
        ground.x = 200;
      }
      ground.y = -700;
      console.log(ground.y);
    }

    if(Naruto.y<350){
      Naruto.changeAnimation("staticNaruto",staticNaruto);
    }

    else{
      Naruto.changeAnimation("Naruto",NarutoIMG);
    }

    if(Naruto.y<10){
      Naruto.y = 100;
    }

    Naruto.velocityY = Naruto.velocityY + 1;

    if(Sasuke.isTouching(ObstacleGroup)){
      Sasuke.velocityY = -20;
    }

    Sasuke.velocityY = Sasuke.velocityY + 1;
}

else if(gameState === "end"){
  ObstacleGroup.setVelocityXEach(0);
  ground.velocityX = 0;
  Naruto.changeAnimation("staticNaruto", staticNaruto);
  Sasuke.velocityX = -5;
  if(Sasuke.isTouching(Naruto)){
    Sasuke.changeAnimation("staticSasuke", staticSasuke);
    Sasuke.velocityX = 0
  }
}



Naruto.collide(invisibleGround);

Sasuke.collide(invisibleGround);

drawSprites();

textSize(18);

fill("orange");

text("Score: " + score, 1050, 50)
}

function spawnRocks() {
  if (frameCount % Math.round(random(300,400)) === 0){
    rock = createSprite(0,420,20,20);
    rock.addImage(rockIMG);
    rock.velocityX = 3;
    rock.scale = 0.5;
    //rock.depth = Naruto.depth;
    //Naruto.depth++;
    //Sasuke.depth++;
    ObstacleGroup.add(rock);
    //rock.debug = true;
  }
}

function keyPressed(){
  if((keyCode === 32 || keyCode === UP_ARROW || keyCode === 119) && gameState === "play" && Naruto.y>0){
    Naruto.velocityY = -20;
    //Naruto.changeAnimation("staticNaruto", staticNaruto);
  }
}

function keyReleased(){
  if((keyCode === 32 || keyCode === UP_ARROW || keyCode === 119) && gameState === "play"){
    //Naruto.velocityY = 4;
    //Naruto.changeAnimation("Naruto", NarutoIMG);
  }
}
