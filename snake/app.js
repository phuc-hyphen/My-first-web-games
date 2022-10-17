const squares = document.querySelectorAll(".grid div");
const display_score = document.getElementById("score");
const start_but = document.getElementById("start");

const width = 10;
let current_index = 0; //so first div in our grid
let current_apple = 0; //so first div in our grid
let snake = [2, 1, 0]; // so div in our grid 2:the head --- 0:the end --- 1: the body
let direction = 1;
let score = 0;
let speed = 1;
let interval_time = 0;
let interval = 0;

//to start and restart
function start() {
  // reset the snake
  snake.forEach((index) => squares[index].classList.remove("snake"));
  squares[current_apple].classList.remove('apple');
  clearInterval(interval); // clear the interval
  score = 0;
  // random apple
  random_apple()
  
  direction = 1;
  display_score.innerHTML = score;
  interval_time = 500;
  current_index = 0;
  snake = [2, 1, 0];
  snake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(move_out_come, interval_time);
}

// function deals with all the ove outcomes of the snake
function move_out_come() {
  // function deals with snake hitting the board and hitting it self
  if (
    (snake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
    (snake[0] % width === width -1 && direction === 1) || //if snake hits right wall
    (snake[0] % width === 0 && direction === -1) || //if snake hits left wall
    (snake[0] - width < 0 && direction === -width) ||  //if snake hits the top
    squares[snake[0] + direction].classList.contains('snake') //if snake goes into itself
  ){
    alert('You lose')
    return clearInterval(interval); //this will clear the interval if any of the above happen
  }
    
  const tail = snake.pop(); // remove the last ove of the array and show it
  squares[tail].classList.remove('snake'); // remove the classlist snake from the tail
  snake.unshift(snake[0] + direction); //give the direction of the head

  // function deals with snake hitting apple
  if (squares[snake[0]].classList.contains("apple")) {
    squares[snake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    snake.push(tail);

    // random_apple
    random_apple();
    //score
    score++;
    display_score.textContent = score;
    clearInterval(interval);
    interval_time = interval_time * speed;
    interval = setInterval(move_out_come, interval_time);
  }
  squares[snake[0]].classList.add("snake");
}

function random_apple() {
  do {
    current_apple = Math.floor(Math.random() * squares.length);
  } while (squares[current_apple].classList.contains("snake")); // make sure the apple was eaten
  squares[current_apple].classList.add("apple");
}

//assign a function to keycode
// function control (e) {
//   squares[current_index].classList.remove('snake')
//   switch (e.Keycode) {
//     case 39: 
//       direction = +1
//       break
//     case 38: //up arrow
//       direction = -width
//       break
//     case 40: // down arrow
//       direction = +width
//       break
//     case 37: //left arrow
//       direction = -1 //the snake will go left one div
//       break
//   }
// }
function control(e) {
  squares[current_index].classList.remove("snake");

  if (e.keyCode === 39) {
    direction = 1; // right arrow
  } else if (e.keyCode === 38) {
    direction = - width; //up arrow
  } else if (e.keyCode === 37) {
    direction = -1; //left arrow
  } else if (e.keyCode === 40) {
    direction = + width; // down arrow
  }
}

//---------------------------------------------------------//
if (document.readyState == "loading") {
  // if the document is still loading use this event code
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keyup", control);
    start_but.addEventListener("click", start);
  });
} else {
  document.addEventListener("keyup", control);
  start_but.addEventListener("click", start);
}
