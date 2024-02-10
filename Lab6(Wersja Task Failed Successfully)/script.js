const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
  radius: 10
  
};

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interakcja z myszką
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
      }
    }

    this.draw();
  }
}

let balls = [];
for (let i = 0; i < 100; i++) {
  let radius = Math.random() * 20 + 10;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  balls.push(new Ball(x, y, radius, dx, dy));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
  }

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const dx = balls[i].x - balls[j].x;
      const dy = balls[i].y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
      }
    }
  }
}

animate();

canvas.addEventListener('click', (event) => {
    for (let i = 0; i < balls.length; i++) {
        const dx = event.offsetX - balls[i].x;
        const dy = event.offsetY - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < balls[i].radius) {
            
            balls.splice(i, 1);
            addNewBalls(2);
            break;
        }
    }
});


function addNewBalls(count) {
    for (let i = 0; i < count; i++) {
        let radius = Math.random() * 20 + 10; 
        let x = Math.random() * (canvas.width - radius * 2) + radius; 
        let y = Math.random() * (canvas.height - radius * 2) + radius; 
        let dx = (Math.random() - 0.5) * 2; 
        let dy = (Math.random() - 0.5) * 2; 

        balls.push(new Ball(x, y, radius, dx, dy));
    }
}

