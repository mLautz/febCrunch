ig.module(
	'game.entities.climbingLiquid'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityClimbingLiquid = ig.Entity.extend({
		size: {x:1088, y:723},
		offset: {x:0, y:77},
		animSheet: new ig.AnimationSheet('media/febCrunch/climbingLiquid.png', 1088, 800),
		zIndex: 100000,
		gravityFactor: 0,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings){
			this.parent(x, y, settings);
			
			this.vel.y = settings.vel.y;
			this.addAnim('idle', 1, [0,1]);
			this.currentAnim = this.anims.idle;
		},

		update: function(){
			if(this.pos.y<80){
				this.vel.y = 0;
			}

			this.parent();
		},

		check: function(other){
			if(other instanceof EntityPlayer){
				other.receiveDamage(10);
			}
		},


	});
});