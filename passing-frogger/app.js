const squares = document.querySelectorAll(".grid div");
const score = document.getElementById("score");
const button = document.getElementById("start_btn");
const time_left = document.getElementById("time_left");

let frog_index = 76;
let home_index = 4;
let interval_id;
let width = 9;

let car_l1 = [45, 47, 51, 53];
let car_l2 = [54, 56, 60, 62];

let wood_l1 = [18, 20, 22, 24, 26];
let wood_l2 = [27, 29, 31, 33, 35];

let river_index = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];
let road_index = [
  45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
];

//draw player
squares[frog_index].classList.add("frog");

//draw home
squares[home_index].classList.add("home");

//draw starting point
squares[frog_index].classList.add("start_point");

//draw river
river_index.forEach((index) => squares[index].classList.add("river"));

//draw road
road_index.forEach((index) => squares[index].classList.add("road"));

// move the frog
function move_frog(e) {
  // clean the previous images
  if (squares[frog_index].classList.contains("frog_on_road")) {
    // if frog was on road
    squares[frog_index].classList.remove("frog_on_road");
    squares[frog_index].classList.add("road");
  } else if (squares[frog_index].classList.contains("frog_on_wood")) {
    //if frog was on wood
    squares[frog_index].classList.remove("frog_on_wood");
    squares[frog_index].classList.add("wood");
  } else {
    squares[frog_index].classList.remove("frog");
  }

  switch (e.keyCode) {
    case 37: // move left
      if (frog_index % width !== 0) frog_index -= 1; // if player index is not next to the border left
      break;
    case 39: // move right
      if (frog_index % width < width - 1) frog_index += 1; // if player is not next to the right border
      break;
    case 40: // move down
      if (frog_index + width < 81) frog_index += width;
      break;
    case 38: //move up
      if (frog_index - width > 0) frog_index -= width;
      break;
  }
  // if frog in on road
  if (squares[frog_index].classList.contains("road")) {
    squares[frog_index].classList.remove("road");
    squares[frog_index].classList.add("frog_on_road");
  } else if (squares[frog_index].classList.contains("wood")) {
    //if frog is on wood
    squares[frog_index].classList.remove("wood");
    squares[frog_index].classList.add("frog_on_wood");
  } else {
    squares[frog_index].classList.add("frog");
  }

  // game win
  if (squares[frog_index].classList.contains("home")) {
    score.innerHTML = "YOU WIN ";
    alert("YOU WIN");
    clearInterval(interval_id);
  }
}

//draw car
function draw_car() {
  //car first line
  for (let i = 0; i <= car_l1.length - 1; i++) {
    squares[car_l1[i]].classList.remove("car");
    squares[car_l1[i]].classList.add("road");
  }
  for (let i = 0; i <= car_l1.length - 1; i++) {
    car_l1[i] -= 1;
    if (car_l1[i] < 45) {
      car_l1[i] = 53;
    }
  }
  for (let i = 0; i <= car_l1.length - 1; i++) {
    squares[car_l1[i]].classList.remove("road");
    squares[car_l1[i]].classList.add("car");
  }

  // car second line
  for (let i = 0; i <= car_l2.length - 1; i++) {
    squares[car_l2[i]].classList.remove("car");
    squares[car_l2[i]].classList.add("road");
  }
  for (let i = 0; i <= car_l2.length - 1; i++) {
    car_l2[i] += 1;
    if (car_l2[i] > 62) {
      car_l2[i] = 54;
    }
  }
  for (let i = 0; i <= car_l2.length - 1; i++) {
    squares[car_l2[i]].classList.remove("road");
    squares[car_l2[i]].classList.add("car");
  }

  //GAME OVER
  if (squares[frog_index].classList.contains("car", "frog")) {
    squares[frog_index].classList.add("dead_on_road");
    score.innerHTML = "GAME OVER";
    alert("GAME OVER");
    clearInterval(interval_id);
  }
}

//draw wood
function draw_wood() {

    //wood first line
  for (let i = 0; i <= wood_l1.length - 1; i++) {
    if (frog_index === wood_l1[i]) { // if the frog is on the wood 
      squares[wood_l1[i]].classList.remove("frog_on_wood");
      frog_index -= 1;
      if(frog_index < 18){// the frog go along with the wood until it touche the bord of the map
        game_over()
      }
    } else {
      squares[wood_l1[i]].classList.remove("wood");
    }
    squares[wood_l1[i]].classList.add("river");
  }
  for (let i = 0; i <= wood_l1.length - 1; i++) {
    wood_l1[i] -= 1;
    if (wood_l1[i] < 18) {
      wood_l1[i] = 26;
    }
  }
  for (let i = 0; i <= wood_l1.length - 1; i++) {
    squares[wood_l1[i]].classList.remove("river");
    if (frog_index === wood_l1[i]) {
      squares[wood_l1[i]].classList.add("frog_on_wood");
    } else {
      squares[wood_l1[i]].classList.add("wood");
    }
  }

  // wood second line
  for (let i = 0; i <= wood_l2.length - 1; i++) {
    if (frog_index === wood_l2[i]) { // if the frog is on the wood 
      squares[wood_l2[i]].classList.remove("frog_on_wood");
      frog_index += 1;
      if(frog_index >35){// the frog go along with the wood until it touche the bord of the map
        game_over()
      }
    } else {
      squares[wood_l2[i]].classList.remove("wood");
    }
    squares[wood_l2[i]].classList.add("river");
  }
  for (let i = 0; i <= wood_l2.length - 1; i++) {
    wood_l2[i] += 1;
    if( wood_l2[i] > 35) {wood_l2[i] = 27;}
  }
  for (let i = 0; i <= wood_l2.length - 1; i++) {
    squares[wood_l2[i]].classList.remove("river");
    if (frog_index === wood_l2[i]) {
      squares[wood_l2[i]].classList.add("frog_on_wood");
    } else {
      squares[wood_l2[i]].classList.add("wood");
    }
  }


  //GAME OVER
  function game_over() {
    squares[frog_index].classList.add("dead_in_river");
    score.innerHTML = "GAME OVER";
    alert("GAME OVER");
    clearInterval(interval_id);
  }

  if (squares[frog_index].classList.contains("river", "frog")) {
    game_over();
  }
}

let current_time = time_left.textContent;

function count_down() {
  current_time--;
  time_left.textContent = current_time;
  if (current_time === 0) {
    score.innerHTML = "GAME OVER !";
    alert("TIME IS UP");
    clearInterval(interval_id);
  }
}

interval_id = setInterval(() => {
  draw_car();
  draw_wood();
  count_down();
}, 1000); //set up action repeated

function main() {
  document.addEventListener("keydown", move_frog);
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


