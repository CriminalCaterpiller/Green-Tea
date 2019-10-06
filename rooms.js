resetLevel = function(){
//createRoom("level " + level);
}

nextLevel = function(){
level++;
createRoom("level " + level);
}

createRoom = function(name){
blank = true;
if (room != undefined &&
    room.name != name && 
    name != "Green Tea"){
winSound.volume = volume;
winSound.play();
}
room = undefined;
tr = {name:name,text:name,playerEntity:new Entity(),
player:createPlayer(0,0),
entitys:[],walls:[],
update:function(){},blocks:[]}
tr.timer = 40;
tr.blood = new Array(20);
tr.bloodIndex = 0;
tr.createBlood = function(obj){
if (this.blood[this.bloodIndex] == undefined){
this.blood[this.bloodIndex] = {
x:obj.x-10,y:obj.y-10,w:20,h:20};
b = this.blood.length+1;
}
this.bloodIndex++;
}
tr.bombs = [];
tr.showText = function(){
if (wpress||spress||spacepress)
this.interacted = true;
if(this.interacted && this.timer>0) this.timer--;
if (this.timer <= 0) this.text = "";
}
if (name == "Green Tea"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 110; tr.player.y -= 110;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rock = createRock(160,54);  
tr.rock.size = 1.1;
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(200,54);
tr.rockets = [createRocket(120,50)];
tr.stones = [
createStone(145,30),createStone(145,95),
createStone(20,30),createStone(20,90)
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rock,
tr.exit,tr.stones[0],
tr.stones[1],tr.stones[2],tr.stones[3],
tr.rockets[0]
];
tr.blocks = [
{x:3,y:3,w:243,h:18},
{x:3,y:3,w:13,h:103},
{x:3,y:103,w:153,h:13},
{x:153,y:63,w:13,h:103},
{x:153,y:3,w:13,h:43},
{x:153,y:103,w:143,h:13},
{x:233,y:3,w:13,h:143}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.exit.update(this);
this.rock.update(this);
this.bomb.update(this,[this.rock]);
this.player.update(this);
collideRect(this.player,this.rock);
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {this.player.dead=false; createRoom("Green Tea");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
} 
else if (name == "level 1"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 110; tr.player.y -= 110;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(165,54),
createRock(145,54),
createRock(112,110),  
]
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(200,54);
tr.rockets = [createRocket(120,50),
createRocket(112,122),createRocket(112,142)];
tr.stones = [
createStone(98,110),createStone(126,110)
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.exit,tr.stones[0],tr.stones[1],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:3,w:243,h:18},
{x:3,y:3,w:13,h:193},
{x:3,y:153,w:203,h:13},
{x:3,y:93,w:90,h:108},
{x:130,y:93,w:100,h:108},
{x:143,y:63,w:33,h:193},
{x:143,y:3,w:33,h:43},
{x:153,y:103,w:143,h:13},
{x:233,y:3,w:13,h:193}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],tr.rocks[2]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 1");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 2"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=120; tr.player.y=125;
cameraA -= Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(165,554),
createRock(145,554)
];
tr.enemys = [
createCenturion(62,60)
];
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(40,60);
tr.rockets = [createRocket(120,110),
createRocket(512,122),createRocket(512,142)];
tr.stones = [
createStone(298,110),createStone(1226,110)
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.exit,tr.stones[0],tr.stones[1],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:3,w:143,h:18},
{x:3,y:3,w:13,h:193},
{x:3,y:83,w:103,h:403},
{x:3,y:153,w:153,h:13},
{x:133,y:3,w:13,h:193}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.exit,tr.stones[0],tr.stones[1],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],this.enemys[0]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 2");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 3"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=120; tr.player.y=25;
cameraA += Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(90,565),createRock(90,535),
createRock(70,565),createRock(70,535)
];
tr.enemys = [
createCenturion(62,60)
];
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(40,60);
tr.rockets = [createRocket(120,120),
createRocket(512,122),createRocket(512,142)];
tr.stones = [
createStone(90,75),createStone(90,40),
createStone(75,75),createStone(75,40)
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.exit,tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:-23,w:88,h:55},
{x:3,y:-20,w:143,h:5},
{x:3,y:-23,w:13,h:193},
{x:3,y:83,w:88,h:403},
{x:3,y:153,w:153,h:13},
{x:133,y:-23,w:13,h:193}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.exit,tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],this.enemys[0]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 3");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 4"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=40; tr.player.y=45;
//cameraA += Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(90,565),createRock(90,535),
createRock(70,565),createRock(70,535)
];
tr.enemys = [
createCenturion(105,30),
createCenturion(90,85),
createCenturion(75,30),
];
tr.enemys[1].a = Math.PI/2;
tr.enemys[0].a = -Math.PI/2;
tr.enemys[2].a = -Math.PI/2;
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(180,60);
tr.rockets = [createRocket(30,85),
createRocket(512,122),createRocket(512,142)];
tr.stones = [
createStone(105,75),createStone(105,45),
createStone(90,75),createStone(90,45),
createStone(75,75),createStone(75,45),
createStone(60,75),createStone(60,45),
createStone(60,90),createStone(60,30)
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.enemys[1].fires[0],tr.enemys[1].fires[1],tr.enemys[1].fires[2],
tr.enemys[1].fires[3],tr.enemys[1].fires[4],tr.enemys[1].fires[5],
tr.enemys[1].fires[6],tr.enemys[1].fires[7],tr.enemys[1].fires[8],
tr.enemys[1].fires[9],
tr.enemys[2].fires[0],tr.enemys[2].fires[1],tr.enemys[2].fires[2],
tr.enemys[2].fires[3],tr.enemys[2].fires[4],tr.enemys[2].fires[5],
tr.enemys[2].fires[6],tr.enemys[2].fires[7],tr.enemys[2].fires[8],
tr.enemys[2].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:3,w:253,h:19},
{x:3,y:3,w:3,h:193},
{x:3,y:96,w:253,h:13},
{x:203,y:3,w:13,h:193}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.enemys[1].fires[0],tr.enemys[1].fires[1],tr.enemys[1].fires[2],
tr.enemys[1].fires[3],tr.enemys[1].fires[4],tr.enemys[1].fires[5],
tr.enemys[1].fires[6],tr.enemys[1].fires[7],tr.enemys[1].fires[8],
tr.enemys[1].fires[9],
tr.enemys[2].fires[0],tr.enemys[2].fires[1],tr.enemys[2].fires[2],
tr.enemys[2].fires[3],tr.enemys[2].fires[4],tr.enemys[2].fires[5],
tr.enemys[2].fires[6],tr.enemys[2].fires[7],tr.enemys[2].fires[8],
tr.enemys[2].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
this.enemys[1].hit(this.player);
this.enemys[2].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.enemys[1].update(this);
this.enemys[2].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],this.rocks[2],
this.enemys[0],this.enemys[1],this.enemys[2]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 4");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 5"){
tr.interacted = false;
cameraA = Math.PI/2+.01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=75; tr.player.y=30;
//cameraA += Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(90,565),createRock(90,535),
createRock(70,565),createRock(70,535)
];
tr.enemys = [
createCenturion(120,60),
];
tr.enemys[0].a = 0;
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(160,60);
tr.rockets = [createRocket(15,80),
createRocket(512,122),createRocket(512,142)];
tr.stones = [
createStone(120,75),createStone(120,45),
createStone(105,75),createStone(105,45),
createStone(90,75),createStone(90,45),
createStone(60,75),createStone(60,45),
createStone(45,75),createStone(45,45),
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:-23,w:253,h:3},
{x:3,y:-23,w:40,h:62},
{x:98,y:-23,w:130,h:62},
{x:3,y:3,w:3,h:193},
{x:3,y:82,w:253,h:13},
{x:173,y:3,w:13,h:193},
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],
this.enemys[0]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 5");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 6"){
tr.interacted = false;
cameraA = Math.PI/2+.01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=75; tr.player.y=20;
//cameraA += Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(110,45),createRock(110,60),
createRock(110,75),createRock(2110,535)
];
tr.enemys = [
createCenturion(10,60),
];
tr.enemys[0].a = Math.PI;
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(160,60);
tr.rockets = [createRocket(-13,60),
createRocket(512,122),createRocket(512,142)];
tr.stones = [
createStone(45,75),createStone(30,45),
createStone(15,75),createStone(60,45),

createStone(950,75),createStone(590,45),
createStone(560,75),createStone(560,45),
createStone(545,75),createStone(545,45),
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:-33,y:-23,w:253,h:3},
{x:-33,y:-23,w:88,h:62},
{x:118,y:-23,w:130,h:62},
{x:-33,y:3,w:3,h:193},
{x:-33,y:82,w:253,h:13},
{x:173,y:3,w:13,h:193},
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],this.rocks[2],
this.enemys[0]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 6");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 7"){
tr.interacted = false;
cameraA = .01;
tr.player = createPlayer();
tr.player.x -= 110; tr.player.y -= 110;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(140,34),
createRock(125,34),
createRock(110,34),  
];
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(200,33);
tr.rockets = [createRocket(120,80),
createRocket(1212,122),createRocket(1212,142)];
tr.stones = [
createStone(140,45),createStone(125,45),createStone(110,45),
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.exit,tr.stones[0],tr.stones[1],tr.stones[2],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:3,y:3,w:253,h:18},
{x:3,y:3,w:13,h:193},
{x:3,y:123,w:290,h:108},
{x:143,y:43,w:1233,h:193},
{x:233,y:3,w:13,h:193}
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],tr.rocks[2]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 7");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
else if (name == "level 8"){
tr.interacted = false;
cameraA = Math.PI/2+.01;
tr.player = createPlayer();
tr.player.x -= 60; tr.player.y -= 110;
tr.player.x=75; tr.player.y=20;
//cameraA += Math.PI/2;
tr.playerEntity = new Entity();
tr.playerEntity.img.src="player.png";
tr.rocks = [
createRock(110,45),createRock(110,60),
createRock(110,75),
createRock(20,60),
createRock(50,60)
];
tr.enemys = [
createCenturion(140,60),
];
tr.enemys[0].a = 0;
tr.bomb = createBomb(Infinity,50);
tr.exit = createExit(0,60);
tr.rockets = [createRocket(65,0),
createRocket(142,75),createRocket(142,45)];
tr.stones = [
createStone(645,75),createStone(630,45),
createStone(615,75),createStone(660,45),

createStone(950,75),createStone(590,45),
createStone(560,75),createStone(560,45),
createStone(545,75),createStone(545,45),
];
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.rocks[3],tr.rocks[4],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
tr.blocks = [
{x:-33,y:-23,w:253,h:3},
{x:-33,y:-23,w:88,h:74},
{x:-33,y:68,w:88,h:62},
{x:118,y:-23,w:130,h:62},
{x:-33,y:3,w:3,h:193},
{x:-33,y:82,w:253,h:13},
{x:173,y:3,w:13,h:193},
];
tr.holes = [
//{x:70,y:70,w:20,h:20}
];
createWalls(tr);
tr.update = function(){	
tr.entitys = [
tr.playerEntity,tr.bomb,tr.rocks[0],tr.rocks[1],tr.rocks[2],
tr.rocks[3],tr.rocks[4],
tr.enemys[0],tr.enemys[1],tr.enemys[2],tr.exit,
tr.stones[0],tr.stones[1],tr.stones[2],tr.stones[3],
tr.stones[4],tr.stones[5],tr.stones[6],tr.stones[7],
tr.stones[8],tr.stones[9],
tr.enemys[0].fires[0],tr.enemys[0].fires[1],tr.enemys[0].fires[2],
tr.enemys[0].fires[3],tr.enemys[0].fires[4],tr.enemys[0].fires[5],
tr.enemys[0].fires[6],tr.enemys[0].fires[7],tr.enemys[0].fires[8],
tr.enemys[0].fires[9],
tr.rockets[0],tr.rockets[1],tr.rockets[2]
];
this.enemys[0].hit(this.player);
//this.enemys[0].fires[0].x=80;
//this.enemys[0].fires[0].y=80;
for (m=0; m<this.rockets.length; m++){
this.rockets[m].f+=.2; if (this.rockets[m].f>=2) this.rockets[m].f=0; 
this.rockets[m].imgX=Math.floor(this.rockets[m].f)*64;
if (hitTestRect(this.player,this.rockets[m]) && !this.rockets[m].dead){
this.rockets[m].dead = true; this.player.missles++;
this.rockets[m].imgY = 64; pickupSound.play();
}
}
this.bombs = [this.bomb];
this.showText();
if (spacepress && !spacewaspress && 
this.player.missles>0 && this.bomb.x == Infinity){
this.player.missles--;
this.bomb = createBomb(this.player.x,this.player.y);
this.bomb.xVel = Math.cos(cameraA)*2; this.bomb.yVel= Math.sin(cameraA)*2;
this.bomb.x+=this.bomb.xVel*5; this.bomb.y+=this.bomb.yVel*5;
this.entitys[1] = this.bomb;
}
this.enemys[0].update(this);
this.exit.update(this);
this.bomb.update(this,[this.rocks[0],this.rocks[1],this.rocks[2],
tr.rocks[3],tr.rocks[4],
this.enemys[0]]);
this.player.update(this);
for (r=0; r<this.rocks.length; r++){
collideRect(this.player,this.rocks[r]);
this.rocks[r].update(this);
}
for (b=0; b<this.stones.length; b++) collideRect(this.player,this.stones[b]);
if (rpress && !rwaspress) this.player.dead = true; rwaspress=rpress;
if (this.player.dead) {
this.player.dead=false; createRoom("level 8");}
if (hitTestRect(this.player,this.exit)) nextLevel();
}
}
room = tr;
wpress=false; spress=false; apress=false; dpress=false; rpress=false;
for (faxzc=0; faxzc<50; faxzc++) room.update();
blank = true;
}