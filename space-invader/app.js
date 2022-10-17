const squares = document.querySelectorAll(".grid div");
const score = document.getElementById("score");

let width = 15;
let player_index = 202;
let alien_index = 0;
let alien_killed = [];
let result = 0;
let direction = 1;
let interval_id;

//define aliens invaders
const aliens_invaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//draw the aliens invaders
aliens_invaders.forEach((index) =>
  squares[alien_index + index].classList.add("alien")
);

//draw player
squares[player_index].classList.add("ship");

// move the player
function move_player(e) {
  squares[player_index].classList.remove("ship");

  switch (e.keyCode) {
    case 37: // move left
      if (player_index % width !== 0) player_index -= 1; // if player index is not next to the border left
      break;
    case 39: // move right
      if (player_index % width < width - 1) player_index += 1; // if player is not next to the right border
      break;
    case 40: // move down
      if (player_index + width < 225) player_index += width;
      break;
    case 38: //move up
      if (player_index - width > 0) player_index -= width;
      break;
  }
  squares[player_index].classList.add("ship");
}
//draw player
squares[player_index].classList.add("ship");

function move_aliens() {
  const left_edge = aliens_invaders[0] % width === 0;
  const right_edge =
    aliens_invaders[aliens_invaders.length - 1] % width === width - 1;

  // if the invaders touch the borders
  if ((left_edge && direction === -1) || (right_edge && direction === 1)) {
    direction = width; // invaders go down
  } else if (direction === width) {
    if (left_edge) direction = 1;
    // invaders go right
    else direction = -1; // invaders go left
  }

  for (let i = 0; i <= aliens_invaders.length - 1; i++) {
    squares[aliens_invaders[i]].classList.remove("alien");
  }
  for (let i = 0; i <= aliens_invaders.length - 1; i++) {
    aliens_invaders[i] += direction;
  }
  for (let i = 0; i <= aliens_invaders.length - 1; i++) {
    if (!alien_killed.includes(i)) {
      squares[aliens_invaders[i]].classList.add("alien");
    }
  }
  //decide game over
  if (squares[player_index].classList.contains("alien", "ship")) {
    squares[player_index].classList.add("boom");
    score.innerHTML = "GAME OVER";
    alert("GAME OVER");
    clearInterval(interval_id);
  }

  for (let i = 0; i <= aliens_invaders.length; i++) {
    if (aliens_invaders[i] > squares.length) {
      score.innerHTML = "GAME OVER";
      alert("GAME OVER ");
      clearInterval(interval_id);
    }
  }

  // decide game win
  if (alien_killed.length === aliens_invaders.length) {
    score.textContent = "you win ";
    alert("YOU WIN");
  }
}

interval_id = setInterval(move_aliens, 500); //set up action repeated

function shoot(e) {
  let laser_id;
  let current_laser = player_index;

  // shooting laser action
  function move_laser() {
    squares[current_laser].classList.remove("bullet");
    current_laser -= width;
    squares[current_laser].classList.add("bullet");

    if (squares[current_laser].classList.contains("alien")) {
      squares[current_laser].classList.remove("bullet");
      squares[current_laser].classList.remove("alien");
      squares[current_laser].classList.add("boom");

      setTimeout(() => squares[current_laser].classList.remove("boom"), 50);
      clearInterval(laser_id);

      const alien_takedown = aliens_invaders.indexOf(current_laser);
      alien_killed.push(alien_takedown);
      result++;
      score.textContent = result;
    }

    if (current_laser < width) {
      clearInterval(laser_id);
      setTimeout(() => squares[current_laser].classList.remove("bullet"), 50);
    }
  }

  switch (e.keyCode) {
    case 32:
      laser_id = setInterval(move_laser, 100);
      break;
  }
}

function main() {
  document.addEventListener("keydown", move_player);
  document.addEventListener("keyup", shoot);
}

/*---------------------------------------Main------------------------------------*/
// execution code

if (document.readyState == "loading") {
  // if the document is still loading use this event code

  document.addEventListener("DOMContentLoaded", () => {
    main();
  });
} else {
  main();
}
