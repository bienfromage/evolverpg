let cards = [
  {
    src: "img/1card.png",
    img: new Image,
    description: "Move 1 space",
    moves: 1,
    action: null
  },
  {
    src: "img/3card.png",
    img: new Image,
    description: "Move 3 spaces",
    moves: 3,
    action: null
  },
  {
    src: "img/a3plant.png",
    img: new Image,
    description: "Select a plot of ground to plant crops on or move 3 spaces.",
    moves: 3,
    action: null
  }
]

function moveCard(qtyMoves){
  //refers back to "moves" variable in the main game files
  moves = qtyMoves;
}

function movePlayer(action){
  switch(action){
    case 0://up
      //global variables
      playerVelocityY = -BLOCK_SIZE/MOVEMENT_TICKS;
      playerClock = 1;
    break;
    default:
      alert("Error: unknown player move");
  }
}
