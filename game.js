"use strict";

const BLOCK_SIZE = 64;
const HAND_SIZE = 3;
const BOARD_SIZE = 10;//to calculate total # of tiles, do BOARD_SIZE^2
const FONT_COLOR = "#ffffff";
const CLOCK_LENGTH = 64;
const MOVEMENT_TICKS = 4;
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
//images
let grassTile = new Image;
let testTile = new Image;
let deskTile = new Image;
let deck = new Image;

//game board array
let board = [];

//game variables
let clock = 0;
let moves = 0;
let playerClock = 0;
let playerVelocityX = 0;
let playerVelocityY = 0;
let playerMoveModifiedY = 0;

//player variables
let playerSprite = new Image; //player playerSprite
let playerRelX = BOARD_SIZE/2, playerRelY = BOARD_SIZE/2; //x and y relative to the game board

function init(){
  //load image files
  grassTile.src = "img/grass_basic.png";
  deskTile.src="img/desk.png";
  deck.src="img/deck.png";
  testTile.src="img/test_tile.png";
  for(let i = 0; i<HAND_SIZE; i++){
    cards[i].img.src = cards[i].src;
  }
  playerSprite.src= "img/peasant.png";
  for(let i = 0; i < BOARD_SIZE; i ++){
    board.push([]);
    for(let j = 0; j< BOARD_SIZE; j++){
      board[i].push(null);
    }
  }

  //begin regular update step
  window.requestAnimationFrame(update);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(playerClock !== 0){
    playerClock++;
    playerMoveModifiedY+=playerVelocityY;
    console.log(playerMoveModifiedY);
    if(playerClock === MOVEMENT_TICKS + 1){
      playerVelocityX = 0;
      playerVelocityY = 0;
      playerClock = 0;
      //update player position relative to board
      playerRelY += playerMoveModifiedY/BLOCK_SIZE;
      playerMoveModifiedY = 0;
    }
  }

  //update canvas in case of screen resize
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  //update player position relative to window
  let playerX = window.innerWidth/2-BLOCK_SIZE/2
  let playerY = window.innerHeight/2-BLOCK_SIZE/2

  //place ground tiles
  for(let i = 0-(BLOCK_SIZE-(window.innerWidth/2-BLOCK_SIZE/2)%BLOCK_SIZE); i < window.innerWidth; i+=BLOCK_SIZE){
    for(let j = 0-(BLOCK_SIZE-(window.innerHeight/2-BLOCK_SIZE/2)%BLOCK_SIZE); j < window.innerHeight; j+=BLOCK_SIZE){
      if(i>(window.innerWidth/2-BLOCK_SIZE/2+(BOARD_SIZE-playerRelX)*BLOCK_SIZE) || i<(window.innerWidth/2-BLOCK_SIZE/2-playerRelX*BLOCK_SIZE)|| j > (window.innerHeight/2-BLOCK_SIZE/2+(BOARD_SIZE-playerRelY)*BLOCK_SIZE) || j<(window.innerHeight/2-BLOCK_SIZE/2-playerRelY*BLOCK_SIZE))
        ctx.drawImage(testTile, i, j, BLOCK_SIZE, BLOCK_SIZE);
      else
        ctx.drawImage(grassTile, i, j-playerMoveModifiedY, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
  //place player
  ctx.drawImage(playerSprite, playerX, playerY, BLOCK_SIZE, BLOCK_SIZE);
  //place desk
  for(let i = 0; i < window.innerWidth; i+=BLOCK_SIZE*2){
    ctx.drawImage(deskTile, i, window.innerHeight-BLOCK_SIZE*2, BLOCK_SIZE*2, BLOCK_SIZE*2);
  }
  //place deck
  ctx.drawImage(deck, BLOCK_SIZE/2, window.innerHeight-BLOCK_SIZE*1.7, BLOCK_SIZE*3/2, BLOCK_SIZE*3/2);
  //place cards *refers to cards.js
  for(let i = 0; i<HAND_SIZE; i++){
    ctx.drawImage(cards[i].img, BLOCK_SIZE/2+BLOCK_SIZE*(i+1)*2, window.innerHeight-BLOCK_SIZE*1.7, BLOCK_SIZE*3/2, BLOCK_SIZE*3/2);
  }
  //place move counter
  ctx.fillStyle = FONT_COLOR;
  ctx.font = BLOCK_SIZE + "px monospace";
  ctx.fillText(moves,window.innerWidth - BLOCK_SIZE, BLOCK_SIZE);

  //loop

  clock = (clock + 1) % CLOCK_LENGTH;
  window.requestAnimationFrame(update);
}

//click event handler
canvas.addEventListener('click',function(event){
  if(playerClock === 0){
    let clickX = event.pageX;
    let clickY = event.pageY;

    //is the click is on the desk element?
    if(clickY > window.innerHeight - BLOCK_SIZE*1.7 && clickY < window.innerHeight - BLOCK_SIZE*0.7){
      //is the click on a card?
      for(let i = 0; i<HAND_SIZE; i++){
        if(clickX>BLOCK_SIZE/2+BLOCK_SIZE*(i+1)*2 && clickX<BLOCK_SIZE/2+BLOCK_SIZE*(i+1)*2+BLOCK_SIZE*3/2){
          //TODO replace with function to decide action
          //cards.js => moveCards(qtyMoves)
          moveCard(cards[i].moves);
        }
      }
    }else if(clickY - clickX < 0){
        movePlayer(0);
    }
  }
},false);

//start the game
init();
