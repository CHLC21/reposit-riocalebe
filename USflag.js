const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  drawStars();
}

function drawStars() {
  const rows = 9;
  const cols = 11;
  const starRadius = canvas.height / 20;
  const xSpacing = canvas.width / cols;
  const ySpacing = canvas.height / rows;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Skip alternate columns to make 5-6 staggered rows
      if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
        const x = xSpacing * col + xSpacing / 2;
        const y = ySpacing * row + ySpacing / 2;
        drawStar(x, y, starRadius, 5, 0.5);
      }
    }
  }
}

function drawStar(cx, cy, outerRadius, points, inset) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / points;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < points; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * (outerRadius * inset);
    y = cy + Math.sin(rot) * (outerRadius * inset);
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
