
// OBSTACLE COLLISION...

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
      reUpdate(180, 1, obSX - ob.width, ob.y - ob.height, CH/2);
      flash();
      setTimeout(() => {showPopup("😅 OOpsie HOpsie Doo...!")},1200);
    }
  }
}





// MONSTER COLLISION...

function crashMrs(xgr) {
  if (monsta) {
    monsta.x -= monsta.speed;
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
      monsta = null;
      setTimeout(() => {showPopup("😅 OOpsie HOpsie Doo...!")},1200);
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
let lasting = performance.now();


function handleSpeed(xgr, dt) {
  if (righto) {
    remind = 0;
    speedX = Math.min(speedX + acc*dt, trainMax);
    if (xgr > reach) reach = xgr;

  } else if (lefto) {
    remind = 0;
    if (xgr > 0) speedX = Math.max(speedX - acc*dt, -trainMax);

    if (xgr <= 0 || xgr <= reach - 1000) {
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
}


let lasttime = 0;
let timer = 400;
let kb = 0;
let lastly = 0;


function hyper(timez,xgr) {
  if (timez - lasttime > timer) {
    const pyro = Math.abs(speedX);
    pyro < 4 ? timer = (rand() > 0.5 ? 400 : 700) : (pyro < 7.5 ? timer = 300 : (pyro < 10.5 ? timer = 200 : timer = 100));

    diesel ? genSmoke(xgr) : genSpark(pyro);
    lasttime = timez;
  }

  if (timez - lastly > 400) {
    for (let dot of crystals) dot.radius = 2 + rand(5);
    kb++;
    lastly = timez;

    if (kb > 25) {
      spawnMonster();
      kb = 0;
    }
  }
}





// GAME LOOPS...

function update(timestamp) {
  if (gamePaused || !gameRunning || crash) return;

  const deltaT = (timestamp - lasting)/1000;
  lasting = timestamp;

  cameraX += speedX;
  const topo = CW;
  const hopo = CH;
  const eepo = ending;
  const camx = cameraX;

  ctx.clearRect(0, 0, topo, hopo);

  if (change) changer(reach);
  hyper(timestamp,camx);
  handleSpeed(camx, deltaT);

  doBg(camx, topo, hopo);
  doArea(camx, topo, eepo+4000);
  doItems(camx, topo);
  doStat(camx, topo);
  diesel ? doSmoke(camx) : doSparks();
  doTrt();
  doMrs(camx);

  if (camx < topo * 1.5) doPlot(600 - camx);
  if (camx > eepo) doPlot(stat.x + 300 - camx, 1);

  progression(reach, eepo+2000);
  crashMrs(camx);
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
    doArea(camx, topo, eepo+4000);
    doItems(camx, topo);
    doStat(camx, topo);
    doExp(ax, bx, esc);
    allowed--;

    requestAnimationFrame(() => reUpdate(allowed, reas, ax, bx, esc));
  } else {
    gOver(reas);
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
