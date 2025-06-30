
// CHECKPOINT BLOCK...

function saveCp() {
  const cpData = {
    rrr: run + Math.floor(reach / 50),
    xp: exp + epo,
    org: requirement,
    gt: gpGot,
    pt: stat.plot + 1,
  };
  localStorage.setItem('trainGameCheckpoint', JSON.stringify(cpData));
}


function loadCp() {
  reach = 0;
  cameraX = 0;
  epo = 0;
  run = 0;
  speedX = 0;
  showAdvance = false;
  requirement = 50;
  monsterSpeed = monsterBase;
  monsterCount = 0;
  mono = 0.9;
  gamePaused = false;
  gameRunning = true;
  crash = false;
  kb = 0;
  monsta = null;
  gpGot = 0;
  ski = 20000 + rand(7000);
  border = 0;
  challenge = false;
  genX();
  const sData = gett('trainGameCheckpoint');

  if (sData) {
    const cpp = JSON.parse(sData);
    run = cpp.rrr;
    exp = cpp.xp;
    requirement = cpp.org;
    gpGot = cpp.gt || 0;
    stat.plot = cpp.pt;
    stat.rtx = false;
  }
}


function existCp() {return gett("trainGameCheckpoint") !== null}


function delCp(ddd) {
  if (ddd === 1) {
    if (existCp()) {
      localStorage.removeItem('trainGameCheckpoint');
      showPopup("😎 Checkpoint was removed succesfully...!");
    } else {
      showPopup("😤 No checkpoint exists, so no need for Reset...!");
    }

  } else if (ddd === 2) {
    ["bgData", "trData", "mrData", "trEdit", "mrsEdit", "isfpsc"].forEach(id => {
      localStorage.removeItem(id);
    });
    showPopup("😎 All settings default...");
    bgImg = null;
    trainImg = null;
    monsterImg = null;
    editz(2);
    editz(6);
    const allImgs = document.querySelectorAll('img');
    allImgs.forEach(im => im.classList.remove("selecta"));
    
  } else {
    showPopup("😤...Hmm...Progress!");
  }
}





// GAME OVER BLOCK...

let q;
const query = [
  "🔥 Why these obstacles...Hmm...",
  "🔥 Im gonna burst all these obstacles...",
  "🔥 Why only me - ***********",
  "🔥 You will pay for this... Monster",
  "🔥 Damn... This monster",
  "🔥 What the Hell - ************",
];


function gOver(rg) {
  off('gameCanvasX');
  off('envy');
  const rt = ele('gameReason');

  if (rg === 1) {
    rt.innerHTML = "<h2>GAME OVER : THE TRAIN DONE COLLISION</h2>";
    q = flor(3);
  } else {
    rt.innerHTML = "<h2>GAME OVER : MONSTER DESTROYED THE TRAIN</h2>";
    q = 3 + flor(3);
  }

  ele('continueBtn').innerText = existCp() ? "Continue" : "Restart";
  on('gameOver', 1);
}


function gEnd() {
  off('gameCanvasX');
  off('gameOver');
  off('sidebar');
  setTimeout(() => {
    ele('gameCanvasX').classList.remove("blur");
  },500);
  on('endu');
  setTimeout(() => {on('enduBtn',2)}, 2000);
}


function ends() {
  off('gameCanvasX');
  off('gameOver');
  off('sidebar');
  setTimeout(() => {
    ele('gameCanvasX').classList.remove("blur");
  },500);
  off('dark');
  off('endu');
  off('enduBtn');
  setTimeout(() => on('menuxBtn',2), 2000);
}


function conCp() {
  off('gameOver');
  startGame();
  setTimeout(() => {showPopup(query[q])}, 4500);
}





// POPUP BLOCK...

function showPopup(msg = "Popup!", dura = 2500) {
  const container = document.getElementById('popupContainer') || (() => {
    const div = document.createElement('div');
    div.id = 'popupContainer';
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.zIndex = '9999999';
    div.style.pointerEvents = 'none';
    document.body.appendChild(div);
    return div;
  })();

  const popup = document.createElement('div');
  popup.className = 'Popup';
  popup.innerText = msg;
  popup.style.opacity = '0';
  
  container.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.opacity = '1';

    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
        popup.remove();
      }, 1000);
    }, dura);
  });
}





// BACKGROUND HANDLING BLOCK...

let ski;


function climate() {
  if (!change) return;

  const available = backx.filter(bg => bg !== bgImg);
  if (available.length === 0) return;

  const demo = available[flor(available.length)];

  bgImg = demo;
  setTimeout(() => flash(3), 10);
}


if (change) climate();


function changer(xgr) {
  if (xgr >= ski) {
    climate();
    ski += 20000 + rand(7000);
  }
}


function doBg(xgr, lll, uuu) {
  const bgw = bgImg.width * (uuu / bgImg.height);
  const init = -xgr/4 % bgw;
  for (let x = init; x < lll; x += bgw) ctx.drawImage(bgImg, x, 0, bgw, uuu);
}





// ADVANCE BLOCK...

let showAdvance = false;
let advanceAF;


function doAdv() {
  if (advanceAF) return;

  function ina() {
    if (showAdvance) {
      ele('advance').style.display = gamePaused ? "none" : "block";
      const visible = Math.floor(Date.now() / 400) % 2 === 0;
      ele('advance').style.opacity = visible ? '1' : '0';
    } else {
      cancelAnimationFrame(advanceAF);
      ele('advance').style.display = 'none';
    }
    advanceAF = requestAnimationFrame(ina);
  }
  ina();
}


function adv() {
  if (showAdvance && gpGot >= requirement) {
    monsterSpeed = monsterBase;
    monsterCount = 0;
    showAdvance = false;
    gpGot -= requirement;
    epo++;
    requirement += 1 + flor(4);
    electricBurst();
    setTimeout(() => {showPopup("🔥 Used ADVANCE ~ XP Boosted!")},1000);
  } else {
    showPopup(`🔥 Minimum ${requirement} Graphene Needed for ADVANCE!`);
  }
}





// ELECTRIC BURST EFFECT...

function electricBurst() {
  const parts = [];
  const x = train.x + train.width/2;
  const y = train.top ? k + train.height/2 : l + train.height/2;

  for (let i = 0; i < 120; i++) {
    const angle = rand(2) * Math.PI;
    parts.push({
      x,
      y,
      lent: 30 + rand(100),
      speed: 2 + rand(3),
      angle,
      alpha: 1.5,
    });
  }

  function animate() {
    ctx.save();
    ctx.lineWidth = 3;

    parts.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
    });

    parts.forEach(p => {
      if (p.alpha > 0) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(
          p.x + Math.cos(p.angle) * p.lent,
          p.y + Math.sin(p.angle) * p.lent
        );
        ctx.strokeStyle = `rgba(0, 150, 230, ${p.alpha}`;
        ctx.stroke();
      }
    });

    ctx.restore();
    if (parts.some(p => p.alpha > 0)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}





// FLASH EFFECT...

function flash(f = 1) {
  let flashOpacity = 0.75;
  let reduction = 0.009;
  const var1 = CW;
  const var2 = CH;

  function flas() {
    if (flashOpacity > 0) {
      ctx.fillStyle = f === 1 ? `rgba(255, 255, 255, ${flashOpacity})`: `rgba(0, 0, 0, ${flashOpacity})`;
      ctx.fillRect(0, 0, var1, var2);
      flashOpacity -= reduction;
      requestAnimationFrame(flas);
    }
  }

  flas();
}





// SMOKE EFFECT...

const smokeParticles = [];


function genSmoke(xgr) {
  smokeParticles.push({
    x: xgr + train.width/2,
    y: train.top ? k : l,
    radius: 10 + rand(15),
    opacity: 1,
    speedX: rand() - 0.5,
    speedY: -rand(),
    expand: 0.05,
    color: rand() < 0.5 ? (rand() < 0.5 ? "#000" : "#222") : (rand() < 0.5 ? "#444" : "#666"),
  });
}


function doSmoke(xgr) {
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    const p = smokeParticles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.radius += p.expand;
    p.opacity -= 0.005;

    if (p.opacity <= 0) {
      smokeParticles.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x - xgr, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}





// SPARK EFFECT...

const electricSparks = [];


function genSpark(sps) {
  const sparkX = train.x;
  const sparkY = train.top ? k + 20 : l + 20;
  const sparkEnd = sparkX + 180;
  let ups = 200;

  if (sps > 7) {
    sps < 10 ? ups = 180 : (sps < 13 ? ups = 90 : ups = 60);
  }

  for (let x = sparkX; x <= sparkEnd; x += ups) {
    const segments = [];
    let sx = x;
    let sy = sparkY;

    for (let i = 0; i < 6; i++) {
      const dx = (rand() - 0.5) * 40;
      const dy = 10 + rand(30);
      sx += dx;
      sy -= dy;
      segments.push({ x:sx, y:sy });
    }

    electricSparks.push({
      segments,
      opacity: 1.2,
      color: rand() < 0.5 ? "rgba(171,109,255" : "rgba(150,250,250",
    });
  }
}


function doSparks() {
  const trainScreenX = train.x;

  for (let i = electricSparks.length - 1; i >= 0; i--) {
    const spark = electricSparks[i];

    ctx.strokeStyle = spark.color + `${spark.opacity})`;
    ctx.lineWidth = 2 + rand(4);
    ctx.beginPath();

    const startX = trainScreenX + spark.segments[0].x;
    const startY = spark.segments[0].y;
    ctx.moveTo(startX, startY);

    for (let j = 1; j < spark.segments.length; j++) {
      const seg = spark.segments[j];
      ctx.lineTo(trainScreenX + seg.x, seg.y);
    }

    ctx.stroke();

    spark.opacity -= 0.2;
    if (spark.opacity <= 0) {
      electricSparks.splice(i, 1);
    }
  }
}





// EXPLOSION BLOCK...

const expImg = imgload("others/explosion.png");
const boom = new Audio("explode.mp3");
let mono = 0.9;


function doExp(x, y, es) {
  let fol = es*mono;
  let sol = es*(1-mono);
  ctx.drawImage(expImg, x + sol/2 , y + sol/2 , fol , fol );
  mono += 0.003;
}





// FPS BLOCK...

let isfps = gett('isfpsc') || true;
let fps = 0;
let frames = 0;
let lastFpsUpdate = 0;


function doFPS(times, xgr) {
  frames++;
  if (times - lastFpsUpdate > 333) {
    fps = frames * 3;
    frames = 0;
    lastFpsUpdate = times;
  }

  ctx.fillStyle = "#fff";
  ctx.font = "25px monospace";
  ctx.fillText(`FPS: ${fps}`, xgr - 110, 30);
}


function showFPS() {
  if (isfps) {
    showPopup("Already Enabled... Time for the Gameplay..🔥");
  } else {
    isfps = true;
    showPopup("FPS Meter is Enabled now...😎");
    localStorage.setItem('isfpsc',isfps);
  }
}


function hideFPS() {
  if (isfps) {
    isfps = false;
    showPopup("FPS Meter is Disabled now...😎");
  } else {
    showPopup("Already Disabled... Time for the Gameplay..🔥");
    localStorage.setItem('isfpsc',isfps);
  }
}





// SCORE-PROGRESS BLOCK...

let run = 0;
let exp = 0;
let epo = 0;


function progression(xgr, abc) {
  ele("progressBar").style.width = `${(gpGot/requirement) * 100}` + "%";

  ele('score').textContent = `Graphene: ${gpGot}/${requirement}`;

  ele('runnerScore').innerText = `Score: ${run + Math.floor(xgr/50)} || XP: ${epo + exp}`;

  const trackWidth = ele('trackingContainer').clientWidth;
  const percent = Math.min(1, Math.max(0, xgr/abc));

  ele('tracking').style.left = `${percent * trackWidth}px`;
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
  const var2 = CW * 3;
  const var3 = CH/10;
  const var4 = CH/14;
  const l2 = ending - CW*2;
  crystals = [];
  obstacles = [];
  gpBlocks = [];
  
  for (let i = 0; i < l2/10; i++) {
    crystals.push({
      x: rand(l2 + 5000),
      y: 0.36 + rand(0.32),
      radius: 1,
      color: cryCol[flor(cryCol.length)],
    });
  }

  for (let i = var2; i < l2; i+= CW*0.27 + var1 + flor(300)) {
    const topp = rand() < 0.5;
    const robs = obi[flor(obi.length)];
    const scaler = var1/robs.naturalHeight;
    const scaleww = robs.naturalWidth * scaler;
    obstacles.push({
      x: i,
      y: var4,
      height: var1,
      width: scaleww,
      img: robs,
      t: topp,
    });
  }

  for (let i = var2; i < l2; i+= CW/20 + flor(500)) {
    gpBlocks.push({
      x: i,
      y: 0.42 + flor(0.18),
      width: var3,
      height: var3,
      got: false,
      animating: false,
      alpha: 1,
      dy: 0,
    });
  }
}
