ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',

	'plugins.director',

	'game.levels.introLevel',
	'game.levels.level1',
	'game.levels.level2',
	'game.levels.level3',
	'game.levels.level4',
	'game.levels.level5',
	'game.levels.level6',
	'game.levels.level7',
	'game.levels.finalLevel'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 150,
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'jump');

		this.myDirector = new ig.Director(this, [LevelLevel1, LevelLevel2, LevelLevel3, LevelLevel4, LevelLevel5, LevelLevel6, LevelLevel7, LevelFinalScreen]);
		this.myDirector.firstLevel();
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});

IntroScreen = ig.Game.extend({
	font: new ig.Font( 'media/LilyUPC.font.png' ),
	gravity: 150,

	init: function(){
		ig.input.bind(ig.KEY.SPACE, 'continue');
		this.loadLevel(LevelIntroLevel);
	},

	update: function(){
		this.parent();
		if(ig.input.pressed('continue')){
			ig.system.setGame(MyGame);
		}
	},

	draw: function(){
		this.parent();
		this.font.draw('Arrow keys to move. Space to jump.', ig.system.width/2, ig.system.height*8/10, ig.Font.ALIGN.CENTER);
		this.font.draw('Find the crate that reveals the exit, and escape!', ig.system.width/2, ig.system.height*8/10 + 48, ig.Font.ALIGN.CENTER);
		this.font.draw('- Push Space to Continue -', ig.system.width/2, ig.system.height*8/10 + 96, ig.Font.ALIGN.CENTER);
	}

});


// Start the Game with 60fps, a resolution of 1280 x 800, not scaled
ig.main( '#canvas', IntroScreen, 60, 1280, 800, 1);

});
