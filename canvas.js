import {
  Balance,
  Gravitable,
  renderBalance,
  renderBall,
  renderSquare,
} from "./balance.js";

const canvas = document.getElementById("canvas");
var balance1 = new Balance(0, 0);
var balance2 = new Balance(0, 0);
var balX1 = width / 2;
var balX2 = 200 * scale;
var balY = height / 3;
var cursor = { x: 0, y: 0 };
var width = window.innerWidth - 50;
var height = window.innerHeight - 100;
var scale = width / 750;
var offX = 0;
var plate1Off = balX1 - balX2
var plate2Off = balX1 + balX2
var figCount = 0

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  cursor.x = event.clientX - rect.left;
  cursor.y = event.clientY - rect.top;

  if (cursor.x < width / 2)
  {
    var pos1 = balance1.currPos / 2;
    var tilt1x = ((Math.abs(pos1) * 50) * scale)
    var tilt1y = pos1 * 75;

    if (cursor.x < width / 6)
      balance1.leftPlate.push(
        new Gravitable(cursor.x - (plate1Off + offX - 50 * scale + tilt1x), cursor.y + (-210 + tilt1y) * scale, 10, 10, renderBall)
      );
    else if (cursor.x > width / 3)
      balance1.rightPlate.push(
        new Gravitable(cursor.x - (plate1Off - offX - 50 * scale - tilt1x), cursor.y - (210 + tilt1y) * scale, 10, 10, renderSquare)
      );
  }
  else{
    var pos2 = balance2.currPos / 2;
    var tilt2x = ((Math.abs(pos2) * 50) * scale)
    var tilt2y = pos2 * 75;

    if (cursor.x < width * 2 / 3)
      balance2.leftPlate.push(
        new Gravitable(cursor.x - (plate2Off + offX - 50 * scale + tilt2x), cursor.y + (-210 + tilt2y) * scale, 10, 10, renderBall)
      );
    else if (cursor.x > width * 5 / 6)
      balance2.rightPlate.push(
        new Gravitable(cursor.x - (plate2Off - offX - 50 * scale + tilt2y), cursor.y - (210 + tilt2y) * scale, 10, 10, renderBall)
      );
  }
}

function resizeCanvas() {
  height = window.innerHeight * 0.8;
  width = (height * 4) / 3;
  canvas.width = width;
  canvas.height = height;
  scale = width / 750;
  offX = -100 * scale

  balX1 = width / 2;
  balX2 = 200 * scale;
  balY = height / 3;
  plate1Off = balX1 - balX2 
  plate2Off = balX1 + balX2 
}
window.addEventListener("resize", resizeCanvas, false);
canvas.addEventListener("mousemove", function (e) {
  getCursorPosition(canvas, e);
  figCount++
});

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "darkgoldenrod";
  ctx.strokeStyle = "darkgoldenrod";
  
  
  renderBalance(ctx, plate1Off, balY, scale, balance1);
  renderBalance(ctx, plate2Off, balY, scale, balance2);

  ctx.font = "20px arial";
  ctx.fillText(cursor.x, 10, 20);
  ctx.fillText(cursor.y, 10, 40);
  ctx.fillText(plate1Off + (offX - 50 * scale), 10, 60);
  ctx.fillText(plate2Off - (offX + 50 * scale), 10, 80);
  ctx.fillText(figCount, 10, 100);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(draw);
}

resizeCanvas();
init();

window.tiltRight = () => {
  balance1.bal = 1;
};
window.unTilt = () => {
  balance1.bal = 0;
};
window.tiltLeft = () => {
  balance1.bal = -1;
};
