//Create variables here
var dog,happy_DogImg,dog_img;
var foodS,foodStock;
var database;
var block, block2, block3;


function preload()
{
  //load images here
  
  dog_img = loadImage("dogImg.png");
  happy_DogImg = loadImage("dogImg1.png");

}

function setup() {
  createCanvas(820,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(410,350);
  dog.addImage("dog",dog_img);
  dog.scale=0.20

  block = createSprite(320,370, 10, 200);
  block2 = createSprite(500,370, 10, 200);
  block3 = createSprite(410,270, 200, 10);

}


function draw() {  
  background("black")

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happy_DogImg);
    foodStock = foodStock - 1;
  }  

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(10)
  text("Food Remaining:" + foodS,300,130);
  text("NOTE:"+ "Πατήστε το πάνω βέλος για να ταΐσετε το γάλα στο χαριτωμένο μικρό σκυλάκι.",25,50);
  text("NOTE:"+ "Press up arrow to feed the milk to the cute little doggie.",25,80);

drawSprites()

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x = x - 1;
    }

    database.ref('/').update({
      Food:x,
    })
}
