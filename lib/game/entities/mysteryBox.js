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

		//physics config.
		maxVel: {x:350, y:400},
		friction: {x:1000, y:0},
		gravityFactor: 100,

		collected: false,

		//effects config
		bombDelay: 1.5,

		init: function(x, y, settings){
			this.parent(x, y, settings);

			this.addAnim('idle',5,[0]);
			this.addAnim('bomb',0.6,[1,2]);
			this.currentAnim = this.anims.idle;

			this.bombTimer = new ig.Timer();
			this.bombTimer.pause();
		},

		check: function(other){
			if(other instanceof EntityPlayer && !this.collected){

				if(this.type == "portalKey"){
					other.hasPortalKey = true;
					this.kill();
				}

				if(this.type == "explosive"){
					this.triggerBomb();
				}
			}
		},

		update: function(){
			this.parent();
			if(this.bombTimer.delta() > this.bombDelay){
				this.detonate();
			}
		},

		triggerBomb: function(){
			this.bombTimer.reset();
			this.currentAnim = this.anims.bomb;
			this.collected = true;
		},

		detonate: function(){
			this.kill();
			ig.game.spawnEntity(EntityExplosion, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
		}
	});

	EntityExplosion = ig.Entity.extend({
		explTimer: null,
		explDuration: 0.3,
		animSheet: new ig.AnimationSheet('media/febCrunch/bombExplosion.png', 180, 180),
		explSize: 180,
		knockBackMult: 1.0,
		enableKnockBack: true,

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collidesWith: ig.Entity.COLLIDES.PASSIVE,

		init: function(x, y, settings){
			this.parent(x, y, settings);
			this.size = {x: this.explSize, y: this.explSize};
			this.pos.x = x - this.explSize / 2 + 8;
			this.pos.y = y - this.explSize / 2 + 8;
			this.explTimer = new ig.Timer();

			this.addAnim('idle', 0.3, [0]);
			this.currentAnim = this.anims.idle;
		},

		update: function(){
			if(this.explTimer.delta() >= this.explDuration){
				this.kill();
			}
		},

		draw: function(){
			this.parent();
		},

		check: function(other){
			other.receiveDamage(10, this);
		},
	});
})