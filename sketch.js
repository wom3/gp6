/*

The Game Project 6 – Adding game mechanics

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var collectable;
var canyon;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var treePos_y;
var clouds;
var mountains;
var cameraPosX;

var collectables;
var canyons;
var game_score;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  collectable = {
    x_pos: 100,
    y_pos: floorPos_y - 25,
    size: 50,
    isFound: false,
  };

  canyon = {
    x_pos: 200,
    width: 100,
  };

  trees_x = [300, 500, 900, 1150];
  treePos_y = height / 2;

  clouds = {
    x_pos: [0, 300, 600],
    y_pos: [100, 70, 130],
    size: [90, 110, 80],
  };

  mountains = {
    x_pos: [-400, -280, 100, 400],
    y_pos: 100,
  };

  cameraPosX = 0;

  collectables = [
    {
      x_pos: 100,
      y_pos: floorPos_y - 25,
      size: 40,
      isFound: false,
    },
    {
      x_pos: 200,
      y_pos: floorPos_y - 25,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 300,
      y_pos: floorPos_y - 25,
      size: 40,
      isFound: false,
    },
    {
      x_pos: 400,
      y_pos: floorPos_y - 25,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 600,
      y_pos: floorPos_y - 25,
      size: 40,
      isFound: false,
    },
  ];

  canyons = [
    {
      x_pos: 200,
      width: 130,
    },
    {
      x_pos: 400,
      width: 70,
    },
    {
      x_pos: 600,
      width: 150,
    },
  ];

  game_score = 0;
}

function draw() {
  cameraPosX = gameChar_x - width / 2;
  background(100, 155, 255); //fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
  push();
  translate(-cameraPosX, 0);

  // draw mountains
  drawMountains();

  // draw trees
  drawTrees();

  // draw clouds
  drawClouds();

  // check collectable
  for (var i = 0; i < collectables.length; i++) {
    checkCollectable(collectables[i]);
  }

  //draw the canyon
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
  }

  //the game character
  stroke(0);
  if (isLeft && isFalling) {
    // add your jumping-left code
    // face
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 20,
      gameChar_x - 10,
      gameChar_y - 15,
      gameChar_x - 12,
      gameChar_y - 15
    );

    //Calf
    fill(0, 100, 0);
    rect(gameChar_x - 12, gameChar_y - 15, 3, 4);
    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 12,
      gameChar_y - 11,
      gameChar_x - 9,
      gameChar_y - 11,
      gameChar_x - 8,
      gameChar_y - 3,
      gameChar_x - 15,
      gameChar_y - 3
    );

    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 1,
      gameChar_y - 20,
      gameChar_x + 4,
      gameChar_y - 20,
      gameChar_x - 1,
      gameChar_y - 15,
      gameChar_x - 3,
      gameChar_y - 15
    );

    //Calf
    fill(0, 100, 0);
    rect(gameChar_x - 3, gameChar_y - 15, 3, 4);
    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 3,
      gameChar_y - 11,
      gameChar_x,
      gameChar_y - 11,
      gameChar_x + 1,
      gameChar_y - 3,
      gameChar_x - 6,
      gameChar_y - 3
    );
  } else if (isRight && isFalling) {
    // add your jumping-right
    // face
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 20,
      gameChar_x - 4,
      gameChar_y - 20,
      gameChar_x - 2,
      gameChar_y - 16,
      gameChar_x - 6,
      gameChar_y - 16
    );

    //Calf
    fill(0, 100, 0);
    rect(gameChar_x - 6, gameChar_y - 16, 3, 4);
    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 6,
      gameChar_y - 12,
      gameChar_x - 3,
      gameChar_y - 12,
      gameChar_x - 1,
      gameChar_y - 4,
      gameChar_x - 7,
      gameChar_y - 4
    );

    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 4,
      gameChar_y - 20,
      gameChar_x + 8,
      gameChar_y - 20,
      gameChar_x + 10,
      gameChar_y - 16,
      gameChar_x + 6,
      gameChar_y - 16
    );

    //Calf
    fill(0, 100, 0);
    rect(gameChar_x + 6, gameChar_y - 16, 3, 4);

    // Foot
    fill(128, 0, 0);
    quad(
      gameChar_x + 6,
      gameChar_y - 12,
      gameChar_x + 9,
      gameChar_y - 12,
      gameChar_x + 12,
      gameChar_y - 4,
      gameChar_x + 5,
      gameChar_y - 4
    );
  } else if (isLeft) {
    // add your walking left code
    // face
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 20,
      gameChar_x - 10,
      gameChar_y - 15,
      gameChar_x - 12,
      gameChar_y - 15
    );

    //Calf
    fill(0, 100, 0);
    rect(gameChar_x - 12, gameChar_y - 15, 3, 5);
    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 12,
      gameChar_y - 10,
      gameChar_x - 9,
      gameChar_y - 10,
      gameChar_x - 8,
      gameChar_y - 2,
      gameChar_x - 15,
      gameChar_y - 2
    );

    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 3,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 14,
      gameChar_x + 3,
      gameChar_y - 14
    );

    //Calf
    fill(0, 100, 0);
    quad(
      gameChar_x + 3,
      gameChar_y - 14,
      gameChar_x + 6,
      gameChar_y - 14,
      gameChar_x + 6,
      gameChar_y - 8,
      gameChar_x + 3,
      gameChar_y - 8
    );

    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x + 3,
      gameChar_y - 8,
      gameChar_x + 6,
      gameChar_y - 8,
      gameChar_x + 7,
      gameChar_y,
      gameChar_x,
      gameChar_y
    );
  } else if (isRight) {
    // add your walking right code
    // face
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 14,
      gameChar_x - 8,
      gameChar_y - 14
    );

    //Calf
    fill(0, 100, 0);
    quad(
      gameChar_x - 8,
      gameChar_y - 14,
      gameChar_x - 5,
      gameChar_y - 14,
      gameChar_x - 5,
      gameChar_y - 8,
      gameChar_x - 8,
      gameChar_y - 8
    );

    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 8,
      gameChar_y - 8,
      gameChar_x - 5,
      gameChar_y - 8,
      gameChar_x - 2,
      gameChar_y,
      gameChar_x - 9,
      gameChar_y
    );

    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 3,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x + 8,
      gameChar_y - 13,
      gameChar_x + 5,
      gameChar_y - 13
    );

    //Calf
    fill(0, 100, 0);
    quad(
      gameChar_x + 5,
      gameChar_y - 13,
      gameChar_x + 8,
      gameChar_y - 13,
      gameChar_x + 8,
      gameChar_y - 8,
      gameChar_x + 5,
      gameChar_y - 8
    );

    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x + 5,
      gameChar_y - 8,
      gameChar_x + 8,
      gameChar_y - 8,
      gameChar_x + 11,
      gameChar_y - 1,
      gameChar_x + 4,
      gameChar_y - 1
    );
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 25,
      gameChar_x - 5,
      gameChar_y - 25,
      gameChar_x - 5,
      gameChar_y - 19,
      gameChar_x - 8,
      gameChar_y - 19
    );

    // Calf
    fill(0, 100, 0);
    quad(
      gameChar_x - 8,
      gameChar_y - 19,
      gameChar_x - 5,
      gameChar_y - 19,
      gameChar_x - 6,
      gameChar_y - 13,
      gameChar_x - 9,
      gameChar_y - 13
    );

    // Foot
    fill(128, 0, 0);
    quad(
      gameChar_x - 9,
      gameChar_y - 13,
      gameChar_x - 6,
      gameChar_y - 13,
      gameChar_x - 5,
      gameChar_y - 5,
      gameChar_x - 12,
      gameChar_y - 5
    );

    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 3,
      gameChar_y - 25,
      gameChar_x + 6,
      gameChar_y - 25,
      gameChar_x + 6,
      gameChar_y - 19,
      gameChar_x + 3,
      gameChar_y - 19
    );

    // Calf
    fill(0, 100, 0);
    quad(
      gameChar_x + 3,
      gameChar_y - 19,
      gameChar_x + 6,
      gameChar_y - 19,
      gameChar_x + 7,
      gameChar_y - 13,
      gameChar_x + 4,
      gameChar_y - 13
    );

    // Foot
    fill(128, 0, 0);
    quad(
      gameChar_x + 4,
      gameChar_y - 13,
      gameChar_x + 7,
      gameChar_y - 13,
      gameChar_x + 10,
      gameChar_y - 5,
      gameChar_x + 3,
      gameChar_y - 5
    );
  } else {
    // add your standing front facing code
    // face
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    // neck
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    // torso

    fill(0, 0, 139);
    quad(
      gameChar_x - 10,
      gameChar_y - 51,
      gameChar_x + 8,
      gameChar_y - 51,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x - 8,
      gameChar_y - 20
    );

    // Legs

    // Left Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x - 8,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 20,
      gameChar_x - 5,
      gameChar_y - 14,
      gameChar_x - 8,
      gameChar_y - 14
    );

    //Calf
    fill(0, 100, 0);
    quad(
      gameChar_x - 8,
      gameChar_y - 14,
      gameChar_x - 5,
      gameChar_y - 14,
      gameChar_x - 5,
      gameChar_y - 8,
      gameChar_x - 8,
      gameChar_y - 8
    );

    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x - 8,
      gameChar_y - 8,
      gameChar_x - 5,
      gameChar_y - 8,
      gameChar_x - 4,
      gameChar_y,
      gameChar_x - 11,
      gameChar_y
    );
    // Right Side

    // Thigh
    fill(233, 150, 122);
    quad(
      gameChar_x + 3,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 20,
      gameChar_x + 6,
      gameChar_y - 14,
      gameChar_x + 3,
      gameChar_y - 14
    );

    //Calf
    fill(0, 100, 0);
    quad(
      gameChar_x + 3,
      gameChar_y - 14,
      gameChar_x + 6,
      gameChar_y - 14,
      gameChar_x + 6,
      gameChar_y - 8,
      gameChar_x + 3,
      gameChar_y - 8
    );

    // Foot

    fill(128, 0, 0);
    quad(
      gameChar_x + 3,
      gameChar_y - 8,
      gameChar_x + 6,
      gameChar_y - 8,
      gameChar_x + 9,
      gameChar_y,
      gameChar_x + 2,
      gameChar_y
    );
  }

  pop();

  displayScore();

  //conditional statements to move the game character
  if (!isPlummeting) {
    if (isLeft) {
      gameChar_x -= 5;
    }
    if (isRight) {
      gameChar_x += 5;
    }
  }

  if (gameChar_y < floorPos_y) {
    gameChar_y += 2;
    isFalling = true;
  } else {
    isFalling = false;
  }

  // Falling down the canyon
  for (var i = 0; i < canyons.length; i++) {
    checkCanyon(canyons[i]);
  }

  // Make character fall when plummeting
  if (isPlummeting) {
    gameChar_y += 5;
  }
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.
  if ((keyCode == 37 || keyCode == 65) && !isPlummeting) {
    isLeft = true;
  } else if ((keyCode == 39 || keyCode == 83) && !isPlummeting) {
    isRight = true;
  } else if ((keyCode == 32 || keyCode == 87) && !isFalling && !isPlummeting) {
    gameChar_y -= 100;
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  if (keyCode == 37 || keyCode == 65) {
    isLeft = false;
  } else if (keyCode == 39 || keyCode == 83) {
    isRight = false;
  }
}

function drawMountains() {
  for (var i = 0; i < mountains.x_pos.length; i++) {
    fill(105, 105, 105);
    quad(
      mountains.x_pos[i] + 380,
      mountains.y_pos + 332,
      mountains.x_pos[i] + 480,
      mountains.y_pos + 132,
      mountains.x_pos[i] + 580,
      mountains.y_pos + 132,
      mountains.x_pos[i] + 680,
      mountains.y_pos + 332
    );
    fill(255);
    triangle(
      mountains.x_pos[i] + 480,
      mountains.y_pos + 132,
      mountains.x_pos[i] + 500,
      mountains.y_pos + 102,
      mountains.x_pos[i] + 520,
      mountains.y_pos + 132
    );
    triangle(
      mountains.x_pos[i] + 500,
      mountains.y_pos + 132,
      mountains.x_pos[i] + 530,
      mountains.y_pos + 82,
      mountains.x_pos[i] + 560,
      mountains.y_pos + 132
    );
    triangle(
      mountains.x_pos[i] + 540,
      mountains.y_pos + 132,
      mountains.x_pos[i] + 560,
      mountains.y_pos + 102,
      mountains.x_pos[i] + 580,
      mountains.y_pos + 132
    );
  }
}

function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    fill(165, 42, 42);
    rect(trees_x[i], treePos_y, 20, 145);
    fill(0, 155, 0);
    triangle(
      trees_x[i] - 40,
      treePos_y + 20,
      trees_x[i] + 10,
      treePos_y - 30,
      trees_x[i] + 60,
      treePos_y + 20
    );
    triangle(
      trees_x[i] - 37,
      treePos_y,
      trees_x[i] + 10,
      treePos_y - 60,
      trees_x[i] + 57,
      treePos_y
    );
    triangle(
      trees_x[i] - 32,
      treePos_y - 22,
      trees_x[i] + 10,
      treePos_y - 60,
      trees_x[i] + 52,
      treePos_y - 22
    );
  }
}

function drawClouds() {
  for (var i = 0; i < clouds.x_pos.length; i++) {
    fill(255);
    ellipse(clouds.x_pos[i] + 200, clouds.y_pos[i], clouds.size[i]);
    ellipse(clouds.x_pos[i] + 250, clouds.y_pos[i], clouds.size[i]);
    ellipse(clouds.x_pos[i] + 300, clouds.y_pos[i], clouds.size[i]);
  }
}

function drawCanyon(t_canyon) {
  fill(139, 69, 19);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

function checkCanyon(t_canyon) {
  if (
    gameChar_x > t_canyon.x_pos &&
    gameChar_x < t_canyon.x_pos + t_canyon.width &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
  }
}

function drawCollectable(t_collectable) {
  fill(255, 215, 0);
  ellipse(
    t_collectable.x_pos + 20,
    t_collectable.y_pos,
    t_collectable.size,
    t_collectable.size
  );
}

function checkCollectable(t_collectable) {
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50
  ) {
    if (!t_collectable.isFound == true) {
      t_collectable.isFound = true;
      game_score += 1;
    }
  }
  if (t_collectable.isFound == false) {
    drawCollectable(t_collectable);
  }
}

function displayScore() {
  fill(0);
  textSize(32);
  textAlign(RIGHT, TOP);
  text(`Score: ${game_score}`, 200, 20);
}
