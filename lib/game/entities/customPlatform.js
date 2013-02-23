ig.module(
	'game.entities.customPlatform'
)
.requires(
	'plugins.entities.platform'
)
.defines(function(){
	EntityCustomPlatform = EntityPlatform.extend({
			animSheet: new ig.AnimationSheet('media/febCrunch/platform.png', 96, 32),
			size: {x:96 , y:32},
			route: "",

			init: function(x, y, settings){
				this.parent(x, y, settings);

				this.addAnim('idle', 1, [0]);
				this.currentAnim = this.anims.idle;
			},

	});
});