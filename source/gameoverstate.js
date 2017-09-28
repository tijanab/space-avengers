var gameOverState = {}

gameOverState.preload = function(){
    game.load.image("game-over", "kenney_holidaypack2016/GAME OVER.png");
    game.load.spritesheet("button", "button/button-playagain.png");
}

gameOverState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'game-over');
    
    var button;
}

gameOverState.update = function(){
    button = game.add.button(game.world.centerX -95, 400, 'button', gameOverState.actionOnClick, this, 2, 1, 0);
    
}

gameOverState.actionOnClick = function(){
    game.state.start("MainGame");
}