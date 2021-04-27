let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Increase the size of the play window
// Zoom is depricated and doesn't work with FF
// scale() is giving me weird results outside of FF
// document.body.style.zoom = "300%";
document.body.style.transform = "scale(2.8)";

//document.addEventListener("keydown",keyDownHandler, false);
//document.addEventListener("keyup",keyUpHandler,false);
let fps = 60;
let worldTiles = new Image();
worldTiles.src = "tiles-overworld.png";

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
function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 240);
    ///all code goes here
    drawMap(map7_7);
  }, 1000 / fps);
}
draw();
