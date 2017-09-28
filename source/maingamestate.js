var mainGameState = {}

mainGameState.preload = function() {
    game.load.image("winter", "kenney_holidaypack2016/background-grinch.jpg");
    game.load.image("grinch",
                    "kenney_holidaypack2016/grinch.png");
    game.load.image("asteroid-large-01", "kenney_holidaypack2016/santa.png");
    game.load.image("asteroid-medium-01", "kenney_holidaypack2016/PNG/Topdown pack/Default size/topdownTile_40.png");
    game.load.image("asteroid-small-01", "kenney_holidaypack2016/PNG/RTS pack/Default size/RTSobject_05.png");
    game.load.image("laser", "SpaceShooterRedux/PNG/Lasers/laserRed16.png");
    game.load.image("snow-flake", "kenney_holidaypack2016/snowflake.png");

    game.load.audio("player_fire_01", "assets/audio/player_fire_01.mp3");
    game.load.audio("player_fire_02", "assets/audio/player_fire_02.mp3");
    game.load.audio("player_fire_03", "assets/audio/player_fire_03.mp3");
    game.load.audio("player_fire_04", "assets/audio/player_fire_04.mp3");
    game.load.audio("player_fire_05", "assets/audio/player_fire_05.mp3");
    game.load.audio("player_fire_06", "assets/audio/player_fire_06.mp3");
    game.load.audio("asteroid_hit_01", "assets/audio/asteroid_hit_01.mp3");
    game.load.audio("asteroid_hit_02", "assets/audio/asteroid_hit_02.mp3");
    game.load.audio("asteroid_hit_03", "assets/audio/asteroid_hit_03.mp3");
    game.load.audio("asteroid_hit_04", "assets/audio/asteroid_hit_04.mp3");
    game.load.audio("asteroid_hit_05", "assets/audio/asteroid_hit_05.mp3");
    game.load.audio("asteroid_hit_06", "assets/audio/asteroid_hit_06.mp3");
    /*game.load.audio("asteroid_death_01", "assets/audio/asteroid_death_01.mp3");
    game.load.audio("asteroid_death_01", "assets/audio/asteroid_death_02.mp3");
    game.load.audio("asteroid_death_01", "assets/audio/asteroid_death_03.mp3");*/
}

mainGameState.create = function() { 
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'winter');

    var shipX = game.width * 0.5;
    var shipY = game.height * 0.9;
    this.playerShip = game.add.sprite(shipX, shipY, 'grinch');
    this.playerShip.scale.setTo(0.5,0.5);
    this.playerShip.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.playerShip);
    this.cursors = game.input.keyboard.createCursorKeys();

    this.asteroidTimer = game.rnd.integerInRange(1.0, 3.0);
    this.asteroids = game.add.group();

    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.playerLaser = game.add.group();   
    this.fireTimer = 0.4;

    this.playerFireSfx = [];
    this.playerFireSfx.push(game.add.audio("player_fire_01"));
    this.playerFireSfx.push(game.add.audio("player_fire_02"));
    this.playerFireSfx.push(game.add.audio("player_fire_03"));
    this.playerFireSfx.push(game.add.audio("player_fire_04"));
    this.playerFireSfx.push(game.add.audio("player_fire_05"));
    this.playerFireSfx.push(game.add.audio("player_fire_06"));

    this.playerHitSfx = [];
    this.playerHitSfx.push(game.add.audio("asteroid_hit_01"));
    this.playerHitSfx.push(game.add.audio("asteroid_hit_02"));
    this.playerHitSfx.push(game.add.audio("asteroid_hit_03"));
    this.playerHitSfx.push(game.add.audio("asteroid_hit_04"));
    this.playerHitSfx.push(game.add.audio("asteroid_hit_05"));
    this.playerHitSfx.push(game.add.audio("asteroid_hit_06"));


    var textStyle = {
        font: "16px Arial", 
        fill: "#ffffff", 
        align: "center"
    }
    this.scoreTitle = game.add.text(game.width*0.85, 30, "SCORE: ", textStyle);
    this.scoreTitle.fixedToCamera = true;
    this.scoreTitle.anchor.setTo(0.5, 0.5);
    this.scoreValue = game.add.text(game.width*0.95, 30, "0", textStyle);
    this.scoreValue.fixedToCamera = true;
    this.scoreValue.anchor.setTo(0.5, 0.5);
    this.playerScore = 0;
    
    this.lifeTitle = game.add.text(game.width*0.1, 30, "LIFE: ", textStyle);
    this.lifeTitle.fixedToCamera = true;
    this.lifeTitle.anchor.setTo(0.5, 0.5);
    this.livesValue = game.add.text(game.width*0.2, 30, "3", textStyle);
    this.livesValue.fixedToCamera = true;
    this.livesValue.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(this.playerShip);
    this.playerLife = 3;
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
            this.playerLife--;
            this.asteroids.children[i].destroy();
        }
    }

    if (this.fireKey.isDown) {
        this.spawnLaser();
    }
    this.fireTimer -= game.time.physicsElapsed;
    for(var i = 0; i< this.playerLaser.children.length; i++){
        if(this.playerLaser.children[i].y < -200){
            this.playerLaser.children[i].destroy();
        }
    }
    game.physics.arcade.collide(this.asteroids, this.playerLaser, mainGameState.onAsteroidLaserCollision, null, this);
    this.scoreValue.setText(this.playerScore);

    game.physics.arcade.collide(this.asteroids, this.playerShip, mainGameState.onAsteroidPlayerCollision, null, this);
    this.livesValue.setText(this.playerLife);
    
    if ( this.playerLife <= 0 ) {
        game.state.start("GameOver");
    }
}

mainGameState.updatePlayer = function(){
    //move the ship with arrows
    if (this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = 300;
    }
    else if (this.cursors.left.isDown){
        this.playerShip.body.velocity.x = -300;
    } else{
        this.playerShip.body.velocity.x = 0;
        this.playerShip.body.velocity.y = 0;
    }
    //wall boundaries
    if ((this.playerShip.x > game.width) && (this.playerShip.body.velocity.x > 0)){
        this.playerShip.body.velocity.x = 0;
    }
    if ((this.playerShip.x < 0) && (this.playerShip.body.velocity.x < 0)){
        this.playerShip.body.velocity.x = 0;
    }
}

mainGameState.spawnAsteroid = function(){
    var arrAsteroid = [
        "asteroid-large-01", "asteroid-medium-01", "asteroid-small-01", "snow-flake"
    ];

    var x = game.rnd.integerInRange(0, game.width);
    var asteroid = game.add.sprite(x, 0, arrAsteroid[game.rnd.integerInRange(0,3)]);
    asteroid.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroid);
    var y = game.rnd.integerInRange(200, 20);
    asteroid.body.velocity.setTo(0, y);
    asteroid.body.angularVelocity = game.rnd.integerInRange(50,300);
    this.asteroids.add(asteroid);
}

mainGameState.spawnLaser = function(){
    if(this.fireTimer < 0){
        this.fireTimer = 0.4;

        var laser = game.add.sprite(this.playerShip.x, this.playerShip.y, "laser");
        laser.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(laser);
        laser.body.velocity.setTo(0, -200);

        this.playerLaser.add(laser);
    }
    var index = game.rnd.integerInRange(0, this.playerFireSfx.length - 1);
    this.playerFireSfx[index].play();
}

mainGameState.onAsteroidLaserCollision = function(object1, object2){   
    object1.pendingDestroy = true;
    object2.pendingDestroy = true;

    this.playerScore++;

    var index = game.rnd.integerInRange(0, this.playerHitSfx.length - 1);
    this.playerHitSfx[index].play();
}

mainGameState.onAsteroidPlayerCollision = function(object1, object2){
    if (object1.key.includes("asteroid")){
        object1.pendingDestroy = true;
    }else{
        object2.pendingDestroy = true;
    }
    this.playerLife --;
}















