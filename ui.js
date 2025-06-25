
// VIDEO BLOCK...

let colint;
let textint;
let currentColor = 1;
let line = 0;
let interl;
const st = ele("storyText");
const cols = ['#85ff85', '#ffd979', '#ff6464', '#63aeff', '#9476ff'];


function shuffling(baseColors) {
  const shuffled = [...baseColors];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = flor(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


function coloring() {
  const bgcols = ['#771b1b', '#7b5e14', '#005e00', '#0f457f'];
  const c = shuffling(bgcols);
  const bg1 = ele("bg1");
  const bg2 = ele("bg2");

  if (currentColor === 1) {
    bg2.style.background = `linear-gradient(90deg, ${c.join(",")})`;
    bg2.style.opacity = 1;
    bg1.style.opacity = 0;
    currentColor = 2;
  } else {
    bg1.style.background = `linear-gradient(90deg, ${c.join(",")})`;
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
    currentColor = 1;
  }
}


function showLine(index) {
  st.innerText = "";
  let i = 0;
  clearInterval(interl);
  const line = storiez[index];
  interl = setInterval(() => {
    st.innerText += line[i];
    i++;
    if (i >= line.length) clearInterval(interl);
  }, 50);
}


function stoppp() {
  clearInterval(interl);
  clearInterval(colint);
  clearInterval(textint);

  off('storyContainer');
  setTimeout(() => {
    ele('skipBtn').innerText = 'SKIP';
    on('nextBtn');
  },800);
  fadeOutMusic(false);
  line = 0;
}


function storyyy() {
  storier.currentTime = '0';
  on('storyContainer',2);
  showLine(line);
  fadeInMusic(false);
  st.style.color = cols[flor(5)];
  coloring();

  colint = setInterval(() => coloring(), 2500);
  textint = setInterval(() => {
    st.style.color = cols[flor(5)];
  },7000);
}


ele("nextBtn").addEventListener("click", () => {
  line++;
  if (line < storiez.length) {
    showLine(line);
    if (line > storiez.length - 2) {
      off('nextBtn');
      ele('skipBtn').innerText = 'END';
    }
  }
});





// CANVAS BLOCK...

const canvas = ele("gameCanvasX");
const ctx = canvas.getContext("2d");
let resizeTimer = null;
let ending = 50000 + rand(20000);
let gameRunning = false;
let gamePaused = false;
let CW, CH;


function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}


function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  ele('rotateWarning').style.display = isPortrait ? 'flex' : 'none';
  if (gameRunning) gamePaused = isPortrait;
}


function resiz() {
  setViewportHeight();
  canvas.width =  window.innerWidth;
  canvas.height = window.innerHeight;
  CW = canvas.width;
  CH = canvas.height;
  checkOrientation();
}





// TASKS BLOCK...

const [x,y] = [gett('trEdit'), gett('mrsEdit')];

x ? editz(+x) : editz(2);

y ? editz(+y) : editz(6);

resiz();

const wait = ms => new Promise(r => setTimeout(r, ms));


window.addEventListener("load", async () => {
  resiz();
  await wait(1000);

  on('studioIntro', 2);
  await wait(2200);

  off('studioIntro');
  await wait(1000);

  ele('studioIntro').innerHTML = `<h3>EXAGGERATION Studio Presents...</h3>`;
  on('studioIntro', 2);
  await wait(2200);

  off('studioIntro');
  await wait(1200);

  on('menu', 2);
});


window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resiz();
  }, 100);
});

['bgData','trData','mrData'].forEach(dtt => {
  const dtd = JSON.parse(gett(dtt));
  if (!dtd) return;
  usage(dtd);
});





// SIDEBAR MENU BLOCK...

ele('sideBy').addEventListener("click", () => {
  off('envy');
  ele('gameCanvasX').classList.toggle("blur");
  on('sidebar',1);
  on('dark');
  gamePaused = true;
  if (musicOn) fadeOutMusic();
});


function taskResume() {
  off('dark');
  off('sidebar');
  ele('gameCanvasX').classList.remove("blur");
  on('envy');
  gamePaused = false;
  if (musicOn) fadeInMusic();
  update();
}





//RESUME - PAUSE FUNCTION...

function resumePause() {
  gamePaused = !gamePaused;
  ele("pauser").textContent = gamePaused ? "⏸" : "▶";

  if (gamePaused) {
    if (musicOn) fadeOutMusic();
  } else {
    if (musicOn) fadeInMusic();
    update();
  }
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
  if (ddd === true) {
    if (existCp()) {
      localStorage.removeItem('trainGameCheckpoint');
      showPopup("😎 Checkpoint was removed succesfully...!");
    } else {
      showPopup("😤 No checkpoint exists, so no need for Reset...!");
    }
  } else {
    showPopup("😤...Hmm...Progress!");
  }
  off('reset');
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

  ele('continueBtn').style.display = existCp() ? 'inline-block' : 'none';
  on('gameOver', 1);
}


function gEnd() {
  off('gameCanvasX');
  off('gameOver');
  off('sidebar');
  ele('gameCanvasX').classList.remove("blur");
  on('endu');
  setTimeout(() => {on('enduBtn',2)}, 2000);
}


function ends() {
  off('gameCanvasX');
  off('gameOver');
  off('sidebar');
  ele('gameCanvasX').classList.remove("blur");
  off('dark');
  off('endu');
  setTimeout(() => on('menuxBtn',2), 2000);
}


function conCp() {
  off('gameOver');
  startGame();
  setTimeout(() => {showPopup(query[q])}, 4500);
}
