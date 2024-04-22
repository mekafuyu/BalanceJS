const sun = new Image();
const moon = new Image();
const earth = new Image();
function init() {
  sun.src = "sun.png";
  moon.src = "moon.png";
  earth.src = "earth.png";
  window.requestAnimationFrame(draw);
}

var equilibrio = -1;
var incbal = 0;
var val = 0;
var x = 200;
var y = 90;
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  ctx.fillStyle = "black";
  ctx.translate(x, y);
  ctx.rotate(incbal);
  ctx.fillRect(-150, -5, 300, 10);
  ctx.rotate(-incbal);
  ctx.translate(-x, -y);

  ctx.beginPath();
  ctx.arc(x, y, 10, 0,  2 * Math.PI);
  ctx.fill()
  ctx.fillRect(x - 5, y, 10, 200);

  if (val - equilibrio > 0)
    val += 0.01






  // val += 0.1;
  incbal = Math.sin(val);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(draw);
}

init();
