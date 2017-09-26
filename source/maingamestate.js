var mainGameState = { 
}

mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    game.load.image("space", "images/space.jpeg");
    game.load.image("player-ship",
    "assets/images/player-ship.png");
    game.load.image("asteroid-large-01", "assets/images/asteroid-large-01.png");
    game.load.image("asteroid-medium-01", "assets/images/asteroid-medium-01.png");
    game.load.image("asteroid-small-01", "assets/images/asteroid-small-01.png");
}

mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'space');

    var shipX = game.width * 0.5;
    var shipY = game.height * 0.5;

    this.playerShip = game.add.sprite(shipX, shipY, 'player-ship');

    this.playerShip.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this.playerShip);

    this.cursors = game.input.keyboard.createCursorKeys();

    this.asteroidTimer = game.rnd.integerInRange(1.0, 3.0);
    
    this.asteroids = game.add.group();
    //getRandom(0,3); 
    //use this to randomize a asteroid from the group?

}

mainGameState.update = function() {
    this.updatePlayer();

    this.asteroidTimer -= game.time.physicsElapsed;
    if(this.asteroidTimer <= 0.0){
        this.spawnAsteroid();
        this.asteroidTimer = game.rnd.integerInRange(1.0, 3.0);;
    }

    for(var i = 0; i < this.asteroids.children.length; i++){
        if(this.asteroids.children[i].y > (game.height + 200)){
            this.asteroids.children[i].destroy();
        }
    }

}

mainGameState.updatePlayer = function(){
    //move the ship with arrows
    if (this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = 300;
    }
    else if (this.cursors.left.isDown){
        this.playerShip.body.velocity.x = -300;
    }
    else if (this.cursors.down.isDown){
        this.playerShip.body.velocity.y = 300;
    }
    else if (this.cursors.up.isDown){
        this.playerShip.body.velocity.y = -300;
    } else{
        this.playerShip.body.velocity.x = 0;
        this.playerShip.body.velocity.y = 0;
    }
    //wall boundaries
    if ((this.playerShip.x > game.width) &&         (this.playerShip.body.velocity.x > 0)){
        this.playerShip.body.velocity.x = 0;
    }
    if ((this.playerShip.x < 0) && (this.playerShip.body.velocity.x < 0)){
        this.playerShip.body.velocity.x = 0;
    }
    if ((this.playerShip.y > game.height) && (this.playerShip.body.velocity.y > 0)){
        this.playerShip.body.velocity.y = 0;
    }
    if ((this.playerShip.y < 0) && (this.playerShip.body.velocity.y < 0)){
        this.playerShip.body.velocity.y = 0;
    }
}

mainGameState.spawnAsteroid = function(){
    var xLarge = game.rnd.integerInRange(0, game.width);
    var asteroidLarge = game.add.sprite(xLarge, 0, "asteroid-large-01");
    asteroidLarge.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroidLarge);
    var y = game.rnd.integerInRange(200, 20);
    asteroidLarge.body.velocity.setTo(0, y);
    this.asteroids.add(asteroidLarge);
    
    var xMedium = game.rnd.integerInRange(0, game.width);
    var asteroidMedium = game.add.sprite(xMedium, 0, "asteroid-medium-01");
    asteroidMedium.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroidMedium);
    var y = game.rnd.integerInRange(200, 20);
    asteroidMedium.body.velocity.setTo(0, y);
    this.asteroids.add(asteroidMedium);
    
    var xSmall = game.rnd.integerInRange(0, game.width);
    var asteroidSmall = game.add.sprite(xSmall, 0, "asteroid-small-01");
    asteroidSmall.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroidSmall);
    var y = game.rnd.integerInRange(200, 20);
    asteroidSmall.body.velocity.setTo(0, y);
    this.asteroids.add(asteroidSmall);
}