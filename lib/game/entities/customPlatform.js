ig.module(
	'game.entities.customPlatform'
)
.requires(
	'plugins.entities.platform'
)
.defines(function(){
	EntityCustomPlatform = EntityPlatform.extend({
			animSheet: new ig.AnimationSheet('media/febCrunch/platform.png', 75, 8),
			size: {x:75 , y:8},
			route: "",

			init: function(x, y, settings){
				this.parent(x, y, settings);

				this.addAnim('idle', 1, [0]);
				this.currentAnim = this.anims.idle;
			},

			receiveDamage: function(amount, from){
				console.log("Damage received on platform!");
				this.parent(amount, other);
			}

	});
});