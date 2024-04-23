function init() {
  window.requestAnimationFrame(draw);
}

class Balance {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.leftPlate = 0;
    this.rightPlate = 0;
    this.currPos = 0;
    this.bal = 0;
    this.tilt = (step) => {
      if (this.currPos < this.bal) {
        this.currPos += step;
        if (this.currPos > 0.99) this.currPos = 1;
      }
      if (this.currPos > this.bal) {
        this.currPos -= step;
        if (this.currPos < -0.99) this.currPos = -1;
      }
      if (Math.abs(this.currPos) < 0.01) this.currPos = 0;
    };
  }
}

var balance1 = new Balance(175, 150);
var balance2 = new Balance(625, 150);

function renderBalance(ctx, balance) {
  balance.tilt(0.01);
  var pos = balance.currPos / 2;
  var xOffSet = Math.abs(pos) * 50;
  var yOffSet = pos * 75;

  ctx.save();

  ctx.translate(balance.x, balance.y);
  ctx.rotate(pos);
  ctx.fillRect(-100, -5, 200, 10);
  ctx.restore();

  ctx.save();
  ctx.translate(balance.x - 100 + xOffSet, balance.y + 100 - yOffSet);

  renderSquare(4, ctx);

  ctx.beginPath();
  ctx.moveTo(-25, 25);
  ctx.lineTo(0, -100);
  ctx.lineTo(25, 25);
  ctx.stroke();

  ctx.rotate(-0.5);
  ctx.beginPath();
  ctx.arc(0, 0, 50, 1, Math.PI);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(balance.x + 100 - xOffSet, balance.y + 100 + yOffSet);

  renderSquare(1, ctx);

  ctx.beginPath();
  ctx.moveTo(-25, 25);
  ctx.lineTo(0, -100);
  ctx.lineTo(25, 25);
  ctx.stroke();

  ctx.rotate(-0.5);
  ctx.beginPath();
  ctx.arc(0, 0, 50, 1, Math.PI);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(balance.x, balance.y, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillRect(balance.x - 5, balance.y, 10, 200);
}

function renderSquare(count, ctx) {
  ctx.save();
  ctx.font = "11px arial";
  ctx.fillText(count, 37, 9);
  ctx.fillStyle = "rgb(255, 255, 255, 0.9)";
  ctx.beginPath();
  ctx.ellipse(40, 5, 10, 7, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = "red";
  ctx.fillRect(20, 4, 20, 20);
  ctx.restore();
}

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  renderBalance(ctx, balance1);
  renderBalance(ctx, balance2);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(draw);
}

init();
