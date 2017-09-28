var howToState = {}

howToState.preload = function(){
    game.load.image("background", "kenney_holidaypack2016/howto.png");
    game.load.spritesheet("button", "button/grey_button02.png");
}

howToState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');

    var button;

    button = game.add.button(200, 553, 'button', howToState.actionOnClick, this, 2, 1, 0);
}
howToState.update = function(){
}

howToState.update = function(){

}

howToState.actionOnClick = function(){
    game.state.start("Start");
}