const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var score=0
var bg;
var gameState = "onSling";
var sound1, sound2, sound3;
var birds=[], bird2,bird3,bird4;

function preload() {
    sound1 = loadSound("sounds/sounds/bird_flying.mp3")
    sound2 = loadSound("sounds/sounds/bird_select.mp3")
    sound3 = loadSound("sounds/sounds/pig_snort.mp3")
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150, 150);
    bird3 = new Bird(95, 150);
    bird4 = new Bird(40, 150);

    birds.push(bird4,bird3,bird2,bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if (bg)
        background(bg);

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
    bird2.display();
    bird3.display();
    bird4.display();
    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
    pig1.score();
    pig3.score();
    text("score: "+score, 900, 100);
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x: 5, y:-5});
        sound2.play();
        return false
    }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "launched";
    sound1.play();
    return false
}

function keyPressed(){
    if(keyCode === 32 && gameState=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x:200, y:50});
       slingshot.attach(birds[birds.length-1].body);
       sound2.play();
       gameState = "onSling";
    }
}

async function getTime()
{
    var response=await fetch("http://worldtimeapi.org/api/timezone/America/New_York") 
    var responsejson=await response.json()
    console.log(responsejson);
    var responseDT=responsejson.datetime
    console.log(responseDT);
    var hour=responseDT.slice(11,13);
    console.log(hour);

    if (hour>7 && hour<18)
    {
        bg=loadImage("sprites/bg.png");
        
    }
    else
    {
        bg=loadImage("sprites/bg2.jpg");
    }
}

