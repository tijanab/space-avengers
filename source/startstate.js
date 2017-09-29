var startState = {}

startState.preload = function(){
    game.load.image("start-image", "start-background.png");
    game.load.spritesheet("button", "button/startgrey_button03.png");
    game.load.image("button-how", "button/howtogrey_button03.png");
    
    game.load.audio("wintery", "wintery loop.mp3");
}

var music;

startState.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'start-image');
    
    this.music = game.add.audio("wintery");
    this.music.play();
    this.music.loop = true;
    this.music.volume = 0.5;
    
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
