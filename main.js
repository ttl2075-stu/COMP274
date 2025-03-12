const canvas = document.querySelector('canvas');
const glsim = new GLSim(canvas);

// Khai báo mặc định
frameNumber = 10;
function init() {
  try {
    glsimUse('glcanvas');
  } catch (e) {
    document.getElementById('canvas-holder').innerHTML = 'Sorry, an error occured:<br>' + e;
    return;
  }
  initGL();
  drawGrid();
  draw();
}
window.onload = init;

const mtop = canvas.height / 2;
const mbottom = -canvas.height / 2;
const mleft = -canvas.width / 2;
const mright = canvas.width / 2;
function initGL() {
  glClearColor(255, 255, 255, 1);
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  glOrtho(mleft, mright, mbottom, mtop, -1, 1);
  glMatrixMode(GL_MODELVIEW);
  glEnable(GL_POINT_SMOOTH);
}

function drawGrid() {
  glColor3f(0.7, 0.7, 0.7); // Màu xám cho lưới
  glLineWidth(1); // Đặt độ dày đường kẻ
  let gridSpacing = 25; // Khoảng cách giữa các đường

  // Vẽ đường dọc
  for (let x = mleft; x <= mright; x += gridSpacing) {
    glBegin(GL_LINES);
    glVertex2f(x, -250);
    glVertex2f(x, 250);
    glEnd();
  }

  // Vẽ đường ngang
  for (let y = -250; y <= 250; y += gridSpacing) {
    glBegin(GL_LINES);
    glVertex2f(-300, y);
    glVertex2f(300, y);
    glEnd();
  }
  // Vẽ trục tọa độ
  glColor3f(0.2, 0.2, 0.2); // Màu xám đậm hơn
  glLineWidth(2.0); // Nét vẽ dày
  glBegin(GL_LINES);
  glVertex2f(-300, 0);
  glVertex2f(300, 0); // Trục x
  glVertex2f(0, -250);
  glVertex2f(0, 250); // Trục y
  glEnd();
}

function hex2rgb(hex) {
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r / 255, g / 255, b / 255];
}

// Hàm vẽ
function transform() {
  glClear(GL_COLOR_BUFFER_BIT); // Fills the scene with blue.
  frameNumber += 1;
}

function fillBackground(r, g, b) {
  glClearColor(r, g, b, 1);
  glClear(GL_COLOR_BUFFER_BIT);
  drawGrid();
}

function drawRetagle(x, y, width, height, color = '#ff33ff') {
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  glBegin(GL_QUADS);
  glVertex2f(x, y);
  glVertex2f(x + width, y);
  glVertex2f(x + width, y - height);
  glVertex2f(x, y - height);
  glEnd();
}

function drawSquare(x, y, size, color = '#ff33ff') {
  drawRetagle(x, y, size, size, color);
}

function drawCircle(x, y, r, color = '#ff33ff') {
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  glBegin(GL_POLYGON);
  for (let i = 0; i < 360; i++) {
    let degInRad = (i * Math.PI) / 180;
    glVertex2f(x + Math.cos(degInRad) * r, y + Math.sin(degInRad) * r);
  }
  glEnd();
}

function drawTriangle(x1, y1, x2, y2, x3, y3, color = '#ff33ff') {
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  glBegin(GL_TRIANGLES);
  glVertex2f(x1, y1);
  glVertex2f(x2, y2);
  glVertex2f(x3, y3);
  glEnd();
}

function drawSun(x, y, r, color = '#f7db02') {
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  // Vẽ mặt trời chính
  drawCircle(x, y, r, color);
  // Vẽ các tia nắng
  let rays = 12; // Số lượng
  let rayLength = r * 1.5; // Đọ dài
  let rayThickness = 2; // Độ dày
  drawSunWithRays(x, y, r, 0, color);
}

function drawSunWithRays(x, y, r, angle, color = '#f7db02', rays = 12, rayLength = r * 1.5, rayThickness = 2) {
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  drawCircle(x, y, r, color);
  for (let i = 0; i < rays; i++) {
    let rayAngle = angle + (i * 2 * Math.PI) / rays;
    for (let j = -rayThickness / 2; j <= rayThickness / 2; j++) {
      let offsetAngle = rayAngle + (j * Math.PI) / 180;
      let x1 = x + Math.cos(offsetAngle) * r;
      let y1 = y + Math.sin(offsetAngle) * r;
      let x2 = x + Math.cos(offsetAngle) * rayLength;
      let y2 = y + Math.sin(offsetAngle) * rayLength;
      glColor3f(1, 1, 0);
      glBegin(GL_LINES);
      glVertex2f(x1, y1);
      glVertex2f(x2, y2);
      glEnd();
    }
  }
}

// function animateSun(x, y, r, color = '#f7db02') {
//   let angle = 0;g
//   function draw() {
//     glClear(GL_COLOR_BUFFER_BIT);
//     drawGrid();
//     drawSunWithRays(x, y, r, angle, color);
//     angle += 0.01; // Tốc độ quay
//     requestAnimationFrame(draw);
//   }
//   draw();
// }

// animateSun(0, 0, 50);

function drawMoon(x, y, r) {
  // Vẽ hình tròn chính (màu trắng xám)
  drawCircle(x, y, r, '#d8d8d8');
  // Vẽ các hình tròn nhỏ bên trong
  drawCircle(x - r * 0.4, y + r * 0.3, r * 0.2, '#999999', 40);
  drawCircle(x + r * 0.4, y + r * 0.5, r * 0.1, '#999999', 40);
  drawCircle(x + r * 0.5, y - r * 0.3, r * 0.3, '#b1b1b1', 40);
}

function drawStar(x, y, outerRadius, color = '#f7db02') {
  // 0.382 là tỉ lệ giữa bán kính trong và bán kính ngoài (để các cánh sao có thể thẳng hàng)
  let innerRadius = outerRadius * 0.382;
  let angle = Math.PI / 2; // Bắt đầu từ đỉnh hướng lên trên
  let angleIncrement = (2 * Math.PI) / 10; // Góc giữa các điểm (36 độ)
  glColor3f(hex2rgb(color)[0], hex2rgb(color)[1], hex2rgb(color)[2]);
  glBegin(GL_TRIANGLE_FAN);
  // Đỉnh trung tâm
  glVertex2f(x, y);
  for (let i = 0; i <= 10; i++) {
    // <= 10 để lặp lại đỉnh đầu, đóng kín hình
    let r = i % 2 === 0 ? outerRadius : innerRadius;
    let curX = x + r * Math.cos(angle);
    let curY = y + r * Math.sin(angle);
    glVertex2f(curX, curY);
    angle += angleIncrement;
  }
  glEnd();
}

function drawVietNamFlag(x, y, width, height = width*(2/3)) {
  // Vẽ cờ
  drawRetagle(x, y, width, height, '#ff0000');
  // Vẽ sao
  drawStar(x + width * 0.5, y - height * 0.5, width * (1/5), '#ffff00');
}
