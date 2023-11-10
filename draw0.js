// Získání reference k HTML canvas elementu s id 'myCanvas'
let canvas = document.getElementById("myCanvas");

// Získání 2D vykreslovacího kontextu pro canvas
let ctx = canvas.getContext("2d");

// Nastavení barvy výplně na černou
ctx.fillStyle = "#000000";

// Vykreslení obdélníka, který pokryje celý canvas touto černou barvou
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Funkce pro vykreslení kruhu s srafováním čarami na plátno s danými parametry
function drawHatchedCircle(x, y, r, col, hatchSpacing) {
  ctx.strokeStyle = col;
  ctx.lineWidth = 2;

  // Vykreslení kruhu
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();

  // Vytvoření srafování s nastavitelným prostorem mezi čarami (hatchSpacing)
  for (let angle = 0; angle < Math.PI * 2; angle += hatchSpacing) {
    let x1 = x + r * Math.cos(angle);
    let y1 = y + r * Math.sin(angle);
    let x2 = x;
    let y2 = y;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
}

// Funkce pro vykreslení trojúhelníka s vnořenými nevyplněnými trojúhelníky
function drawNestedTriangles(x, y, size, levels, col) {
  ctx.strokeStyle = col;
  for (let i = 0; i < levels; i++) {
    let height = (Math.sqrt(3) / 2) * size;
    let x1 = x - size / 2;
    let y1 = y + height / 2;
    let x2 = x + size / 2;
    let y2 = y + height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    size -= 10; // Zmenšení velikosti pro další vnořený trojúhelník
  }
}

// Funkce pro vykreslení hvězdy na plátno s danými parametry
function drawStar(x, y, size, col) {
  ctx.strokeStyle = col;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      x + size * Math.cos((18 + i * 72) / 180 * Math.PI),
      y + size * Math.sin((18 + i * 72) / 180 * Math.PI)
    );
    ctx.lineTo(
      x + (size / 2) * Math.cos((54 + i * 72) / 180 * Math.PI),
      y + (size / 2) * Math.sin((54 + i * 72) / 180 * Math.PI)
    );
  }
  ctx.closePath();
  ctx.stroke();
}

// Funkce pro vykreslení čtverce na plátno s danými parametry
function randomPentagon() {
    let size = Math.random() * 100 + 50;
    let x = Math.random() * (canvas.width - size);
    let y = Math.random() * (canvas.height - size);
    let c = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawPentagon(x, y, size, c);
  }
  
  function drawPentagon(x, y, size, col) {
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(x + size * Math.cos((2 * Math.PI * i) / 5), y + size * Math.sin((2 * Math.PI * i) / 5));
    }
    ctx.closePath();
    ctx.fill();
  }

// Funkce pro vykreslení obdélníka na plátno s danými parametry
function drawRectangle(x, y, w, h, col) {
  ctx.strokeStyle = col;
  ctx.beginPath();
  ctx.rect(x - w / 2, y - h / 2, w, h);
  ctx.stroke();
}


function drawTarget(x, y, size, col) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = col;
  
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(x, y, size - i * 20, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  
  function randomTarget() {
    let size = Math.random() * 50 + 50; // Náhodná velikost mezi 50 a 100
    let x = Math.random() * (canvas.width - size * 2) + size; // Náhodná pozice x s ohledem na velikost terče
    let y = Math.random() * (canvas.height - size * 2) + size; // Náhodná pozice y s ohledem na velikost terče
    let c = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    drawTarget(x, y, size, c);
  }

// Přidání posluchače událostí k celému dokumentu pro detekci stisku klávesy
document.addEventListener("keydown", function (event) {
  // Náhodné souřadnice a barva pro nový tvar
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

  switch (event.code) {
    case "KeyR":
      drawHatchedCircle(x, y, 30, col, 0.2); // Změňte hodnotu hatchSpacing podle vaší preference
      break;
    case "KeyS":
      drawNestedTriangles(x, y, 100, 4, col);
      break;
    case "KeyH":
      drawStar(x, y, 40, col);
      break;
    case "KeyC":
        randomPentagon();
      break;
    case "KeyO":
      drawRectangle(x, y, 70, 40, col);
      break;

    case "KeyT":
        randomTarget();
        break;
  }
});