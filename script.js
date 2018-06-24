var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d') ; //draw 2d;
var width = canvas.width ;
var height = canvas.height ;

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x,y,lastmove, action, type,exists,image,current_direction){    //class Shape
	this.x=x;
	this.y=y;
	this.lastmove= lastmove; // 4 moves equal 1-4; 1 up, 2 down, 3 right, 4 left, => use to control verloxity of bullet
	this.action = action; // 0 mean no action, 1 = fire
	this.type = type; // type = 1 => player, type = 2 =>  AI, type = 3 block, type = 4 => river, type = 5 => forest, type = 6 => EGO, type = 7 => player bullet, type = 8 => AI bullet
	this.exists=exists; // false mean death, true mean "well, it alive"
	this.image=new Image();
	this.current_direction = current_direction; //1 down 2 up 3 left, 4 right;
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

function Block(x,y,type,exists){ // class Block
	var image;
	Shape.call(this,x,y,type,exists,image);
	this.image.src="wall.png";
}
Block.prototype.constructor = Block;

Block.prototype.draw= function(){
	ctx.beginPath();
	
	ctx.drawImage(this.image,this.x-50,this.y-50,50,50);

} 
function Steel(x,y,type,exist){ // class Block
	var image;
	Shape.call(this,x,y,type,exist,image);
	this.image.src="steel.png";
}
Steel.prototype.constructor = Steel;

Steel.prototype.draw= function(){
	ctx.beginPath();
	
	ctx.drawImage(this.image,this.x-50,this.y-50,50,50);

} 

function River(x,y,type,exist){   //class River
	var image;
	Shape.call(this,x,y,type,exist,image);
	this.image.src="water.png";
}
River.prototype.constructor = River;

River.prototype.draw= function(){
	ctx.beginPath();

	ctx.drawImage(this.image, this.x-50, this.y-50, 50,50);

} 

function Forest(x,y,type,exist){   //class FOREST
	var image;
	Shape.call(this,x,y,type,exist,image);
	this.image.src="forest.png";
}
Forest.prototype.constructor = Forest;

Forest.prototype.draw= function(){
	ctx.beginPath();
	ctx.drawImage(this.image, this.x-50, this.y-50, 50, 50);

} 

function TankAI(x,y, lastmove,action ,type, exist,image){ // class Tank
	Shape.call(this,x,y,lastmove, action, type, exist,image);
	this.image = new Image();
	this.image.src = "aitank.png";
}

TankAI.prototype.constructor = TankAI;
TankAI.prototype.update=function(){ var i};

TankAI.prototype.draw=function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(x,y,50,50);
};
function TankPlayer(x,y,lastmove,action, type, exists,current_direction){
	
	var image;
	
	

	Shape.call(this, x,y, lastmove, action, type, exists,image,current_direction);
	
}

TankPlayer.prototype.draw=function(){
	ctx.beginPath();
	//ctx.fillStyle = this.image;
	//ctx.fillRect(this.x - 50,this.y -50,50,50);
	if(this.current_direction === 2){
		this.image.src = "ptank.png" ;
	}
	else if(this.current_direction===1){
	 	this.image.src = "ptank_d.png" ;
	 }
	 else if(this.current_direction === 3){
	 	this.image.src= "ptank_r.png";
	 }
	 else if(this.current_direction===4){
	 	this.image.src = "ptank_l.png";
		}
	ctx.drawImage(this.image,this.x - 50,this.y -50,50,50);
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
		else if( e.keyCode === 32 || e.keyCode === 74){
			_this.action=1;
		}
		_this.current_direction	= _this.lastmove;
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

var Player = new TankPlayer(width/2,height,0, 0, 1, true, 2); //lastmove,action, type, exists,current_direction)
var tankAi;
var tanks=[];
var river_Array= [];
var forest_Array= [];
var block_Array=[];
var block = new Block(550,400,1, true);
block_Array.push(block);
var steel_Array=[];
var steel = new Steel(400,100,1,true);
steel_Array.push(steel);
steel = new Steel(450, 100,1, true);
steel_Array.push(steel);
var forest = new Forest(400,200,1,true);
forest_Array.push(forest);
var river = new River(500,300,1,true);
river_Array.push(river);
var bullets=[];
var fps = 15;
//var j = 0;
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
		var i =0;
		for(i; i < river_Array.length;i++) // draw river
			river_Array[i].draw();
		Player.update();
		Player.draw();

		i =0 ;
		for(i;i< forest_Array.length;i++){ //draw forest
			forest_Array[i].draw();
		}
		
		i=0;
		for(; i < block_Array.length;i++) // draw block
			block_Array[i].draw();

		i = 0;
		for(; i < steel_Array.length; i++){
			steel_Array[i].draw();
		}
		if(Player.action === 1){
			Player.action = 0;
			
            var newBullet = new Bullet(Player.x-25, Player.y-25,'rgba(0,25,100,1)', Player.lastmove, 7, true);
            bullets.push(newBullet);
		}
		Player.lastmove=0;
		i = 0;
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

