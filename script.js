var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d') ; //draw 2d;
var width = canvas.width ;
var height = canvas.height ;

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x,y,color,lastmove, action, type,exists){    //class Shape
	this.x=x;
	this.y=y;
	this.color= color;
	this.lastmove= lastmove; // 4 moves equal 1-4; 1 up, 2 down, 3 right, 4 left, => use to control verloxity of bullet
	this.action = action; // 0 mean no action, 1 = fire
	this.type = type; // type = 1 => player, type = 2 =>  AI, type = 3 block, type = 4 => river, type = 5 => forest, type = 6 => EGO, type = 7 => player bullet, type = 8 => AI bullet
	this.exists=exists; // false mean death, true mean "well, it alive"
};
function Bullet(x,y, color, lastmove,type, exist){ // class bullet
	Shape.call(this,x,y,color,lastmove,type, exist);

}

Bullet.prototype.constructor = Bullet;

Bullet.prototype.draw = function(){
	ctx.beginPath();
	
	ctx.fillStyle= this.color; 
	ctx.arc(this.x, this.y, 25, 0, 2*Math.PI);
	ctx.fill();
};

function Block(x,y,type,exist){ // class Block
	Shape.call(this,x,y,color,lastmove,type,exist);
}
Block.prototype.constructor = Block;

Block.prototype.draw= function(){
	ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.fillRect(x,y,50,50);

} 

function River(x,y,type,exist){   //class River
	Shape.call(this,x,y,color,lastmove,type,exist);
}
River.prototype.constructor = Block;

River.prototype.draw= function(){
	ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.fillRect(x,y,50,50);

} 

function Forest(x,y,type,exist){   //class FOREST
	var Fcolor = 'rgba(0,200,0,1)';
	Shape.call(this,x,y,Fcolor,lastmove,type,exist);
}
Forest.prototype.constructor = Block;

Forest.prototype.draw= function(){
	ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.fillRect(x,y,50,50);

} 

function TankAI(x,y, lastmove,action ,type, exist){ // class Tank
	Shape.call(this,x,y,lastmove, action, type, exist);
}

TankAI.prototype.constructor = TankAI;
TankAI.prototype.update=function(){ var i};

TankAI.prototype.draw=function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(x,y,50,50);
};
function TankPlayer(x,y,lastmove,action, type, exist){
	var color  = 'rgba(0,150,200,1)';
	Shape.call(this, x,y,color, lastmove, action, type, exist);
}

TankPlayer.prototype.draw=function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x - 50,this.y -50,50,50);
	//this.lastmove = 0;
}
TankPlayer.prototype.setControl=function(){
	var _this=this;

	window.onkeydown=function(e){
		if(e.keyCode===65 || e.keyCode===37){
			_this.lastmove=4;		} 
		else if(e.keyCode===68 || e.keyCode===39){
			_this.lastmove=3;
		}
		else if(e.keyCode===87 || e.keyCode===38){
			_this.lastmove=2;
		}
		else if(e.keyCode===83 || e.keyCode===40){
			_this.lastmove=1;
		}
		else if( e.keyCode === 32){
			_this.action=1;
		}
	}
}	
TankPlayer.prototype.update=function(){
	if(this.lastmove ===1 && this.y <= height-50){
		
		this.y +=  50;
	}
	if(this.lastmove ===2 && this.y > 50){
		this.y -= 50;
	}
	if(this.lastmove === 3 && this.x <= width-50 ){
		this.x += 50;
	}
	if(this. lastmove === 4 && this.x > 50){
		this.x -= 50;
	}
	

}		
var Player = new TankPlayer(width/2,height,0, 0, 1, true);
var tanks=[];
var tankAi;
var bullets=[];
var fps = 15;
var j = 0;
Player.setControl();

function loop(){
	setTimeout(function(){
		requestAnimationFrame(loop);
		
		ctx.fillStyle='rgba(0,0,0,1)';
		ctx.fillRect(0,0,width,height); //draw black frame; from (0,0) to (width, height)
		while(tanks.length < 5){
			var TankAI_ = new TankAI();
				//init Tank 3 loai 2 ngu 1 vua 1 thong minh
			tanks.push(TankAI_);

		}
		Player.update();
		Player.draw();
		if(Player.action === 1){
			Player.action = 0;
			j += 1;
            var newBullet = new Bullet(Player.x-25, Player.y-25,'rgba(0,25,100,1)', Player.lastmove, 7, true);
            bullets.push(newBullet);
		}
		Player.lastmove=0;
		var i = 0;
		while(i != bullets.length){

		 	bullets[i].draw();
		 	i+=1;
		 }
		i=0;
		while(i!=4){
			i+=1;
			tanks[i].update();
		}
		
	

	},
	1000 / fps);
}

loop();
