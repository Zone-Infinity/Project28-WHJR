
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint

var ground, tree, stone;
var groundImage, treeImage, boyImage, stoneImage;

function preload()
{
	boyImage = loadImage("sprites/boy.png");
	treeImage = loadImage("sprites/tree.png");
}

function setup() {
	createCanvas(700, 400);

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = Bodies.rectangle(350, 395, 700, 10, {isStatic:true});
	tree = Bodies.rectangle(550, 200, 250, 375)
	stone = new Stone(100, 300, 20, 20);

	sling = new Sling(stone.body, {x: 100, y: 300});

	mango1 = new Mango(480, 130);
	mango2 = new Mango(530, 60);
	mango3 = new Mango(550, 100);
	mango4 = new Mango(580, 140);
	mango5 = new Mango(630, 135);

	World.add(world, ground);
	Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  imageMode(CENTER);
  Engine.update(engine);
  background("white");
  
  image(boyImage, 150, 340 , 150, 200);
  rect(ground.position.x, ground.position.y, 700, 10);
  image(treeImage, tree.position.x, tree.position.y, 250, 375);

  stone.display();
  sling.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);

  drawSprites();
  text(mouseX+" "+mouseY, 600, 30)
}

function mouseDragged(){
	Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
	sling.fly();
}

function keyPressed(){
	if(keyCode == 32){
		Matter.Body.setPosition(stone.body, {x:100, y:300});
		sling.attach(stone.body);
	}
}

function detectCollision(lstone, lmango){
	stonePos = lstone.body.position;
	mangoPos = lmango.body.position;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y)
	if(distance <= lmango.radius + lstone.width){
		Matter.Body.setStatic(lmango.body, false);
	}
}
