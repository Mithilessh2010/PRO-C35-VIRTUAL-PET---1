//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, dogHappyImg;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogHappyImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref("Food")
  foodStock.on("value", readStock);

}


function draw() {
  background(46, 139, 87)

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.y = 380;
    dog.addImage(dogHappyImg);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("Food Left : "+ foodS,190,100);
  text("Press 'UP Arrow' To Feed The Dog.",150,50);

}
function readStock(data) {
  foodS = data.val();
}

//defining writeStock(x)
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}