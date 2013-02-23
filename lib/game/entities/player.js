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
		maxVel: {x:350, y:400},
		friction: {x:1000, y:0},
		accelGround: 800,
		accelAir: 700,
		gravityFactor: 5,

		//jump config/control variables
		jump: 320,
		jumpTimer: new ig.Timer(),
		jumpDuration: 0.8,
		jumping: false,
		climbing: false,
		jumpCount: 0,

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
			this.addAnim('climb', 0.09, [9,10,11]);
		},

		update: function(){
			this.handlePlayerMovement();

			//set current animation
			if(this.climbing){
				this.currentAnim = this.anims.climb;
			}else if(!this.standing){
				this.currentAnim = this.anims.jump;
			}else if(this.vel.x !=0){
				this.currentAnim = this.anims.run;
			}else{
				this.currentAnim = this.anims.idle;
			}

			this.climbing = false;

			//set player facing direction
			this.currentAnim.flip.x = this.flip;	

			this.parent();
		},

		check: function(other){
			this.parent(other);
		},

		handlePlayerMovement: function(){
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left')) {
				if(this.vel.x > 0){
					this.vel.x = 0.4 * this.vel.x;
				}
				this.accel.x = -accel;
				this.flip = true;
			}else if( ig.input.state('right')) {
				if(this.vel.x < 0){
					this.vel.x = 0.4 * this.vel.x;
				}
				this.accel.x = accel;
				this.flip = false;
			}else{
				this.accel.x = 0;
			}

			//end jump
			if(this.standing && this.jumping){
				this.jumping = false;
				this.jumpCount = 0;
			}

			// jump
			if(ig.input.pressed('jump') && this.jumpCount < 2) {
				this.initiateJump();
			}

			if(ig.input.state('jump') && this.jumpTimer.delta() < this.jumpDuration){
				this.accel.y = -this.jump;
			}

			if(ig.input.released('jump')){
				this.accel.y = 0;
				if(this.vel.y < 0){
					this.vel.y = 0;
				}
				jumping = false;
			}
		},

		initiateJump: function(){
			this.jumpTimer.reset();
			this.jumping = true;
			this.jumpCount++;
			this.vel.y = -this.jump;
			this.accel.y = -this.jump;
		},

		receiveDamage: function(amount, from){
			this.parent(amount, from);
		},
	});


});