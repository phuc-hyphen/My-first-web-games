const grid = document.querySelector(".grid");
let squares = Array.from(grid.querySelectorAll("div"));
const display_squares = document.querySelectorAll(".next_block div");
const display_score = document.getElementById(".score");

const width = 10;
const height = 20;
let current_position = 4;

const display_width = 4;
const display_index = 0;
let next_random = 0;

let score = 0;
let lines = 0;

// function to control
function control(e) {
  if (e.keyCode === 39) {
    move_right();
  } else if (e.keyCode === 37) {
    move_left();
  } else if (e.keyCode === 40) {
    move_down();
  }
}

//  the tetrominoes -- tetris formes
const L_form = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const Z_form = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];
const T_form = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];
const O_form = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];
const I_form = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const tetrominoes = [L_form, Z_form, O_form, T_form, I_form];

// selector randomly a form with a rotation
let random = Math.floor(Math.random() * tetrominoes.length);
let current_rotation = 0;
let current = tetrominoes[random][current_rotation];

// draw the shape
function draw() {
  current.forEach((index) => {
    squares[current_position + index].classList.add("block");
  });
}
// undraw the shape
function undraw() {
  current.forEach((index) => {
    squares[current_position + index].classList.remove("block");
  });
}

// the block goes down
function move_down() {
  undraw();
  current_position = current_position += width;
  draw();
  freeze_form();
}

// the block moves right
function move_right() {
  undraw();
  const right_edge = current.some(
    (index) => (current_position + index) % width === width - 1
  );
  if (!right_edge) {
    current_position += 1;
  }
  if (
    current.some((index) =>
      squares[current_position + index].classList.contains("block2")
    )
  ) {
    current_position -= 1;
  }
  draw();
}

// the block moves left
function move_left() {
  undraw();
  const left_edge = current.some(
    (index) => (current_position + index) % width === 0
  );
  if (!left_edge) {
    current_position -= 1;
  }
  if (
    current.some((index) =>
      squares[current_position + index].classList.contains("block2")
    )
  ) {
    current_position += 1;
  }
  draw();
}
// rotate the block
function rotate() {
  undraw();
  current_rotation++;
  if (current_rotation === current.length) {
    current_rotation = 0;
  }
  current = tetrominoes[random][current_rotation];
  draw();
}
// show next block in display squares

const small_tetrominoes = [
  [1, display_width + 1, display_width * 2 + 1, 2] /* L form */,
  [0, display_width, display_width + 1, display_width * 2 + 1] /* Z form */,
  [1, display_width, display_width + 1, display_width + 2] /* T form  */,
  [0, 1, display_width, display_width + 1] /* O form */,
  [
    1,
    display_width + 1,
    display_width * 2 + 1,
    display_width * 3 + 1,
  ] /* I form */,
];
function display_shape() {
  display_squares.forEach((square) => {
    square.classList.remove("block");
  });
  small_tetrominoes[next_random].forEach((index) => {
    display_squares[display_index + index].classList.add("block");
  });
}

//freeze the shape
function freeze_form() {
  // if block has settled
  if (
    current.some(
      (index) =>
        squares[current_position + index + width].classList.contains("floor") ||
        squares[current_position + index + width].classList.contains("block2")
    )
  ) {
    // make it block2
    current.forEach((index) =>
      squares[index + current_position].classList.add("block2")
    );
    // start a new tetrominoes falling
    random = next_random;
    next_random = Math.floor(Math.random() * tetrominoes.length);
    current = tetrominoes[random][current_rotation];
    current_position = 4;
    draw();
    display_shape();
  }
}
let time_id;

function start() {
  if (time_id) {
    clearInterval(time_id);
    time_id = null;
  } else {
    draw();
    time_id = setInterval(move_down, 1000);
    next_random = Math.floor(Math.random() * tetrominoes.length);
    display_shape();
  }
}

function game_over() {
  if (
    current.some((index) =>
      squares[current_position + index + width].classList.contains("block2")
    )
  ) {
    display_score.innerHTML = "end";
    clearInterval(time_id);
  }
}

function add_score() {
  for (current_index = 0; current_index < 199; current_index += 10) {
    const row = [
      currentIndex,
      currentIndex + 1,
      currentIndex + 2,
      currentIndex + 3,
      currentIndex + 4,
      currentIndex + 5,
      currentIndex + 6,
      currentIndex + 7,
      currentIndex + 8,
      currentIndex + 9,
    ];
    if (row.every((index) => squares[index].classList.contains("block2"))) {
      score += 10;
      lines += 1;
      display_score.innerHTML = score;
      row.forEach((index) => {
        squares[index].style.backgroundImage = "none";
        squares[index].classList.remove("block2") ||
          squares[index].classList.remove("block");
      });
      //splice array
      const squaresRemoved = squares.splice(current_index, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}
function main() {
  document.addEventListener("keyup", control);
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
