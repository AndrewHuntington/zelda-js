// The canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Increase the size of the play window
// Zoom is depricated and doesn't work with FF
// Passing scale() to transform on the body is giving me
// weird results outside of FF.
// I would like to find a better way to resize...
// document.body.style.zoom = "288%"; // OK for Chrome
// document.body.style.transform = "scale(2.8)"; // OK for FF

// This is a different solution to handling scale/zooming of the game area
// that was suggested through the YouTube comments on the first video.
// This also works well with FF, but produces outlines on all the map tiles
// in Chrome and Safari...
let nativeResWidth = 256;
let nativeResHeight = 240;
let scaleWidth = 3;
let scaleHeight = 3;
ctx.canvas.width = scaleWidth * nativeResWidth;
ctx.canvas.height = scaleHeight * nativeResHeight;
ctx.scale(scaleWidth, scaleHeight);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let fps = 60;
let worldTiles = new Image();
worldTiles.src = "tiles-overworld.png";
let link = new Image();
link.src = "link.png";
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let lastButtonPressed = "up";
// Counts until a certain limit is reached, then increments currentAnimation
let animationCounter = 0;
// The current sprite on the sprite sheet
let currentAnimation = 0;
// Controls how fast the animation moves
let animationSpeed = 10;
let linkX = 116;
let linkY = 135;

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
    lastButtonPressed = "left";
  } else if (e.keyCode == 39) {
    rightPressed = true;
    lastButtonPressed = "right";
  } else if (e.keyCode == 38) {
    upPressed = true;
    lastButtonPressed = "up";
  } else if (e.keyCode == 40) {
    downPressed = true;
    lastButtonPressed = "down";
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 40) {
    downPressed = false;
  }
}

function drawLink() {
  // How fast sprite moves across the screen
  let speed = 2;
  animationCounter++;

  if (leftPressed && !collision(linkX - speed, linkY, map7_7)) {
    linkX -= speed;

    if (currentAnimation == 0) {
      ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link, 30, 30, 16, 16, linkX, linkY, 16, 16);
    }

    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;

      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (rightPressed && !collision(linkX + speed, linkY, map7_7)) {
    linkX += speed;

    if (currentAnimation == 0) {
      ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link, 91, 30, 16, 16, linkX, linkY, 16, 16);
    }

    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (upPressed && !collision(linkX, linkY - speed, map7_7)) {
    linkY -= speed;

    if (currentAnimation == 0) {
      ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link, 62, 30, 16, 16, linkX, linkY, 16, 16);
    }

    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else if (downPressed && !collision(linkX, linkY + speed, map7_7)) {
    linkY += speed;

    if (currentAnimation == 0) {
      ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16);
    } else if (currentAnimation == 1) {
      ctx.drawImage(link, 0, 30, 16, 16, linkX, linkY, 16, 16);
    }

    if (animationCounter >= 6) {
      currentAnimation++;
      animationCounter = 0;
      if (currentAnimation > 1) {
        currentAnimation = 0;
      }
    }
  } else {
    if (lastButtonPressed == "down") {
      ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "up") {
      ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "right") {
      ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16);
    }
    if (lastButtonPressed == "left") {
      ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16);
    }
  }
}

// All values have two digits to keep the array in a nice, square shape
let map7_7 = [
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
  [61, 61, 61, 61, 61, 61, 61, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 61, 28, 61, 62, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 61, 62, 02, 02, 02, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 61, 62, 02, 02, 02, 02, 02, 02, 61, 61, 61, 61, 61, 61, 61],
  [61, 62, 02, 02, 02, 02, 02, 02, 02, 60, 61, 61, 61, 61, 61, 61],
  [02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02],
  [43, 44, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 43, 43],
  [61, 61, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 61, 61],
  [61, 61, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 02, 61, 61],
  [61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
  [61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61],
];

function drawMap(level) {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      // See MDN to understand the parameters for drawImage()
      // ref. https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

      // ctx.drawImage(worldTiles, ((level[i][j]%18) * 17) + 1, (Math.floor(level[i][j]/18) * 17) + 1, 16, 16, j *16, i *16, 16, 16);

      // Okay, so for this: (level[i][j]%18) * 17) + 1,  what we are trying to do is get the X location of the sprite we want to grab from the spritesheet. Let's say that the value of level[i][j] == 4, which would correspond to the eyes of the first tree on the tiles-overworld map. We want to get the X based on this value 4. If you look at the top left hand corner of the tree eye sprite, it's X and Y is (69,1). So when we do 4 % 18, we get a remainder of 4.. so take this 4 and multiply by 17, which gives us 68 and then we add the 1 to give us 69, which is the X value of that sprite we want.  Then the Y is similar, except we gain it through division. Let me know if you need anything else.
      ctx.drawImage(
        worldTiles,
        (level[i][j] % 18) * 17 + 1,
        Math.floor(level[i][j] / 18) * 17 + 1,
        16,
        16,
        j * 16,
        i * 16,
        16,
        16
      );
    }
  }
}

function collision(x, y, map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] != 2) {
        if (
          x <= j * 16 + 16 &&
          x + 12 >= j * 16 &&
          y + 10 <= i * 16 + 16 &&
          y + 16 >= i * 16
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 240);
    ///all code goes here
    drawMap(map7_7);
    drawLink();
  }, 1000 / fps);
}
draw();
