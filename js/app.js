
let horizontalPass = 100; //variable for horizontal moves
let verticalPass = 80; //variable for vertical moves
const HORIZONTAL_INIT = 200; //Horizontal Initial Position
const VERTICAL_INIT = 320; //Vertical Initial Position
let allEnemies = []; //array that holds  all of enemies
let player = new Player(HORIZONTAL_INIT, VERTICAL_INIT);
//Player class
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Placed the player object in a variable called player

// This class requires an update(), render() and  a handleInput() method.
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){
};
//This function controls how the player should move beside canvas, and also control what key was pressed
Player.prototype.handleInput = function(keyPress){
  console.log('player posição x: ' + this.x + ' player posição y: ' + this.y);
  if(keyPress === 'left' && this.x - horizontalPass >= 0){
    this.x -= horizontalPass;
  }else if(keyPress === 'up' && this.y - verticalPass >= 0){
    this.y -= verticalPass;
      if (keyPress === 'up' &&  this.y - verticalPass < 0){
        document.getElementById('modal').style.display = "block";}
    }else if(keyPress === 'right' && this.x + horizontalPass <= 400){
    this.x += horizontalPass;
  }else if(keyPress === 'down' && this.y + verticalPass <= 400){
    this.y += verticalPass;
  }
  };

//enemy object
function Enemy(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

var enemy = new Enemy();
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// multiplying any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt, playerm) {//?? pass player like an argument, give me an error, so i change to this: playerm
  this.x += this.speed * dt;
  // When enemies are off the canvas, they reappear randomly in different speeds
  if (this.x > 490) {
      this.x = -50;
      this.speed = 120 + Math.floor(Math.random() * 1000);
      };
//this code checks if the player and the enemy touch each others, if this happens, the player return to the initial
//position, the game ends when the player arrives in the water.
dist = Math.abs(this.x - player.x);
disty = Math.abs(this.y - player.y);

if ((17 > dist || 17 > disty) && player.x < this.x + 80 &&
    player.x + 80 > this.x &&
    player.y < this.y + 60 &&
    60 + player.y > this.y){
    player.x = HORIZONTAL_INIT;
    player.y = VERTICAL_INIT;
  }
};

// Place all enemy objects in an array
let allEnemiesPositions = [66, 145, 230];
function CreatingEnemies(){
    allEnemies = [];
    allEnemiesPositions.forEach(function(position){
      enemy = new Enemy(0, position, 300);
      allEnemies.push(enemy);
    });
}
  // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function startGame(){
  allEnemies = [];
  player = new Player(HORIZONTAL_INIT, VERTICAL_INIT)
  horizontalPass = 0;
  verticalPass = 0;
}

startGame();
//when a game starts the game is blocked, it just starts when a user click in the button PLAY
function playGame(){
  buttonplayagain = document.querySelector('.playagain');
  buttonplayagain.addEventListener('click', function(){
    horizontalPass = 100;
    verticalPass = 80;
    CreatingEnemies();
    player = new Player(HORIZONTAL_INIT, VERTICAL_INIT);
  })
}
//choose YES modal
function playAgainModal(){
   buttonYes = document.getElementById('yes');
   buttonYes.addEventListener('click', function(){
     horizontalPass = 100;
     verticalPass = 80;
     document.querySelector('#modal').style.display = "none";
     CreatingEnemies();
     player = new Player(HORIZONTAL_INIT, VERTICAL_INIT);
  })
}
//choose NOT modal, clean array enemies and block game
function NotPlayAgainModal(){
    buttonNot = document.getElementById('not');
    buttonNot.addEventListener('click', function(){
      allEnemies = [];
      gamEnd = true;
      document.querySelector('#modal').style.display = "none";
      player = new Player(HORIZONTAL_INIT, VERTICAL_INIT);
      horizontalPass = 0;
      verticalPass = 0;
   })
}

playGame();
playAgainModal();
NotPlayAgainModal();
