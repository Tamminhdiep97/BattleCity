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
function Ego(x,y,type,exists){
	var action;
	var lastmove;
	var image;
	Shape.call(this,x,y,lastmove,action,type,exists,image);
	this.image.src="ego.png";
};
Ego.prototype.constructor= Ego;
Ego.prototype.draw=function(){
	ctx.beginPath();
	ctx.drawImage(this.image, this.x-50, this.y-50,50,50);
}
function Bullet(x,y, lastmove, type, exist){ // class bullet
	var image;
	var action;
	Shape.call(this,x,y,lastmove, action, type, exist,image);

}

Bullet.prototype.constructor = Bullet;

Bullet.prototype.draw = function(){
	ctx.beginPath();
	this.image.src = "bullet.png";
	ctx.drawImage(this.image, this.x-35,this.y-35,25,25);
};
Bullet.prototype.update = function(){
	if(this.lastmove ===1 ){
		
		this.y +=  50;
	}
	else if(this.lastmove ===2 ){
		this.y -= 50;
	}
	else if(this.lastmove === 3  ){
		this.x += 50;
	}
	else if(this. lastmove === 4 ){
		this.x -= 50;
	}
	

};
Bullet.prototype.collisionDetect=function(){
		var i=0;
		for(; i < block_Array.length; i++){
			if(this.x-35 > block_Array[i].x-50 && this.x-35 < block_Array[i].x && this.y-35 > block_Array[i].y -50 && this.y-35 < block_Array[i].y){
				block_Array.splice(i,1);
				
			//	bullets.splice(this,1);
				return true;
			}
		}
		if(this.x-35 > ego.x-50 && this.x-35 <ego.x && this.y-35 > ego.y-50 && this.y -35 <ego.y){
			ego.exists=false;
			return true;
		}
		
		if(this.x-35 > Player.x-50 && this.x-35 < Player.x && this.y-35 > Player.y-50 && this.y-35 < Player.y){
				
			Player.exists=false;
			return true;
		}
			
		
		
		else //otherwise
		{
			for(i=0; i < tanks.length; i++){
				if(this.x-35 > tanks[i].x-50 && this.x-35 < tanks[i].x && this.y-35 > tanks[i].y -50 && this.y-35 < tanks[i].y){
					if(this.type === 7) // if the bullet which hit ai tank is from player => tank destroy, else, the bullet is destroyed
						tanks.splice(i,1);
					return true;
				}
			}
		}
}
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

} ;
Steel.prototype.collisionDetect = function(){
	var i = 0;
	for(;i < bullets.length; i++){
		if(this.x-50 < bullets[i].x-35 && this.x > bullets[i].x-35  && this.y-50 < bullets[i].y-35  && this.y > bullets[i].y-35){
			bullets.splice(i,1);
			i-=1;
		}
	}
};
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

function TankAI(x,y, lastmove,action ,type, exists,current_direction){ // class Tank
	var image;
	Shape.call(this,x,y,lastmove, action, type, exists,image,current_direction);
	
}

TankAI.prototype.constructor = TankAI;
TankAI.prototype.setMove1=function(){
	

};
TankAI.prototype.update=function(){ //MOVE;
};

TankAI.prototype.draw=function(){
		ctx.beginPath();
	//ctx.fillStyle = this.image;
	//ctx.fillRect(this.x - 50,this.y -50,50,50);
	if(this.current_direction === 2){
		this.image.src = "aitank.png" ;
	}
	else if(this.current_direction===1){
	 	this.image.src = "aitank_d.png" ;
	 }
	 else if(this.current_direction === 3){
	 	this.image.src= "aitank_r.png";
	 }
	 else if(this.current_direction===4){
	 	this.image.src = "aitank_l.png";
		}
	ctx.drawImage(this.image,this.x-50,this.y-50,50,50);
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
	ctx.drawImage(this.image,this.x-50,this.y-50,50,50);
	//this.lastmove = 0;
}
TankPlayer.prototype.setControl=function(){
	var _this=this;

	window.onkeydown=function(e){
		if(e.keyCode===65 || e.keyCode===37){
			_this.lastmove	=4;
			_this.current_direction = 4;		} 
		else if(e.keyCode===68 || e.keyCode===39){
			_this.lastmove=3;
			_this.current_direction=3;
		}
		else if(e.keyCode===87 || e.keyCode===38){
			_this.lastmove=2;
			_this.current_direction=2
		}
		else if(e.keyCode===83 || e.keyCode===40){
			_this.lastmove=	1;
			_this.current_direction=1;
		}
		else if( e.keyCode === 32 || e.keyCode === 74){
			_this.action=1;
		}
		
	}

}	
TankPlayer.prototype.update=function(){
	var i;
	var j; 
	if(this.lastmove ===1 && this.y <= height-50 ){
		i=0;
		j=0;
		if(this.y+50 != ego.y || this.x != ego.x)
			j+=1;
		for(; i < steel_Array.length;i++)
			if(this.y + 50 === steel_Array[i].y && this.x === steel_Array[i].x)
				break;
			if(i === steel_Array.length)
				j+=1;
		i=0;
		for(; i < river_Array.length;i++)
			if(this.y + 50 === river_Array[i].y && this.x === river_Array[i].x)
				break;
			if(i === river_Array.length)
				j+=1;
		i=0;
		for(; i < block_Array.length;i++)
			if(this.y + 50 === block_Array[i].y && this.x === block_Array[i].x)
				break;
			if(i === block_Array.length)
				j+=1;
		if(j===4)
			this.y +=  50;
	}
	if(this.lastmove ===2 && this.y > 50){
		 j=0;
		 i =0 ;
		 if(this.y-50 != ego.y || this.x != ego.x)
			j+=1;
		 for(; i <steel_Array.length; i++)
		 	if(this.y-50 === steel_Array[i].y && this.x === steel_Array[i].x)
		 		break;
		 	if(i === steel_Array.length)
		 		j+=1;
		 i =0 ;
		 for(; i <river_Array.length; i++)
		 	if(this.y-50 === river_Array[i].y && this.x === river_Array[i].x)
		 		break;
		 	if(i === river_Array.length)
		 		j+=1;
		 
		 i =0 ;
		 for(; i <block_Array.length; i++)
		 	if(this.y-50 === block_Array[i].y && this.x === block_Array[i].x)
		 		break;
		 	if(i === block_Array.length)
		 		j+=1;	
		 if(j===4)
				this.y -= 50;
	}
	if(this.lastmove === 3 && this.x <= width-50 ){
		 j = 0;
		 i = 0 ;
		 if(this.y != ego.y || this.x+50 != ego.x)
			j+=1;
		for(; i <steel_Array.length; i++)
		 	if(this.y === steel_Array[i].y && this.x+50 === steel_Array[i].x){
		 		break;
		 	}
		 	if(i === steel_Array.length)
		 		j+=1;
		 i = 0 ;
		for(; i <river_Array.length; i++)
		 	if(this.y === river_Array[i].y && this.x+50 === river_Array[i].x){
		 		break;
		 	}
		 	if(i === river_Array.length)
		 		j+=1;
		  i = 0 ;
		for(; i <block_Array.length; i++)
		 	if(this.y === block_Array[i].y && this.x+50 === block_Array[i].x){
		 		break;
		 	}
		 	if(i === block_Array.length)
		 		j+=1;
		 if(j===4)
			this.x += 50;
		}
	if(this. lastmove === 4 && this.x > 50){
		j = 0;
		 i =0 ;
		 if(this.y != ego.y || this.x-50 != ego.x)
			j+=1;
		for(; i <steel_Array.length; i++)
		 	if(this.y === steel_Array[i].y && this.x-50 === steel_Array[i].x){
		 		break;
		 	}
		 	if(i === steel_Array.length)
		 		j+=1;
		i = 0 ;
		for(; i <river_Array.length; i++)
		 	if(this.y === river_Array[i].y && this.x-50 === river_Array[i].x){
		 		break;
		 	}
		 	if(i === river_Array.length)
		 		j+=1;
		  i = 0 ;
		for(; i <block_Array.length; i++)
		 	if(this.y === block_Array[i].y && this.x-50 === block_Array[i].x){
		 		break;
		 	}
		 	if(i === block_Array.length)
		 		j+=1;
		 if(j===4)
				this.x -= 50;
	}
	

}		

var Player =  new TankPlayer(width/2-100,height,0, 0, 1, true, 2);//lastmove,action, type, exists,current_direction)
var tankAi;
var ego = new Ego(width/2,height,7,true);
var tanks=[];
var river_Array= [];
var forest_Array= [];
var block_Array=[];
var block = new Block(550,400,3, true);
block_Array.push(block);
block= new Block(300,350,3,true);
block_Array.push(block);
block= new Block(350,350,3,true);
block_Array.push(block);
block= new Block(400,350,3,true);
block_Array.push(block);
var steel_Array=[];
var steel = new Steel(400,100,1,true);
steel_Array.push(steel);
steel = new Steel(450, 300,1, true);
steel_Array.push(steel);
steel = new Steel(450,150,1,true);

steel_Array.push(steel);
var forest = new Forest(400,200,1,true);
forest_Array.push(forest);
var river = new River(500,300,1,true);
river_Array.push(river);
var bullets=[];
var fps = 7;
//var j = 0;
var map=[];
Player.setControl();
	var x =0
	while(tanks.length < 5){

			var TankAI_ = new TankAI(x,50,1,0,2,true,4);
			//x,y, lastmove,action ,type, exists
			x+=150;
				//init Tank 3 loai 2 ngu 1 vua 1 thong minh
			tanks.push(TankAI_);

		}
function loop(){

		
	setTimeout(function(){
		requestAnimationFrame(loop);
		
		ctx.fillStyle='rgba(0,0,0,1)';
		ctx.fillRect(0,0,width,height); //draw black frame; from (0,0) to (width, height)
	
		
		var i =0;
		for(i; i < river_Array.length;i++) // draw river
			river_Array[i].draw();
		Player.update();
		Player.draw();
		ego.draw();
		i =0 ;
		for(i;i< forest_Array.length;i++){ //draw forest
			forest_Array[i].draw();
		}
		
		i=0;
		for(; i < block_Array.length;i++) // draw block
			block_Array[i].draw();

	
		if(Player.action === 1){
			Player.action = 0;
			
            var newBullet = new Bullet(Player.x, Player.y, Player.current_direction, 7, true);
            
            bullets.push(newBullet);
		}
		Player.lastmove=0;
		i = 0;
		while(i != bullets.length){

		 	bullets[i].draw();
		 	
		 	bullets[i].update();

		 	var j = bullets[i].collisionDetect();

		 	if(j===true){
		 		bullets.splice(i,1);
		 		i-=1;
		 	}
		 	else 
		    if(bullets[i].y > height || bullets[i].y < 0 || bullets[i].x < 0 || bullets[i].x > width){
		 			bullets.splice(i,1);
		 			i-=1;
		 	}

		 	i+=1;
		 }
		i=0;
			i = 0;
		for(; i < steel_Array.length; i++){ //draw steel
			steel_Array[i].draw();
			steel_Array[i].collisionDetect();
		}
		i=0;
		while(i!=tanks.length){
			
			tanks[i].update();
			tanks[i].draw();
			i+=1;
		}
		
	
	
	},
	1000 / fps);
	
}

loop();

	

