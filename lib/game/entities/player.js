ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/febCrunch/player.png', 24, 43),
		size: {x:18, y:37},
		offset: {x:3, y:3},
		flip: false,
		startPosition: null,

		//settings to draw in level editor
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.4)',

		//physics config.
		maxVel: {x:100, y:170},
		friction: {x:600, y:0},
		accelGround: 400,
		accelAir: 200,
		jump: 240,
		gravityFactor: 1,

		//jump config
		jumpCount: 0,
		jumping: false,


		//collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);
			this.startPosition = {x:x, y:y},
			this.addAnim('idle', 0.5, [0,1]);
			this.addAnim('run', 0.07, [2,3,4,5,6,7]);
			this.addAnim('jump', 1, [8]);
		},

		update: function(){
			this.handlePlayerMovement();

			this.parent();
		},

		check: function(other){
			this.parent(other);
		},

		handlePlayerMovement: function(){
			var accel = this.standing ? this.accelGround : this.accelAir;
			if(ig.input.state('left')){
				this.accel.x = -accel;
				this.flip = true;
			}else if(ig.input.state('right')){
				this.accel.x = accel;
				this.flip = false;
			}else{
				this.accel.x = 0;
			}

			if(this.standing && this.jumping){
				this.jumping = false;
				this.jumpCount = 0;
			}

			if(ig.input.pressed('jump') && this.jumpCount<2){
				this.vel.y = -this.jump;
				this.jumpCount++;
				this.jumping = true;
			}

			//set current animation

			if(!this.standing & Math.abs(this.vel.y)>50){
				this.currentAnim = this.anims.jump;
			}else if(this.vel.x !=0){
				this.currentAnim = this.anims.run;
			}else{
				this.currentAnim = this.anims.idle;
			}

			//set player facing direction
			this.currentAnim.flip.x = this.flip;	

			this.parent();
		},

		receiveDamage: function(amount, from){
			this.parent(amount, from);
		},

		kill: function(){
			this.parent();
			ig.game.myDirector.reloadLevel();
		}
	});


});