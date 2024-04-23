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

class Gravitable {
  constructor(x, y, width, height, drawFunc) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = 0;
    this.rot = 0;
    this.bounciness = 0.6;
    this.width = width
    this.height = height
    this.bottom = () => {
      return this.y + this.height
    };
    this.right = () => {
      return this.x + this.width
    }
    this.move = (ax, ay) => {
      this.vx += ax
      this.vy += ay
      this.x += this.vx
      this.y += this.vy
      this.rot += this.vx / 2
    }
    this.bounceX = (ix) => {
      this.x = ix
      this.vx *= -this.bounciness
    }
    this.bounceY = (iy) => {
      this.y = iy
      this.vy *= -this.bounciness
      this.vx *= 0.8
    }
    this.draw = drawFunc
  }
}

var balance1 = new Balance(175, 150);
var balance2 = new Balance(625, 150);

var plate1 = [
  new Gravitable(20, 20, 10, 10, renderBall),
  new Gravitable(50, 40, 10, 10, renderBall),
  new Gravitable(0, -60, 10, 10, renderSquare),
  new Gravitable(20, -80, 10, 10, renderSquare),
]
var plate2 = [
  new Gravitable(30, 10, 10, 10, renderBall),
  new Gravitable(20, 30, 10, 10, renderBall),
  new Gravitable(10, -20, 10, 10, renderSquare),
  new Gravitable(40, 0, 10, 10, renderSquare)
]
var gravity1 = new Gravitable(20, 20, 10, 10, renderBall)
var gravity2 = new Gravitable(20, -60, 10, 10, renderSquare)

function renderBalance(ctx, balance) {
  balance.tilt(0.5);
  var pos = balance.currPos / 2;
  var xOffSet = Math.abs(pos) * 50;
  var yOffSet = pos * 75;
  
  ctx.save();
  
  ctx.translate(balance.x, balance.y);
  ctx.rotate(pos);
  ctx.fillRect(-100, -5, 200, 10);
  ctx.restore();
  
  ctx.save();
  var plate1x = balance.x - 100 + xOffSet
  var plate1y = balance.y + 50 - yOffSet
  ctx.translate(plate1x, plate1y);
  gravity(ctx, -60, -23, 120, 100, plate1)
  
  ctx.beginPath();
  ctx.moveTo(-50, 80);
  ctx.lineTo(0, -50);
  ctx.lineTo(50, 80);
  ctx.stroke();
  
  ctx.rotate(-0.875);
  ctx.beginPath();
  ctx.arc(0, 0, 100, 1.75, Math.PI);
  ctx.fill();
  ctx.restore();
  
  ctx.save();
  ctx.translate(balance.x + 100 - xOffSet, balance.y + 50 + yOffSet);
  gravity(ctx, -60, -23, 120, 100, plate2)
  
  ctx.beginPath();
  ctx.moveTo(-50, 80);
  ctx.lineTo(0, -50);
  ctx.lineTo(50, 80);
  ctx.stroke();
  
  ctx.rotate(-0.875);
  ctx.beginPath();
  ctx.arc(0, 0, 100, 1.75, Math.PI);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(balance.x, balance.y, 10, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillRect(balance.x - 5, balance.y, 10, 200);
}

function renderSquare(count, ctx, gravitable) {
  var h = gravitable.height
  var w = gravitable.width

  ctx.save();
  
  ctx.translate(gravitable.x, gravitable.y)
  // ctx.strokeRect(-h, -w, h * 2, w * 2)
  
  
  ctx.font = "11px arial";
  ctx.fillText(count, 4, -6);
  ctx.fillStyle = "rgb(255, 255, 255, 0.85)";
  
  ctx.beginPath();
  ctx.ellipse(7, -10, 10, 7, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  
  ctx.rotate(gravitable.rot / 10)
  ctx.fillStyle = "red";
  ctx.fillRect(-10, -10, w * 2, h * 2)
  ctx.restore();
}

function renderBall(count, ctx, gravitable) {
  var h = gravitable.height
  var w = gravitable.width
  ctx.save();
  
  ctx.translate(gravitable.x, gravitable.y)
  // ctx.strokeRect(-h, -w, 2 * h, 2 * w)
  
  
  ctx.font = "11px arial";
  ctx.fillText(count, 4, -6);
  ctx.fillStyle = "rgb(255, 255, 255, 0.85)";
  
  ctx.beginPath();
  ctx.ellipse(7, -10, 10, 7, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  
  ctx.rotate(gravitable.rot / 10)
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(0, 0, h, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function gravity(ctx, x, y, width, height, gravitables)
{
  ctx.save()
  ctx.translate(x, y)
  
  gravitables.forEach((gravitable) => {    
    // ctx.strokeRect(0, 0, width, height)
    gravitable.draw(1, ctx, gravitable)

    gravitable.move(0, 0.1)
    if(gravitable.bottom() > height)
      gravitable.bounceY(height - gravitable.height)
    if(gravitable.right() > width)
      gravitable.bounceX(width - gravitable.width)
    if(gravitable.x < gravitable.width)
      gravitable.bounceX(gravitable.width)
    }
    )
  ctx.restore()
}

altgrav = 30
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  renderBalance(ctx, balance1);
  renderBalance(ctx, balance2);

  // gravity(ctx, 10, 10, 400, altgrav, gravity1)

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(draw);
}

init();
