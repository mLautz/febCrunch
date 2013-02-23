ig.module('game.entities.hiddenDoor')
.requires(
	'impact.entity'
)
.defines(function(){
	EntityHiddenDoor = ig.Entity.extend({
		size: {x:32, y:48},
		animSheet: new ig.AnimationSheet('media/febCrunch/hiddenDoor.png',32,48),

		//collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle',5,[0]);
			this.addAnim('hidden',5,[1]);
			this.currentAnim = this.anims.hidden;
		},

		update: function(){
			if(!this.player){
				this.player = ig.game.getEntitiesByType(EntityPlayer)[0];
			}

			if(this.player.hasPortalKey){
				this.currentAnim = this.anims.idle;
			}
		},

		check: function(other){
			if(other instanceof EntityPlayer){
				if(other.hasPortalKey){
					console.log("Player leaving level!");
					ig.game.myDirector.nextLevel();
				}
			}
		}
	});
});