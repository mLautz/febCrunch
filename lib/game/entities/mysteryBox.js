ig.module('game.entities.mysteryBox')
.requires(
	'impact.entity'
)
.defines(function(){
	EntityMysteryBox = ig.Entity.extend({
		size: {x:32, y:32},
		animSheet: new ig.AnimationSheet('media/febCrunch/mysteryBox.png',32,32),

		//collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle',5,[0]);
			this.currentAnim = this.anims.idle;
		},

		check: function(other){
			if(other instanceof EntityPlayer){
				console.log("Player found!");
				this.kill();
			}
		}
	});
})