
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
  const trackU = kkk * 0.05;
  const trackD = kkk * 0.08;

  ctx.fillStyle = "#201000";
  ctx.fillRect(0, groundTop, aaaa, groundHeight);

  for (let i = 0; i < lll; i += 30) {
    const barX = i - xgr;
    if (barX >= -30 && barX <= aaaa + 30) {
      ctx.fillStyle = "#818A8B";
      ctx.fillRect(barX, groundTop + trackU - kkk/100, 10, trackU);
      ctx.fillRect(barX, groundTop + groundHeight - trackD - kkk/100, 10, trackU);
    }
  }

  for (let i = 0; i < lll; i += aaaa / 2) {
    const screenX = i - xgr;
    const xox = kkk * 0.075;

    if (screenX >= -60 && screenX <= aaaa + 60) {
      ctx.fillStyle = "#000";
      ctx.fillRect(screenX, kkk * 0.7, 40, xox);
      ctx.fillRect(screenX - 10, kkk * 0.775, 60, xox);
      ctx.fillRect(screenX - 20, kkk * 0.85, 80, xox);
      ctx.fillRect(screenX - 30, kkk * 0.925, 100, xox);
    }
  }

  ctx.strokeStyle = "#42220b";
  ctx.lineWidth = 5;
  const offsets = [groundTop + trackU, groundTop + trackD, groundTop + groundHeight - trackD, groundTop + groundHeight - trackU];

  ctx.beginPath();
  for (let offset of offsets) {
    ctx.moveTo(-xgr, offset);
    ctx.lineTo(aaaa, offset);
  }
  ctx.stroke();
}






// TRAIN BLOCK...

let swich = false;
let startY = 0;
let targetY = 0;
let trainBob = 0;
let trainDirection = 1;
let crash = false;
let trainHop = 0;
let Hopx = 1;


function doTrt(timez) {
  if (crash) return;

  trainBob += 0.5 * trainDirection;
  if (trainBob > 5 || trainBob < -5) trainDirection *= -1;
  
  trainHop += 0.3 * Hopx;
  if (trainHop > 2 || trainHop < -2) Hopx *= -1;
  const trx = train.x + trainHop;

  let baseY;
  if (swich) {
    const t = Math.min(timez / 200, 1);
    baseY = startY + (targetY - startY) * t;

    if (t >= 1) {
      swich = false;
      traintime = 0;
    }
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


function doItems(xgr, lll, kkk) {

  for (let dot of crystals) {
    const screenX = dot.x - xgr;
    if (screenX >= -40 && screenX <= lll + 40) {
      ctx.beginPath();
      ctx.arc(screenX, dot.y * kkk, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
    }
  }


  obstacles.forEach(ob => {
    const obhh = ob.t ? k : l;
    const screenX = ob.x - xgr;
    if (screenX > -ob.width && screenX < lll) {
      ctx.drawImage(ob.img, screenX, ob.y + obhh, ob.width, ob.height);
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
      ctx.drawImage(gpImg, blockX, gp.y*kkk + gp.dy, gp.width, gp.height);
      ctx.restore();
    }
    
    if (!gp.got && blockX > -gp.width && blockX < lll) {
      ctx.drawImage(gpImg, blockX, gp.y*kkk, gp.width, gp.height);
    }
  });
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
      showAdvance = true;
      doAdv();
      monsterSpeed = monsterMax;
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
  ctx.drawImage(monsterImg, screenX + 25 + flor(20), screenY, size, size);
  ctx.globalAlpha = 1.0;
  ctx.drawImage(monsterImg, screenX, screenY, size, size);
}





// OBSTACLE COLLISION...

const cpop = ["😅 OOpsie HOpsie Doo...!", "Rail Shifter Crahed 😅...!"];

function crashOb(xgr) {
  for (let ob of obstacles) {
    const obSX = ob.x - xgr;
    if (
      train.x < obSX + ob.width &&
      train.x + train.width > obSX &&
      train.top === ob.t
    ) {
      crash = true;
      fadeOutMusic();
      boom.play();
      gamePaused = true;
      const obhh = ob.t ? k : l
      reUpdate(180, 1, obSX - ob.width, ob.y + obhh - ob.height, CH/2);
      flash();
      const pp = cpop[flor(2)];
      setTimeout(() => {showPopup(pp)},1200);
    }
  }
}





// MONSTER COLLISION...

function crashMrs(xgr, spx) {
  if (monsta) {
    monsta.x -= monsta.speed * spx * 60;
    const mrSX = monsta.x - xgr;
    if (
      train.x < mrSX + train.height &&
      train.x + train.width > mrSX &&
      train.top === monsta.mt
    ) {
      crash = true;
      fadeOutMusic();
      boom.play();
      gamePaused = true;
      reUpdate(180, 2, mrSX - train.width, monsta.y - train.height, CH/2);
      flash();
      const pp = cpop[flor(2)];
      setTimeout(() => {showPopup(pp)},1200);
    } else if (monsta.x < -100 || monsta.x < xgr - 500) {
      monsta = null;
    }
  }
}





// STATION COLLISION...

function crashStat(xgr) {
  if (xgr < stat.x - 200 || stat.rtx) return;

  stat.rtx = true;
  showPopup("😤 Saving the Checkpoint...! 🚉");
  saveCp();
  monsta = null;
  let cs = acc;
  acc = 0;
  kb-=10;

  ci = setInterval(() => {
    if (speedX <= 0) {
      speedX = 0;
      clearInterval(ci);
    } else {
      speedX -= 0.2;
    }
  },25);

  setTimeout(() => {
    ending = 50000 + rand(20000);
    loadCp();
    acc = cs;
    flash();
    setTimeout(() => {showPopup("😎 Checkpoint Saved...! 🚉")},1000);
  },2000);
}





// HANDLING BLOCK...

let righto = false;
let lefto = false;
let pressT = false;
let cameraX = 0;
let speedX = 0;
let remind = 0;
let reach = 0;
let braver = true;
let lasting = 0;
let border = 0;
let challenge = false;


function handleSpeed(xgr, dt) {

  if (righto) {
    remind = 0;
    speedX = Math.min(speedX + acc*dt, trainMax);
    if (xgr > reach) reach = xgr;

  } else if (lefto) {
    remind = 0;
    if (xgr > 0) speedX = Math.max(speedX - acc*dt, -trainMax);

    if (xgr <= reach - 1000 || xgr <= border) {
      speedX = 0;
      if (braver) {
        const msg = rand() > 0.5 ? "🔥 Brave People... Never Turn Back!" : "🔥 What's the fear to move Back...";
        showPopup(msg);
        braver = false;
        setTimeout(() => {braver = true},3500);
      }
    }

  } else {
    remind++;
    if (xgr <= 0) speedX = 0;
    if (speedX > 0) speedX = Math.max(0, speedX - fri*dt);
    if (speedX < 0) speedX = Math.min(0, speedX + fri*dt);
  }

  if (remind >= 2000) {
    remind -= 300;
    const rmd = rand() > 0.5 ? "🔥 Its time to move ahead..." : "🔥 Let's move on Buddy...";
    showPopup(rmd);
  }

  if (reach > CW*3 && !challenge) {
    challenge = true;
    border = reach;
    const rmd = rand() > 0.5 ? "🔥 The real game is started now..." : "🔥 The challenge begins here...";
    showPopup(rmd);
  }

  if (reach > ending-2000 && challenge) {
    challenge = false;
    border = reach;
    const rmd = rand() > 0.5 ? "🔥 Safe Area Entered..." : "🔥 Calamity Surviver...";
    showPopup(rmd);
  }
}


let lasttime = 0;
let timer = 400;
let kb = 0;
let lastly = 0;
let traintime = 0;


function hyper(timez,xgr) {
  if (timez - lasttime > timer) {
    const pyro = Math.abs(speedX);
    pyro < 4 ? timer = (rand() > 0.5 ? 400 : 700) : (pyro < 7.5 ? timer = 300 : (pyro < 10.5 ? timer = 200 : timer = 100));

    diesel ? genSmoke(xgr) : genSpark(pyro);
    lasttime = timez;
  }

  if (timez - lastly > 400) {
    for (let dot of crystals) dot.radius = 2 + rand(5);
    lastly = timez;

    if (!challenge) return;
    kb++;

    if (kb > 25) {
      spawnMonster();
      kb = 0;
    }
  }
}





// GAME LOOPS...

function update(timestamp) {
  if (gamePaused || !gameRunning || crash) return;

  let deltaT = (timestamp - lasting)/1000;
  if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 0.016;
  lasting = timestamp;

  cameraX += speedX;
  const topo = CW;
  const hopo = CH;
  const eepo = ending;
  const camx = cameraX;

  if (swich) traintime += 16 / (60 * deltaT);

  ctx.clearRect(0, 0, topo, hopo);

  if (change) changer(reach);
  hyper(timestamp,camx);
  handleSpeed(camx, deltaT);

  doBg(camx, topo, hopo);
  doArea(camx, topo, eepo+5000, hopo);
  doItems(camx, topo, hopo);
  doStat(camx, topo, hopo);
  diesel ? doSmoke(camx) : doSparks();
  
  doTrt(traintime);
  doMrs(camx);

  if (camx < topo * 1.5) doPlot(600 - camx, hopo);
  if (camx > eepo) doPlot(stat.x + 300 - camx, hopo, 1);

  progression(reach, eepo+2000);
  crashMrs(camx, deltaT);
  crashOb(camx);
  crashStat(camx);
  if (isfps) doFPS(timestamp, topo);

  requestAnimationFrame(update);
}



function reUpdate(allowed, reas, ax, bx, esc) {
  if (allowed > 0) {
    const topo = CW;
    const hopo = CH;
    const eepo = ending;
    const camx = cameraX;
    ctx.clearRect(0, 0, topo, hopo);
    
    doBg(camx, topo, hopo);
    doArea(camx, topo, eepo+5000, hopo);
    doItems(camx, topo, hopo);
    doStat(camx, topo, hopo);
    doMrs(camx);
    if (camx < topo * 1.5) doPlot(600 - camx, hopo);
    if (camx > eepo) doPlot(stat.x + 300 - camx, hopo, 1);
    doExp(ax, bx, esc);
    allowed--;

    requestAnimationFrame(() => reUpdate(allowed, reas, ax, bx, esc));
  } else {
    setTimeout(() => gOver(reas), 250);
  }
}





// PC CONTROLS BLOCK...

function isKey(e, keys) {
  return keys.includes(e.key) || keys.includes(e.code);
}


window.addEventListener("keydown", (e) => {
  if (gamePaused && !gameRunning) return;

  const isModal = ele('modal').style.display === 'block';

  if (isKey(e, ["Space", "Shift", "s", "S"])) {
    swicher();
    pressT = true;
  }

  if (isKey(e, ["p", "P"])) resumePause();
  if (isKey(e, ["m", "M"])) musicToggle();
  if (isKey(e, ["c", "C"])) collects();

  if (isKey(e, ["ArrowRight", "d", "D"])) {
    righto = true;
    if (isModal) nexting();
  }

  if (isKey(e, ["ArrowLeft", "a", "A"])) {
    lefto = true;
    if (isModal) pasting();
  }
});


window.addEventListener("keyup", (e) => {
  if (isKey(e, ["Space", "Shift", "s", "S"])) pressT = false;
  if (isKey(e, ["ArrowRight", "d", "D"])) righto = false;
  if (isKey(e, ["ArrowLeft", "a", "A"])) lefto = false;
});




// MOBILE CONTROLS BLOCK...

ele("lefter").addEventListener("pointerdown",() => lefto = true);

ele("lefter").addEventListener("pointerup", () => lefto = false);

ele("righter").addEventListener("pointerdown", () => righto = true);

ele("righter").addEventListener("pointerup", () => righto = false);

ele("switcher").addEventListener("click", () => {
  if (!gamePaused && gameRunning) swicher()
});





// FINAL BLOCK...

function startGame() {
  
  const help = [
    "😤 You can always set Train Speed from Settings",
    "😤 Boost your Reflexes by increasing difficulty & speed",
    "😤 You can always set Monster Difficulty from Settings",
    "🔥 Track & Enable game FPS via settings",
    "😤 You have the permissions to reset your progress",
    "🔥 Always learn from your tiny mistakes",
    "😎 Use Toggle-Music and Pause-Resume feature effectively",
    "😎 Collect Graphene using 🤑 button",
    "😎 Increase your XP + Slow down Monster - by practicing ADVANCE",
  ];

  on('dark');
  const i = flor(help.length);
  if (change) climate();
  loadCp();

  setTimeout(() => showPopup(help[i]), 500);

  setTimeout(() => {
    off('dark');
    on('gameCanvasX');
    on('envy');
    if (musicOn) fadeInMusic();
    update();
    flash();
  }, 3500);
}


ele("startBtn").addEventListener("click", () => {
  if (bgImg && trainImg && monsterImg) {
    off('menuxBtn');
    music.currentTime ='0';
    startGame();
    setTimeout(() => {showPopup("🔥 Time for the Torgue 🔥")}, 4500);
  } else {
    showPopup("Please Choose All the Skins for the GamePlay First...!");
  }
});
