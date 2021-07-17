"use strict";

const BLOCK_SIZE = 64;
const HAND_SIZE = 3;
const BOARD_SIZE = 10;//to calculate total # of tiles, do BOARD_SIZE^2
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
//images
let grassTile = new Image;
let testTile = new Image;
let deskTile = new Image;
let deck = new Image;

//game board array
let board = [];

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
  //update canvas in case of screen resize
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  //place ground tiles
  for(let i = 0-(BLOCK_SIZE-(window.innerWidth/2-BLOCK_SIZE/2)%BLOCK_SIZE); i < window.innerWidth; i+=BLOCK_SIZE){
    for(let j = 0-(BLOCK_SIZE-(window.innerHeight/2-BLOCK_SIZE/2)%BLOCK_SIZE); j < window.innerHeight; j+=BLOCK_SIZE){
      if(i>(window.innerWidth/2-BLOCK_SIZE/2+(BOARD_SIZE-playerRelX)*BLOCK_SIZE) || i<(window.innerWidth/2-BLOCK_SIZE/2-playerRelX*BLOCK_SIZE)|| j > (window.innerHeight/2-BLOCK_SIZE/2+(BOARD_SIZE-playerRelY)*BLOCK_SIZE) || j<(window.innerHeight/2-BLOCK_SIZE/2-playerRelY*BLOCK_SIZE))
        ctx.drawImage(testTile, i, j, BLOCK_SIZE, BLOCK_SIZE);
      else
        ctx.drawImage(grassTile, i, j, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
  //place player
  ctx.drawImage(playerSprite, window.innerWidth/2-BLOCK_SIZE/2, window.innerHeight/2-BLOCK_SIZE/2, BLOCK_SIZE, BLOCK_SIZE);
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

  //loop
  window.requestAnimationFrame(update);
}

//click event handler
canvas.addEventListener('click',function(event){
  let clickX = event.pageX;
  let clickY = event.pageY;

  //is the click is on the desk element?
  if(clickY > window.innerHeight - BLOCK_SIZE*1.7 && clickY < window.innerHeight - BLOCK_SIZE*0.7){
    //is the click on a card?
    for(let i = 0; i<HAND_SIZE; i++){
      if(clickX>BLOCK_SIZE/2+BLOCK_SIZE*(i+1)*2 && clickX<BLOCK_SIZE/2+BLOCK_SIZE*(i+1)*2+BLOCK_SIZE*3/2){
        //TODO replace with function to decide action
        moveCard(cards[i].moves);
      }
    }
  }
},false);

//start the game
init();
