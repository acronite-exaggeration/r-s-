
const k = CH * 0.35 + 48 - CH * 0.17;
const l = k + CH * 0.35 - 78;

// STATION BLOCK...

const statUp = imgload("others/statup.jpg");
const statDown = imgload("others/statdown.jpg");

const stat = { x: ending+2000 , rtx: false , plot: 0 , };


function doStat(xgr, lll, kkk) {
  const statX = stat.x - xgr;
  const statY = kkk * 0.35;
  const statE = kkk * 0.3;
  const statR = kkk * 0.7;

  if (xgr < lll * 1.5) {
    ctx.drawImage(statUp, -xgr - 10, 0, 1500, statY);
    ctx.drawImage(statDown, -xgr -10, statR, 1500, statE);
  }

  if (statX < lll * 1.5) {
    ctx.drawImage(statUp, statX, 0, 1500, statY);
    ctx.drawImage(statDown, statX, statR, 1500, statE);
  }
}


function doPlot(x, kkk, p = 0) {
  const boardWidth = kkk/10;
  const boardHeight = kkk * 0.41;
  const boardY = kkk * 0.32;

  ctx.fillStyle = "#111";
  ctx.fillRect(x, boardY, boardWidth, boardHeight);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, boardY, boardWidth, boardHeight);

  ctx.save();
  ctx.translate(x + boardWidth / 2, boardY + boardHeight / 2);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = "#ffcc00";
  ctx.font = `bold ${boardWidth/2}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(`Platform -- ${stat.plot + p}`, 0, 8);
  ctx.restore();
}





// AREA MAINTAIN BLOCK...

function doArea(xgr, aaaa, lll, kkk) {
  const groundTop = kkk * 0.35;
  const groundHeight = kkk * 0.35;

  ctx.fillStyle = "#201000";
  ctx.fillRect(0, groundTop, aaaa, groundHeight);

  for (let i = 0; i < lll; i += 30) {
    const barX = i - xgr;
    if (barX >= -30 && barX <= aaaa + 30) {
      ctx.fillStyle = "#818A8B";
      ctx.fillRect(barX, groundTop + 23, 10, 34);
      ctx.fillRect(barX, groundTop + groundHeight - 57, 10, 34);
    }
  }

  for (let i = 0; i < lll; i += aaaa / 2) {
    const screenX = i - xgr;
    if (screenX >= -60 && screenX <= aaaa + 60) {
      ctx.fillStyle = "#000";
      ctx.fillRect(screenX, kkk - 175, 40, 50);
      ctx.fillRect(screenX - 10, kkk - 125, 60, 50);
      ctx.fillRect(screenX - 20, kkk - 75, 80, 50);
      ctx.fillRect(screenX - 30, kkk - 25, 100, 50);
    }
  }

  ctx.strokeStyle = "#42220b";
  ctx.lineWidth = 5;
  const offsets = [groundTop + 31, groundTop + 49, groundTop + groundHeight - 49, groundTop + groundHeight - 31];

  ctx.beginPath();
  for (let offset of offsets) {
    ctx.moveTo(-xgr, offset);
    ctx.lineTo(aaaa, offset);
  }
  ctx.stroke();
}






// TRAIN BLOCK...

let swich = false;
let sTime = 0;
let startY = 0;
let targetY = 0;
let trainBob = 0;
let trainDirection = 1;
let crash = false;
let trainHop = 0;
let Hopx = 1;

let train = {
  x: CW/20,
  width: CW * 0.23,
  height: CH * 0.17,
  top: true,
};


function doTrt() {
  if (crash) return;

  trainBob += 0.5 * trainDirection;
  if (trainBob > 5 || trainBob < -5) trainDirection *= -1;
  
  trainHop += 0.3 * Hopx;
  if (trainHop > 2 || trainHop < -2) Hopx *= -1;
  const trx = train.x + trainHop;

  let baseY;
  if (swich) {
    const elapsed = Date.now() - sTime;
    const t = Math.min(elapsed / 200, 1);
    baseY = startY + (targetY - startY) * t;

    if (t >= 1) swich = false;
  } else {
    baseY = train.top ? k : l;
  }

  if (swich && !crash) {
    for (let i = 0; i < train.width *1.2; i += 12) {
      ctx.fillStyle = "#5dade2";
      ctx.fillRect(trx - train.width/10 + i , baseY + trainBob, 4, 100);
    }
  }

  ctx.drawImage(trainImg, trx, baseY + trainBob, train.width, train.height);
}


function swicher() {
  if (swich) return;
  swich = true;
  sTime = Date.now();
  startY = train.top ? k : l;
  targetY = train.top ? l : k;
  train.top = !train.top;
  sound.currentTime = '0';
  sound.play();
}





// ITEMS BLOCK...

const cryCol = ["#00f0ff", "#ff00f0", "#00ff88", "#ffee00", "#ff6600", "#df0000", "#5800df"];
const gpImg = imgload("others/graphene.png");
let gpGot = 0;
let requirement = 50;
let crystals = [];
let obstacles = [];
let gpBlocks = [];


function doItems(xgr, lll) {

  for (let dot of crystals) {
    const screenX = dot.x - xgr;
    if (screenX >= -40 && screenX <= lll + 40) {
      ctx.beginPath();
      ctx.arc(screenX, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    }
  }


  obstacles.forEach(ob => {
    const screenX = ob.x - xgr;
    if (screenX > -ob.width && screenX < lll) {
      ctx.drawImage(ob.img, screenX, ob.y, ob.width, ob.height);
    }
  });


  gpBlocks.forEach(gp => {
    const blockX = gp.x - xgr;

    if (gp.got && gp.animating) {
      gp.alpha -= 0.03;
      gp.dy -= 1;

      if (gp.alpha <= 0) gp.animating = false;

      ctx.save();
      ctx.globalAlpha = Math.max(gp.alpha, 0);
      ctx.drawImage(gpImg, blockX, gp.y + gp.dy, gp.width, gp.height);
      ctx.restore();
    }
    
    if (!gp.got && blockX > -gp.width && blockX < lll) {
      ctx.drawImage(gpImg, blockX, gp.y, gp.width, gp.height);
    }
  });
}





// GENERATOR BLOCK...

function collects() {
  if (!gameRunning || gamePaused) return;
  const past = gpGot;

  gpBlocks.forEach(gp => {
    const box = gp.x - cameraX;
    const isgp = (box >= 0 && box <= CW) && (gp.y >= 0 && gp.y <= CH);

    if (!gp.got && isgp) {
      gp.got = true;
      gp.animating = true;
      gp.alpha = 1;
      gp.dy = 0;
      gpGot++;
    }
  });

  if (past !== gpGot) {
    treat.currentTime = '0';
    treat.play();
  }
}


function genX() {
  const var1 = CH/7;
  const var2 = CW * 1.5;
  const var3 = CH/10;
  const var4 = CH/16;
  const l2 = ending;
  const l1 = Math.floor(l2/12);
  const upping = CH * 0.36;
  const highing = CH * 0.32;
  const guu = CH * 0.42;
  const ghh = CH * 0.2;
  crystals = [];
  obstacles = [];
  gpBlocks = [];
  
  for (let i = 0; i < l1; i++) {
    crystals.push({
      x: rand(l2 + 4000),
      y: upping + rand(highing),
      radius: 1,
      color: cryCol[flor(cryCol.length)],
    });
  }

  for (let i = var2; i < l2; i+= CW/4 + flor(300)) {
    const topp = rand() < 0.5;
    const robs = obi[flor(obi.length)];
    const scaler = var1/robs.naturalHeight;
    const scaleww = robs.naturalWidth * scaler;
    obstacles.push({
      x: i,
      y: topp ? k + var4 : l + var4,
      height: var1,
      width: scaleww,
      img: robs,
      t: topp ? true : false,
    });
  }

  for (let i = var2; i < l2; i+= 70 + flor(500)) {
    gpBlocks.push({
      x: i,
      y: guu + flor(ghh),
      width: var3,
      height: var3,
      got: false,
      animating: false,
      alpha: 1,
      dy: 0,
    });
  }
}


genX();





// MONSTER BLOCK...

const monsterRoar = new Audio("roarx.mp3");
let monsta = null;
let monsterCount = 0;
let monsterSpeed = monsterBase;
let monsterBob = 0;
let monsterDirection = 1;
let monsterSway = 0;
let swayDirection = 1;


function spawnMonster() {
  if (!monsta) {
    monsterSpeed = monsterBase + monsterCount;

    if (monsterSpeed >= monsterMax) {
      doAdv();
      monsterSpeed = monsterMax;
      showAdvance = true;
    }

    monsterCount += mup;
    const mons = rand() < 0.5;

    monsta = {
      x: cameraX + CW + 150,
      y: mons ? k : l,
      speed: monsterSpeed,
      mt: mons,
    };
    monsterRoar.play();
  }
}


function doMrs(xgr) {
  if (!monsta) return;

  monsterBob += 0.5 * monsterDirection;
  if (monsterBob > 5 || monsterBob < -5) monsterDirection *= -1;

  monsterSway += 0.5 * swayDirection;
  if (monsterSway > 5 || monsterSway < -5) swayDirection *= -1;

  const size = train.height;
  const screenX = monsta.x - xgr + monsterSway;
  const screenY = monsta.y + monsterBob;

  for (let i = 0; i < size; i += 2) {
    const color = rand(3);

    const flameColor = color < 1 ? "#ff6502" : (color < 2 ? "#ffe802" : "#000");

    const flameWidth = i < size/2 ? 20 + i/2 + rand(70) : 50 + (size - i)/2 + rand(70);

    ctx.fillStyle = flameColor;
    ctx.fillRect(screenX + size / 3, screenY + i, flameWidth, 2);
  }

  ctx.globalAlpha = 0.3;
  ctx.drawImage(monsterImg, screenX + 25 + flor(15), screenY, size, size);
  ctx.globalAlpha = 1.0;
  ctx.drawImage(monsterImg, screenX, screenY, size, size);
}
