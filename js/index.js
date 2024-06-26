window.addEventListener("load", () => {

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const continueBtn = document.getElementById("continue-btn");

    // load sounds
    const jumpSound = new Audio("audio/jump-effect.mp3");
    const weaponSound = new Audio("audio/weapon-sound.mp3");
    const respawnSound = new Audio("audio/respawn-sound.mp3");

    const playerSounds = [jumpSound, weaponSound, respawnSound];

    // preload player sounds
    playerSounds.forEach(sound => {
        sound.preload = "auto";
        sound.currentTime = 0;
    });

    // in game sounds
    const victorySound = new Audio("audio/victory-sound.mp3");
    const passedLevelSound = new Audio("audio/passed-level.mp3");
    const deathSound = new Audio("audio/death-sound.mp3");
    const bossLevelSound = new Audio("audio/boss-level.mp3");
    const levelsSound = new Audio("audio/levels-bg-sound.mp3");

    const gameSounds = [victorySound, passedLevelSound, deathSound, bossLevelSound, levelsSound];

    // slightly lower volume, no preload
    gameSounds.forEach(sound => {
        sound.preload = "none";
        sound.currentTime = 0;
    });


    let game;

    function startGame() {
        game = new Game(playerSounds, gameSounds);
        game.start();
    }


    startBtn.addEventListener("click", () => {
        startGame();
    });


    restartBtn.addEventListener("click", () => {
        startGame();
    });


    continueBtn.addEventListener("click", () => {
        if (game) {
            game.nextLevel(game.level);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "KeyA") {
            if (game) {
                game.player.positionX = -1
            }
        }
        else if (event.code === "KeyD") {
            if (game) {
                game.player.positionX = 1;
            }
        }
        else if (event.code === "KeyW") {
            if (game) {
                game.player.jump(); 
            }
        }
        else if (event.code === "KeyP") {
            if (game) {
                if (game.endLevel) {
                    game.player.weapon.throwUp();
                }
                else {
                    game.player.weapon.throw("right");
                }
            }
        }
        else if (event.code === "KeyO") {
            if (game) {
                if (game.endLevel) {
                    game.player.weapon.throwUp()
                }
                else {
                    game.player.weapon.throw("left");
                }
            }
        }
    });

    document.addEventListener("keyup", (event) => {
        if (event.code === "KeyA" || event.code === "KeyD") {
            if (game) {
                game.player.positionX = 0;
            }
        }
    });
    
});