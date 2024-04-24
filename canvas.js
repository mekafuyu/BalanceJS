import {
  Balance,
  Gravitable,
  renderBalance,
  renderBall,
  renderSquare,
} from "./balance.js";

// TODO FIX RESPONSIVE PLACING BALL

const canvas = document.getElementById("canvas");
window.addEventListener("resize", resizeCanvas, false);
var balance1 = new Balance(0, 0);
var balance2 = new Balance(0, 0);
var balX1 = width / 2;
var balX2 = 200 * scale;
var balY = height / 3;

window.tiltRight = () => {
  balance1.bal = 1;
};
window.unTilt = () => {
  balance1.bal = 0;
};
window.tiltLeft = () => {
  balance1.bal = -1;
};

var cursor = { x: 0, y: 0 };

// var plate1 = [
//   new Gravitable(20, 20, 10, 10, renderBall),
//   new Gravitable(50, 40, 10, 10, renderBall),
//   new Gravitable(0, -60, 10, 10, renderSquare),
//   new Gravitable(20, -80, 10, 10, renderSquare),
// ];
// var plate2 = [
//   new Gravitable(30, 10, 10, 10, renderBall),
//   new Gravitable(20, 30, 10, 10, renderBall),
//   new Gravitable(10, -20, 10, 10, renderSquare),
//   new Gravitable(40, 0, 10, 10, renderSquare),
// ];
// balance1.leftPlate = plate1;
// balance1.rightPlate = plate2;
// balance2.leftPlate = plate1;
// balance2.rightPlate = plate2;

var width = window.innerWidth - 50;
var height = window.innerHeight - 100;
var scale = width;
var offX = 0;
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  cursor.x = event.clientX - rect.left;
  cursor.y = event.clientY - rect.top;

  if (cursor.x < width / 6)
    balance1.leftPlate.push(
      new Gravitable(cursor.x, cursor.y - 200 * scale, 10, 10, renderBall)
    );
  else if (cursor.x > width / 3 && cursor.x < width / 2)
    balance1.rightPlate.push(
      new Gravitable(cursor.x - 300, cursor.y - 200 * scale, 10, 10, renderBall)
    );
  else if (cursor.x > width / 2 && cursor.x < width * 2 / 3)
    balance2.leftPlate.push(
      new Gravitable(cursor.x - 550, cursor.y - 200 * scale, 10, 10, renderBall)
    );
  else if (cursor.x > width * 5 / 6)
    balance2.rightPlate.push(
      new Gravitable(cursor.x - 850, cursor.y - 200 * scale, 10, 10, renderBall)
    );
}
canvas.addEventListener("mousemove", function (e) {
  getCursorPosition(canvas, e);
});

function init() {
  window.requestAnimationFrame(draw);
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
}

function draw() {
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "darkgoldenrod";
  ctx.strokeStyle = "darkgoldenrod";
  
  
  renderBalance(ctx, balX1 - balX2, balY, scale, balance1);
  renderBalance(ctx, balX1 + balX2, balY, scale, balance2);

  ctx.font = "20px arial";
  ctx.fillText(cursor.x, 10, 20);
  ctx.fillText(cursor.y, 10, 40);
  ctx.fillText(balX1 - balX2 + offX, 10, 60);
  
  ctx.beginPath();
  ctx.arc(balX1 - balX2 + offX, 100, 10 * scale, 0, 2 * Math.PI);
  ctx.fill();
  
  // gravity(ctx, 10, 10, 400, altgrav, gravity1)

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(draw);
}

resizeCanvas();
init();
