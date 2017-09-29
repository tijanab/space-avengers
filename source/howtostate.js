var howToState = {}

howToState.preload = function(){
    game.load.image("background", "howto-background.png");
    game.load.spritesheet("button", "button/startgrey_button03.png");
    game.load.image("button-back", "button/backgrey_button03.png")
}

howToState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');

    var button;
    var button_back;

    button = game.add.button(200, 540, 'button', howToState.actionOnClick, this, 2, 1, 0);
    button_back = game.add.button(2, 2, 'button-back', startState.actionOnClickBack, this, 3, 2, 1);
}
howToState.update = function(){
}

howToState.update = function(){

}

howToState.actionOnClick = function(){
    game.state.start("MainGame");
}

startState.actionOnClickBack = function(){
    game.state.start("Start");
}