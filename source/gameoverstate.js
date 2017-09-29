var gameOverState = {}

gameOverState.preload = function(){
    game.load.image("game-over", "gameover-background.png");
    game.load.spritesheet("button", "button/playagaingrey_button03.png");
}

gameOverState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'game-over');
    
    var button;
    
    var textStyle = {font: "25px Arial", fill: "#FF0F00", align: "center"};

    var scoreValue = game.add.text(game.width * 0.7, game.height * 0.515, game.global.score, textStyle);
    scoreValue.anchor.setTo(0.5, 0.5);
}

gameOverState.update = function(){
    button = game.add.button(game.world.centerX -95, 400, 'button', gameOverState.actionOnClick, this, 2, 1, 0);
    
}

gameOverState.actionOnClick = function(){
    game.state.start("MainGame");
}