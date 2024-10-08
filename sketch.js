/*

The Final Game Project

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
var flagpole;
var lives;

var platforms;

var enemies;

var jumpSound;
var fireworksSoundPlayed;
var fireworksSound;
var killSound;
var rewardSound;
var tFont;

var emit;

function preload() {
  soundFormats("mp3", "wav");
  jumpSound = loadSound("assets/jump.wav");
  killSound = loadSound("assets/kill-sound.wav");
  rewardSound = loadSound("assets/rewards.wav");
  fireworksSound = loadSound("assets/fireworks.wav");
  jumpSound.setVolume(0.1);
  tFont = loadFont("assets/coinfont.otf");
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  startGame();
}

function draw() {
  cameraPosX = gameChar_x - width / 2;
  background(100, 155, 255);
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);
  push();
  translate(-cameraPosX, 0);

  /* draw mountains */
  drawMountains();

  /* draw trees */
  drawTrees();

  /* draw clouds */
  drawClouds();

  /* draw platforms */

  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  /* check collectable */
  for (var i = 0; i < collectables.length; i++) {
    checkCollectable(collectables[i]);
  }

  /* draw the canyon */
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
  }

  /* render flagpole */
  renderFlagpole();
  checkFlagpole();

  /* the game character */
  stroke(0);
  if (isLeft && isFalling) {
    /* add your jumping-left code
    face */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
    fill(0, 100, 0);
    rect(gameChar_x - 12, gameChar_y - 15, 3, 4);
    /* Foot */

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

    /* Right Side */

    /* Thigh */
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

    /* Calf */
    fill(0, 100, 0);
    rect(gameChar_x - 3, gameChar_y - 15, 3, 4);
    /* Foot */

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
    /* add your jumping-right */
    /* face */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
    fill(0, 100, 0);
    rect(gameChar_x - 6, gameChar_y - 16, 3, 4);
    /* Foot */

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

    /* Right Side */

    /* Thigh */
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

    /* Calf */
    fill(0, 100, 0);
    rect(gameChar_x + 6, gameChar_y - 16, 3, 4);

    /* Foot */
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
    /* add your walking left code */
    /* face */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
    fill(0, 100, 0);
    rect(gameChar_x - 12, gameChar_y - 15, 3, 5);
    /* Foot */

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

    /* Right Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */

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
    /* add your walking right code */
    /* face */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */

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

    /* Right Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */

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
    /* add your jumping facing forwards code */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */
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

    /* Right Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */
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
    /* add your standing front facing code */
    /* face */
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 65, 20);

    /* neck */
    fill(189, 183, 107);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5);

    /* torso */

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

    /* Legs */

    /* Left Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */

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
    /* Right Side */

    /* Thigh */
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

    /* Calf */
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

    /* Foot */

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

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();

    var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);

    if (isContact) {
      startGame();
      lives -= 1;
      killSound.play();
      break;
    }
  }

  pop();

  displayScore();
  checkPlayerDie();
  drawLives();

  if (lives < 1) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont(tFont);
    text("Game Over. Press space to continue", width / 2, height / 2);
    return;
  }

  if (flagpole.isReached) {
    if (!fireworksSoundPlayed) {
      fireworksSound.play();
      fireworksSoundPlayed = true;
    }
    emit.updateParticles();
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont(tFont);
    text("Level Complete. Press space to continue", width / 2, height / 2);
    return;
  }

  /* conditional statements to move the game character */
  if (!isPlummeting) {
    if (isLeft) {
      gameChar_x -= 5;
    }
    if (isRight) {
      gameChar_x += 5;
    }
  }

  if (gameChar_y < floorPos_y) {
    var isContact = false;
    for (var i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_x, gameChar_y)) {
        isContact = true;
        gameChar_y = platforms[i].y;
        isFalling = false;
        break;
      }
    }
    if (!isContact) {
      gameChar_y += 2;
      isFalling = true;
    }
  } else {
    isFalling = false;
  }

  /* Falling down the canyon */
  for (var i = 0; i < canyons.length; i++) {
    checkCanyon(canyons[i]);
  }

  /* Make character fall when plummeting */
  if (isPlummeting) {
    gameChar_y += 5;
    killSound.play();
  }
  fireworksSoundPlayed = false;
}

function keyPressed() {
  /* if statements to control the animation of the character when */
  /* keys are pressed. */
  if ((keyCode == 37 || keyCode == 65) && !isPlummeting) {
    isLeft = true;
  } else if ((keyCode == 39 || keyCode == 83) && !isPlummeting) {
    isRight = true;
  } else if (
    (keyCode == 38 || keyCode == 87 || keyCode == 32) &&
    !isFalling &&
    !isPlummeting &&
    lives > 0 &&
    !flagpole.isReached
  ) {
    gameChar_y -= 100;
    jumpSound.play();
  }
  if (keyCode == 32 && (lives < 1 || flagpole.isReached)) {
    startGame();
    lives = 3;
  }
}

function keyReleased() {
  /* if statements to control the animation of the character when
  keys are released. */

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
  /* Draw the main body of the coin */
  fill(255, 215, 0);
  ellipse(
    t_collectable.x_pos + 20,
    t_collectable.y_pos,
    t_collectable.size,
    t_collectable.size
  );

  /* Add a border to the coin */
  /* Darker gold color for the border */
  stroke(184, 134, 11);
  strokeWeight(2);
  ellipse(
    t_collectable.x_pos + 20,
    t_collectable.y_pos,
    t_collectable.size,
    t_collectable.size
  );

  /* Add some shading to give it a 3D effect */
  noStroke();
  /* Lighter gold color for the shading */
  fill(255, 223, 0);
  ellipse(
    t_collectable.x_pos + 20,
    t_collectable.y_pos - t_collectable.size * 0.1,
    t_collectable.size * 0.9,
    t_collectable.size * 0.9
  );

  /* Add a highlight to the top left */
  /* Semi-transparent white for the highlight */
  fill(255, 255, 255, 150);
  ellipse(
    t_collectable.x_pos + 20 - t_collectable.size * 0.2,
    t_collectable.y_pos - t_collectable.size * 0.2,
    t_collectable.size * 0.3,
    t_collectable.size * 0.3
  );

  /* Determine the denomination based on the size */
  let denomination;
  if (t_collectable.size === 30) {
    denomination = 1;
  } else if (t_collectable.size === 40) {
    denomination = 2;
  } else if (t_collectable.size === 50) {
    denomination = 3;
  }

  /* Add the denomination text to the coin */
  /* Black color for the text */
  fill(0);
  textSize(t_collectable.size * 0.5);
  textFont(tFont);
  textAlign(CENTER, CENTER);
  text(denomination, t_collectable.x_pos + 20, t_collectable.y_pos);
}

function checkCollectable(t_collectable) {
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50
  ) {
    if (!t_collectable.isFound == true) {
      t_collectable.isFound = true;
      rewardSound.play();
      if (t_collectable.size == 40) {
        game_score += 2;
      } else if (t_collectable.size == 50) {
        game_score += 3;
      } else {
        game_score += 1;
      }
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
  textFont(tFont);
  text(`Score: ${game_score}`, 200, 15);
}

function renderFlagpole() {
  if (!flagpole.isReached) {
    push();
    stroke(0);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    noStroke();
    fill(255, 0, 0);
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    pop();
  } else {
    push();
    stroke(0);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    noStroke();
    fill(255, 0, 0);
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    fill(255);
    ellipse(flagpole.x_pos + 25, floorPos_y - 225, 30);
    pop();
  }
}

function checkFlagpole() {
  var d = abs(gameChar_x - flagpole.x_pos);
  if (d < 15) {
    flagpole.isReached = true;
  }
}

function checkPlayerDie() {
  if (gameChar_y >= height) {
    lives -= 1;
    if (lives > 0) {
      startGame();
    }
  }
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

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

  platforms = [];
  platforms.push(createPlatforms(0, floorPos_y - 100, 100));
  platforms.push(createPlatforms(70, floorPos_y - 200, 100));
  platforms.push(createPlatforms(140, floorPos_y - 300, 100));
  platforms.push(createPlatforms(340, floorPos_y - 300, 200));
  platforms.push(createPlatforms(640, floorPos_y - 300, 150));
  platforms.push(createPlatforms(740, floorPos_y - 200, 100));
  platforms.push(createPlatforms(890, floorPos_y - 100, 100));
  platforms.push(createPlatforms(540, floorPos_y - 200, 150));

  enemies = [];
  enemies.push(new Enemy(100, floorPos_y - 10, 100));
  enemies.push(new Enemy(340, floorPos_y - 310, 100));
  enemies.push(new Enemy(440, floorPos_y - 310, 100));
  enemies.push(new Enemy(640, floorPos_y - 310, 150));
  enemies.push(new Enemy(platforms[0].x, platforms[0].y - 10, 100));
  enemies.push(new Enemy(platforms[1].x, platforms[1].y - 10, 100));
  enemies.push(new Enemy(platforms[2].x, platforms[2].y - 10, 100));
  enemies.push(new Enemy(platforms[5].x, platforms[5].y - 10, 100));
  enemies.push(new Enemy(platforms[6].x, platforms[6].y - 10, 100));
  enemies.push(new Enemy(platforms[7].x, platforms[7].y - 10, 100));
  enemies.push(new Enemy(1000, floorPos_y, 100));
  enemies.push(new Enemy(1200, floorPos_y, 100));
  enemies.push(new Enemy(1400, floorPos_y, 100));
  enemies.push(new Enemy(1600, floorPos_y, 100));

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
    {
      x_pos: enemies[1].x + 100,
      y_pos: enemies[1].y - 5,
      size: 30,
      isFound: false,
    },
    {
      x_pos: enemies[3].x + 100,
      y_pos: enemies[3].y - 5,
      size: 30,
      isFound: false,
    },
    {
      x_pos: enemies[3].x + 150,
      y_pos: enemies[3].y - 5,
      size: 30,
      isFound: false,
    },
    {
      x_pos: enemies[3].x + 200,
      y_pos: enemies[3].y - 50,
      size: 30,
      isFound: false,
    },
    {
      x_pos: platforms[0].x + 50,
      y_pos: platforms[0].y - 25,
      size: 30,
      isFound: false,
    },
    {
      x_pos: platforms[1].x + 50,
      y_pos: platforms[1].y - 25,
      size: 30,
      isFound: false,
    },
    {
      x_pos: platforms[2].x + 50,
      y_pos: platforms[2].y - 25,
      size: 30,
      isFound: false,
    },
    {
      x_pos: platforms[7].x + 50,
      y_pos: platforms[7].y - 25,
      size: 50,
      isFound: false,
    },
    {
      x_pos: platforms[4].x + 100,
      y_pos: platforms[4].y - 75,
      size: 50,
      isFound: false,
    },
    {
      x_pos: platforms[4].x + 150,
      y_pos: platforms[4].y - 125,
      size: 50,
      isFound: false,
    },
    {
      x_pos: platforms[4].x + 230,
      y_pos: platforms[4].y - 75,
      size: 50,
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
      x_pos: 550,
      width: 250,
    },
  ];

  game_score = 0;

  flagpole = {
    isReached: false,
    x_pos: 2000,
  };

  emit = new Emitter(
    gameChar_x,
    floorPos_y - 250,
    0,
    -1,
    10,
    color(200, 0, 200)
  );
  emit.startEmitter(200, 100);

  fireworksSound.setLoop(false);
}

function drawLives() {
  fill(255, 0, 0);
  for (let i = 0; i < lives; i++) {
    ellipse(250 + i * 30, 35, 20, 20);
  }
}

function createPlatforms(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(255, 0, 255);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = this.y - gc_y;
        if (d >= 0 && d < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

function Enemy(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.currentX = x;
  this.inc = 1;

  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };

  this.draw = function () {
    this.update();
    fill(255, 0, 0);
    ellipse(this.currentX, this.y, 20, 20);
    fill(0);
    ellipse(this.currentX - 5, this.y - 5, 5, 5);
    ellipse(this.currentX + 5, this.y - 5, 5, 5);
    line(this.currentX - 5, this.y + 5, this.currentX + 5, this.y + 5);
  };

  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 20) {
      return true;
    }
    return false;
  };
}

function Particle(x, y, xSpeed, ySpeed, size, color, age) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.color = color;
  this.age = 0;

  this.drawParticle = function () {
    fill(color);
    ellipse(this.x, this.y, this.size);
  };

  this.updateParticle = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    age++;
  };
}

function Emitter(x, y, xSpeed, ySpeed, size) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;

  this.colors = [
    "#FF4500",
    "#FFD700",
    "#FF69B4",
    "#00FF00",
    "#00FFFF",
    "#1E90FF",
    "#FF1493",
    "#FF6347",
    "#ADFF2F",
    "#FF00FF",
    "#FFFF00",
    "#00BFFF",
  ];

  this.startParticles = 0;
  this.lifetime = 0;

  this.particles = [];

  this.startEmitter = function (startParticles, lifetime) {
    this.startParticles = startParticles;
    this.lifetime = lifetime;
    for (let i = 0; i < startParticles; i++) {
      this.particles.push(
        new Particle(
          random(this.x - 10, this.x + 10),
          random(this.y - 10, this.y + 10),
          random(this.xSpeed - 1, this.xSpeed + 1),
          random(this.ySpeed - 1, this.xSpeed + 1),
          random(this.size - 2, this.size + 2),
          this.colors[i % this.colors.length]
        )
      );
    }
  };
  this.updateParticles = function () {
    var deadParticles = 0;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].drawParticle();
      this.particles[i].updateParticle();
      if (this.particles[i].age > random(0, this.lifetime)) {
        this.particles.splice(i, 1);
        deadParticles++;
      }
    }
    if (deadParticles > 0) {
      for (let i = 0; i < deadParticles; i++) {
        this.particles.push(
          new Particle(
            random(this.x - 10, this.x + 10),
            random(this.y - 10, this.y + 10),
            random(this.xSpeed - 1, this.xSpeed + 1),
            random(this.ySpeed - 1, this.xSpeed + 1),
            random(this.size - 2, this.size + 2),
            this.colors[i % this.colors.length]
          )
        );
      }
    }
  };
}
