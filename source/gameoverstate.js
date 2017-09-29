var gameOverState = {}

gameOverState.preload = function(){
    game.load.image("game-over", "gameover-background.png");
    game.load.spritesheet("button", "button/playagaingrey_button03.png");
    
    //game.load.audio("wintery", "wintery loop.mp3");
}

gameOverState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'game-over');
    
    /*this.music = game.add.audio("wintery");
    this.music.play();
    this.music.loop = true;
    this.music.volume = 0.5;*/
    
    var button;
}

gameOverState.update = function(){
    button = game.add.button(game.world.centerX -95, 400, 'button', gameOverState.actionOnClick, this, 2, 1, 0);
    
    /*var scoreTitle = game.add.text(game.width * 0.5, game.height * 0.6, "Your Score:");
    scoreTitle.anchor.setTo(0.5, 0.5);

    var scoreValue = game.add.text(game.width * 0.5, game.height * 0.8, score);
    scoreValue.anchor.setTo(0.5, 0.5); */
    
}

gameOverState.actionOnClick = function(){
    game.state.start("MainGame");
}