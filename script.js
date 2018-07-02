
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d') ; //draw 2d;
var width = canvas.width ;
var height = canvas.height ;

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
function Min(a,b,c,d){
	var min = a;
	if(min > b)
		min =b;
	if(min > c)
		min =c;
	if(min > d)
		min =d;
	return min;
}
function checkSteel(x,y){
	var i=0;
	for(;i<steel_Array.length;i++){
		if(steel_Array[i].x === x && steel_Array[i].y === y){
			return true;
		}
	}
	return false;
}
function checkWater(x,y){
	var i=0;
	for(;i<river_Array.length;i++){
		if(river_Array[i].x === x && river_Array[i].y === y){
			return true;
		}
	}
	return false;
}
function checkBlock(x,y){
	var i=0;
	for(;i<block_Array.length;i++){
		if(block_Array[i].x === x && block_Array[i].y === y){
			return true;
		}
	}
	return false;
}
function checkFacingEgo(x,y,direction){
	if(direction === 1){
		//console();
		var y_d = y;
		for(;y_d <= height; y_d+=50){
			if(y_d === ego.y && x === ego.x)
				return true;	
		}
		return false;
	}
	if(direction === 2){
		var y_d = y;
		for(;y_d > 0; y_d-=50){
			if(y_d === ego.y && x === ego.x)
				return true;	
		}
		return false;
	}
	if(direction === 3){
		var x_d =x ;
		for(;x_d <= width; x_d +=50){
			if(x_d === ego.x && y === ego.y)
				return true;
		}
		return false;
	}
	if(direction===4){
		var x_d = x;
		for(;x_d > 0; x_d-=50){
			if(x_d === ego.x && y === ego.y)
				return true;
		}
		return false;
	}
}
function checkFacingPlayer(x,y,direction){
	if(direction === 1){
		//console();
		var y_d = y;
		for(;y_d <= height; y_d+=50){
			if(y_d === Player.y && x === Player.x)
				return true;	
		}
		return false;
	}
	if(direction === 2){
		var y_d = y;
		for(;y_d > 0; y_d-=50){
			if(y_d === Player.y && x === Player.x)
				return true;	
		}
		return false;
	}
	if(direction === 3){
		var x_d =x ;
		for(;x_d <= width; x_d +=50){
			if(x_d === Player.x && y === Player.y)
				return true;
		}
		return false;
	}
	if(direction===4){
		var x_d = x;
		for(;x_d > 0; x_d-=50){
			if(x_d === Player.x && y === Player.y)
				return true;
		}
		return false;
	}
}
function Map_update(){
	var A=new Array();
	var check=false;
	var x,y;
	for(y=50;y<=height; y+=50){
		A[(y/50)-1]=new Array();
		
		for(x=50;x<=width;x+=50){
				
			if(checkWater(x,y)||checkSteel(x,y)){
				A[(y/50)-1].push(1);
				
			}
			else A[(y/50)-1].push(0);
				
			
		}

	}
	var i;
	for(i=0; i < bullets.length; i ++){
		if(bullets[i].type === 7){
			if(bullets[i].lastmove === 1){
				for(y=bullets[i].y; y <= height;y+=50)
					A[y/50-1][bullets[i].x/50-1]=1;
			}
			else
				if(bullets[i].lastmove === 2){
					for(y=bullets[i].y; y >= 50;y-=50)
					A[y/50-1][bullets[i].x/50-1]=1;
				}
					else
						if(bullets[i].lastmove===3){
							for(x=bullets[i].x; x <= width;x+=50)
							A[bullets[i].y/50-1][x/50-1]=1;
						}
							else
							{
								for(x=bullets[i].x; x >=50;x-=50)
								A[bullets[i].y/50-1][x/50-1]=1;
							}
				}
		}
	
	return A;

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
TankAI.prototype.collisionDetect=function(){
	var i =0;
	for(; i < tanks.length; i++){
		if(!(this === tanks[i])){
		//	console.log("check");
			if((this.lastmove === 1) && (tanks[i].x === this.x) && (tanks[i].y===this.y+50))
				this.lastmove =0 ;
			if((this.lastmove === 2) && (tanks[i].x === this.x) && (tanks[i].y===this.y-50))
				this.lastmove =0 ;
			if((this.lastmove === 3) && (tanks[i].x === this.x+50) && (tanks[i].y===this.y))
				this.lastmove =0 ;
			if((this.lastmove === 4) && (tanks[i].x === this.x-50) && (tanks[i].y===this.y))
				this.lastmove =0 ;
		}
	}
}
TankAI.prototype.setMove3=function(){ //di xe ng choi 
	var up=999, down=999, left=999, right=999; 
	
	if(this.x === width || this.lastmove ===4)
		right =1000;  //can't go to the right
	else
		if(this.x === 50 || this.lastmove === 3)
			left =1000; //can't go to the left
	if(this.y ===height || this.lastmove === 2)
		down = 1000; //cant go down
	else
		if(this.y === 50 || this.lastmove ===1)
			up =1000;  // can't go up;
	
	if(right!=1000){   // x+50
		if(checkWater(this.x+50,this.y)=== false && checkSteel(this.x+50,this.y)===false)
			right = (Math.abs(this.x + 50 - Player.x) + Math.abs(this.y - Player.y))/50;
		else
			right = 1000;
		
	
	}
	
	if(left!=1000){
	//	console.log("left");
			if(checkWater(this.x-50,this.y)=== false && checkSteel(this.x-50,this.y)===false)
		//	console.log(Math.abs(this.x - 50 - Player.x) + Math.abs(this.y - Player.y));
				left = (Math.abs(this.x - 50 - Player.x) + Math.abs(this.y - Player.y))/50;
			else
				left = 1000;
			
		

	}
	if(up!=1000){
		if(checkWater(this.x,this.y-50)=== false && checkSteel(this.x,this.y-50)===false)
			up = (Math.abs(this.x  - Player.x) + Math.abs(this.y -50 - Player.y))/50;
		else
			up = 1000;
		
	}
	if(down!=1000){
	if(checkWater(this.x,this.y+50)=== false && checkSteel(this.x,this.y+50)===false)
			down = (Math.abs(this.x  - Player.x) + Math.abs(this.y +50 - Player.y))/50;
			
	else
		down = 1000;
	}
//	console.log("right",right);
//	console.log("left",left);
//	console.log("up",up);
//	console.log("down",down);
	var move = Min(up, down, left, right);
	if(move === up)
		this.lastmove= 2;
	if(move === down)
		this.lastmove= 1;
	if(move === left)
		this.lastmove= 4;
	if(move === right)
		this.lastmove= 3;




};
TankAI.prototype.setMove1=function(){ // di den dai bang 
	var up=999, down=999, left=999, right=999; 
	
	if(this.x === width || this.lastmove ===4)
		right =1000;  //can't go to the right
	else
		if(this.x === 50 || this.lastmove === 3)
			left =1000; //can't go to the left
	if(this.y ===height || this.lastmove === 2)
		down = 1000; //cant go down
	else
		if(this.y === 50 || this.lastmove ===1)
			up =1000;  // can't go up;
	
	if(right!=1000){   // x+50
		if(checkWater(this.x+50,this.y)=== false && checkSteel(this.x+50,this.y)===false)
			right = (Math.abs(this.x + 50 - ego.x) + Math.abs(this.y - ego.y))/50;
		else
			right = 1000;
		
	
	}
	
	if(left!=1000){
	//	console.log("left");
			if(checkWater(this.x-50,this.y)=== false && checkSteel(this.x-50,this.y)===false)
		//	console.log(Math.abs(this.x - 50 - ego.x) + Math.abs(this.y - ego.y));
				left = (Math.abs(this.x - 50 - ego.x) + Math.abs(this.y - ego.y))/50;
			else
				left = 1000;
			
		

	}
	if(up!=1000){
		if(checkWater(this.x,this.y-50)=== false && checkSteel(this.x,this.y-50)===false)
			up = (Math.abs(this.x  - ego.x) + Math.abs(this.y -50 - ego.y))/50;
		else
			up = 1000;
		
	}
	if(down!=1000){
	if(checkWater(this.x,this.y+50)=== false && checkSteel(this.x,this.y+50)===false)
			down = (Math.abs(this.x  - ego.x) + Math.abs(this.y +50 - ego.y))/50;
			
	else
		down = 1000;
	}
//	console.log("right",right);
//	console.log("left",left);
//	console.log("up",up);
//	console.log("down",down);
	var move = Min(up, down, left, right);
	if(move === up)
		this.lastmove= 2;
	if(move === down)
		this.lastmove= 1;
	if(move === left)
		this.lastmove= 4;
	if(move === right)
		this.lastmove= 3;



};

TankAI.prototype.fire=function(){
			var bullet = new Bullet(this.x, this.y, this.current_direction, 8, true);
			bullets.push(bullet);

}		

function Point(x,y){
	this.x=x;
	this.y=y;
}
function H(x,y){  //2 TARGET
		var max1 =Math.abs(x-Player.x)+Math.abs(y-Player.y);
		var max2 = Math.abs(x-ego.x)+Math.abs(y-ego.y);
		return Math.min(max1,max2);
}
TankAI.prototype.setMove2=function(){ 
	st= new Point(this.x, this.y); //start point
	e1 = new Point(Player.x, Player.y); //end point 1
	e2 = new Point(ego.x,ego.y);	//end point 2
	var open 	= new Array();
	var close 	= new Array();
	var g 		= new Map();
	var f 		= new Map();
	var prev 	= new Map();
	g.set(st,0);
	f.set(st,0);
	open.push(st);
	var flag = false;
	
	while(open.length != 0){
		var i = 0;
		var p = open[0];
		for(; i < open.length; i++){
			if(f.get(p) > f.get(open[i])){
				p = open[i];
				
			}
		}
		if((p.x===e1.x && p.y===e1.y) || (p.x===e2.x && p.y===e2.y)){
			close.push(p);
			flag=true;
			var q = prev.get(p);
			prev.set(e1,q);
			break;
		}

		close.push(p);
		var index = open.indexOf(p);
		open.splice(index,1);
		
		var Q = new Array();
		
		i=0;
		var q;
		for(;i<4;i++){
			switch(i){
				case 0:  //x-50; y;
					if(p.x > 50 && map[p.y/50-1][(p.x-50)/50-1]===0 ){
						q = new Point(p.x-50,p.y);
						//console.log(q);
						//console(q);
						Q.push(q);
					}
					break;
				case 1: //x+50, y
					if(p.x < width && map[p.y/50-1][(p.x+50)/50-1]===0){ 
						q = new Point(p.x+50,p.y);
						Q.push(q);
					}
					break;
				case 2:  //x,y-50 
					if(p.y > 50 && map[(p.y-50)/50-1][p.x/50-1]===0){
						q= new Point(p.x,p.y-50);
						Q.push(q);
					}
					break;
				case 3: //x,y+50
					if(p.y < height && map[(p.y+50)/50-1][p.x/50-1]===0){
						q = new Point(p.x,p.y+50);
						Q.push(q);
					}
					break;
				default:
					break;
			}	
		}

		i=0;
		
		for(; i < Q.length; i++){
			q = Q[i];
			var j = 0;
			var k= 0;
			var check_open=false;
			var check_close=false;
			for(; j < open.length; j++){
				if(q.x===open[j].x && q.y === open[j].y){
					check_open=true;
					break;
				}

			}
			for(; k < close.length; k++){
				if(q.x===close[k].x && q.y === close[k].y){
					check_close=true;
					break;
				}

			}
			if(check_open===false && check_close===false) // th1
			{
				g.set(q,g.get(p)+1);//g[q] = g[p]+1;
                f.set(q,g.get(q)+H(q.x,q.y));
                prev.set(q,p);
                open.push(q);
			}
			else
			
				if(check_open===true)//q thuoc open
				{
					 if(g[q] > g[p]+ 1)  //Nếu đến được q bằng path ngắn hơn thì cập nhật lại q trong Open
                        {
                            g.set(q,g.get(p)+1);//g[q] = g[p]+1;
                            f.set(q,g.get(q)+H(q.x,q.y));//f[q] = g[q] + H(q.x,q.y);
                            prev.set(q,p);
                        }
				}
			
			else 
				if(check_close===true) // q thuoc close
				{
					if( g[q] > g[p]+1) //Nếu đến được q bằng path ngắn ngơn 
                        {
                        //    Bỏ q khỏi Close;
                        close.splice(close.indexOf(q),1);
                     	g.set(q,g.get(p)+1);//g[q] = g[p]+1;
                        f.set(q,g.get(q)+H(q.x,q.y));//f[q] = g[q] + H(q.x,q.y);
                         prev.set(q,p);
                        //Thêm q vào Open
                        open.push(q);
                        }
				}
		}
	}
	if(flag === false)
		return random(1,4);
	else
		{	
			var next;
			var dx, dy;
			var vertex_index1 = e1;
			
			var vertex_index2 = e2;
			var v1,v2;
			
			while(!(vertex_index1.x === st.x && vertex_index1.y === st.y) && !(vertex_index2.x === st.x && vertex_index2.y === st.y)){
				console.log(vertex_index1);
				console.log(vertex_index2);
				if(prev.has(vertex_index1)===true){
					//console.log(prev);
					v1 = prev.get(vertex_index1);
					if(v1 === st){
						next=1;
						break;
					}
					else
						vertex_index1=v1;
				}
				else
					if(prev.has(vertex_index2)===true){
						v2 = prev.get(vertex_index1);
						if(v2 === st){
							next=2;
							break;
						}
						else
							vertex_index2=v2;
					}
				
				}
			
			if(next===1){
				dx = vertex_index1.x - this.x;
				dy = vertex_index1.y - this.y;
			}
			else
			{
				dx = vertex_index2.x - this.x;
				dy = vertex_index2.y - this.y;
			}
			if(dx === 50){
				this.lastmove= 3;
				return;
			}

			else
				if(dx===-50){
					this.lastmove=4;
					return;
				}
				else
				{
					if(dy === 50){
						this.lastmove=1;
						return;

					}
					if(dy === -50){
						this.lastmove =2;
						return;
					}
				}
		}
}
TankAI.prototype.update=function(){ //MOVE;
	if(this.lastmove === 0){}
		else
	if(this.lastmove === 1){
		if(checkBlock(this.x,this.y+50)===true){
			this.current_direction=1;
			this.fire();
			return;
		}
		else{
		this.y+=50;
		this.current_direction=1;
	//	console.log("this.y+50");
		}
	}
	else
	if(this.lastmove === 2){
		if(checkBlock(this.x,this.y-50)===true)
		{
			this.current_direction=2;
			this.fire();
			return;
		}
		else{
		this.y-=50;
		this.current_direction=2;
	//	console.log("this.y-50");
		}
	}
	else
	if(this.lastmove === 3){
		if(checkBlock(this.x+50,this.y)===true){
			this.current_direction=3;
			this.fire();
			return;
		}
		else{
		this.x+=50;
		this.current_direction=3;
	//	console.log("this.x+50");
		}
	}
	else
	if(this.lastmove === 4){
		if(checkBlock(this.x-50,this.y)===true){
			this.current_direction=4;
			this.fire();
			return;

		}
		else{
		this.x-=50;
		this.current_direction=4;
	//	console.log("this.x-50");
		}
	}
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
var block = new Block(50,50,3, true);
block_Array.push(block);
block= new Block(width/2-50,height,3,true);
block_Array.push(block);
block= new Block(width/2+50,height,3,true);
block_Array.push(block);
block= new Block(width/2+50,height-50,3,true);
block_Array.push(block);
block= new Block(width/2-50,height-50,3,true);
block_Array.push(block);

block= new Block(width/2,height-50,3,true);
block_Array.push(block);

block= new Block(300,350,3,true);
block_Array.push(block);

block= new Block(550,350,3,true);
block_Array.push(block);

block= new Block(450,350,3,true);
block_Array.push(block);

block= new Block(350,350,3,true);
block_Array.push(block);





var steel_Array=[];
var steel = new Steel(400,100,1,true);
steel_Array.push(steel);

steel = new Steel(450, 300,1, true);
steel_Array.push(steel);

steel = new Steel(450,150,1,true);
steel_Array.push(steel);

steel= new Steel(500,350,1,true);
steel_Array.push(steel);

steel= new Steel(600,300,1,true)
steel_Array.push(steel);
steel= new Steel(650,300,1,true)
steel_Array.push(steel);
steel= new Steel(700,300,1,true)
steel_Array.push(steel);
var forest = new Forest(400,200,1,true);
forest_Array.push(forest);

forest = new Forest(450,200,1,true)
forest_Array.push(forest);

forest = new Forest(500,200,1,true)
forest_Array.push(forest);

forest = new Forest(550,200,1,true)
forest_Array.push(forest);
var river = new River(500,300,1,true);
river_Array.push(river);
river = new River(550,300,1,true);
river_Array.push(river);
river = new River(400,300,1,true);
river_Array.push(river);
river = new River(400,250,1,true);
river_Array.push(river);
river = new River(350,300,1,true);
river_Array.push(river);
river = new River(300,300,1,true);
river_Array.push(river);
river = new River(150,300,1,true);
river_Array.push(river);
river = new River(200,300,1,true);
river_Array.push(river);
river = new River(250,300,1,true);
river_Array.push(river);
var bullets=[];
var fps = 3;
var j = 0; // luot choi
function TANKAI_SET(j){
	if(j === 0 || j ===1){
		var x =200;
		while(tanks.length < 3){
			console.log("pushTank");
			var TankAI_ = new TankAI(x,50,1,0,2,true,1);
			//x,y, lastmove,action ,type, exists
			x+=150;
				//init Tank 3 loai 2 ngu 1 vua 1 thong minh
			tanks.push(TankAI_);

		}
	}
		if(j === 2 ){
		var x =200
		while(tanks.length < 1){

			var TankAI_ = new TankAI(x,50,1,0,2,true,1);
			//x,y, lastmove,action ,type, exists
			x+=150;
				//init Tank 3 loai 2 ngu 1 vua 1 thong minh
			tanks.push(TankAI_);

		}
	
	}
}
var j = -1;
var map=new Array;
var result;
Player.setControl();
	
function loop(){
	if(ego.exists===false || Player.exists === false){
		result= false;
		alert("thua");
		return;
	}
	
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
		
		map=Map_update();
		
		console.log(j);
		if(Player.action === 1){
			Player.action = 0;
			
            var newBullet = new Bullet(Player.x, Player.y, Player.current_direction, 7, true);
            
            bullets.push(newBullet);
		}
		Player.lastmove=0;
		i = 0;
		
		
		
		for(; i < steel_Array.length; i++){ //draw steel
			steel_Array[i].draw();
			steel_Array[i].collisionDetect();
		}
		i=0;
		if(tanks.length===0){
			j+=1;
			if(j === 3){
				alert("you win!");
			}
			else
				TANKAI_SET(j);
		}
		while(i!=tanks.length){
			//
			console.log(j);
			
			if(j === 0)
				tanks[i].setMove1();
			if(j === 1)
				tanks[i].setMove3();
			if(j === 2)
				tanks[i].setMove2();
			tanks[i].collisionDetect();
			tanks[i].update();
			if(checkFacingEgo(tanks[i].x,tanks[i].y,tanks[i].current_direction)|| checkFacingPlayer(tanks[i].x,tanks[i].y,tanks[i].current_direction))
				tanks[i].fire();
			tanks[i].draw();

			
			i+=1;
		}
		
			i = 0;
		while(i != bullets.length){

		 	bullets[i].draw();
		 	
		 	bullets[i].update();

		 	var l = bullets[i].collisionDetect();

		 	if(l===true){
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
		for(; i < block_Array.length;i++) // draw block
			block_Array[i].draw();
		i =0 ;
		for(i;i< forest_Array.length;i++){ //draw forest
			forest_Array[i].draw();
		}

	
	
	},
	1000 / fps);
	
}

loop();

/*
function point(x,y){
  this.x=x;
  this.y = y;
};
var m = new Map();
var c = new point(10,1);
var b = new point (20,1)
var a = new point(20,1);
m.set(a,c);		
if(m.has(a) === true){
console.log(m.has(b));
}
*/
