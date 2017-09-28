var startState = {}

startState.preload = function(){
    game.load.image("start-image", "kenney_holidaypack2016/start.png");
    game.load.spritesheet("button", "button/grey_button03.png");
    game.load.image("button-how", "kenney_holidaypack2016/grey_button03.png")
}

startState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'start-image');
    
    var button;
    var button_how;
    
    button = game.add.button(200, 331, 'button', startState.actionOnClick, this, 2, 1, 0);
    button_how = game.add.button(200, 420, 'button-how', startState.actionOnClickHowTo, this, 3, 2, 1);

}

startState.actionOnClick = function(){
    game.state.start("MainGame");
}

startState.actionOnClickHowTo = function(){
    game.state.start("HowTo");
}