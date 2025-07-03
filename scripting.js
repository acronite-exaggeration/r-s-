// EXAGGERATION ============================================================================================================================================

// LOADING BLOCK ============================================================================================================================================

function imgload(s) {
  const img = new Image();
  img.src = s;
  return img;
}


const gett = id => localStorage.getItem(id);


const ele = id => document.getElementById(id);


const flor = no => Math.floor(Math.random() * no);


const rand = (no = 1) => Math.random() * no;


function on(id, t) {
  setTimeout(() => {
    const el = ele(id);
    el.style.transition = "opacity 0.7s ease";
    el.style.opacity = 0;
    el.style.display = t ? "flex" : "block";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = 1;
      });
    });
  },300);
}


function off(id) {
  setTimeout(() => {
    const el = ele(id);
    el.style.transition = "opacity 0.7s ease";
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.display = "none";
    }, 750);
  },300);
}





// IMAGE LOADINGS ============================================================================================================================================

let bgImg, trainImg, trainscale, monsterImg;

const lifeImg = imgload("others/life.png");

const backx = [
  imgload("bgis/backg000.jpg"),
  imgload("bgis/backg111.jpg"),
  imgload("bgis/backg222.jpg"),
  imgload("bgis/backg333.jpg"),
  imgload("bgis/backg444.jpg"),
];


const trainx = [
  imgload("prototypes/loco000.png"),
  imgload("prototypes/loco111.png"),
  imgload("prototypes/loco222.png"),
  imgload("prototypes/loco333.png"),
  imgload("prototypes/loco444.png"),
  imgload("prototypes/loco555.png"),
];


const monsterx = [
  imgload("prototypes/proto000.png"),
  imgload("prototypes/proto111.png"),
  imgload("prototypes/proto222.png"),
  imgload("prototypes/proto333.png"),
  imgload("prototypes/proto444.png"),
  imgload("prototypes/proto555.png"),
];


const obi = [
  imgload("others/barrel.png"),
  imgload("others/barrelx.png"),
  imgload("others/crate.jpg"),
  imgload("others/rock.png"),
  imgload("others/scrap.png"),
  imgload("others/scrapx.png"),
];





// MODAL BLOCK ============================================================================================================================================

const storiez = [
  "Now is the year 2076, a couple of years ago, something tragedic happened which neither of us knows, many of us claimes it a space attack...",
  "The outer world suffered High-Radiation weathers and Hyper-Active Thunderstorms, which let us to live in these Graphene caves!",
  "But the cave is also not secure, here are Graphene monsters, always searching for us, remnants of Radiation levels gone wrong...",
  "Elders told only aim was to reach that Final Station - the ending of our journey + collecting rare graphene and be alive...",
  "We were the only hope of Mankind, challenging our fate and destiny, escaping the death since the beginning...",
  "It left a world split by chaos, hunger and steel, but who would have thought that old rusty trains would change our destiny forever...",
  "These all were heavy, durable, metallic and effecient... We modified them to shift track in Hyper-Danger conditions...",
  "Unfortunately,,, You are the pilot of this unstoppable machine, shifting rails and dodging doom, till the ending...",
  "These Trains are super-scifi machines of this era. Thats what we call them RAIL SHIFTER... *_*",
];


const instructions = [
  ["Use <strong>Arrow Keys / A & D</strong> to move", "Press <strong>Space / S / Shift</strong> to switch tracks", "Screen buttons for Touchscreen clarity..."],
  ["<strong>M</strong> for Mute-Unmute", " <strong>P</strong> for Pause-Resume", "<strong>C</strong> for collecting Graphene...🤑"],
  ["Avoid obstacles or you'll crash...🚧", "Stay ahead of the Graphene Monster...👾"],
  ["Slow down the <strong>Monster</strong> using ADVANCE...", "Collect Minimum Graphene to unlock ADVANCE button...🎯"],
  ["Reaching stations saves checkpoints...🚉", "After dying, press <strong>Continue button</strong> to resume from last checkpoint."],
  ["Access the Sidebar if got confused...☰", "Benefit from <strong>Pause-Continue & Music-Toggle</strong> features..."],
  ["Make top scores and enjoy the GamePlay...!", "Don't forget to share a Feedback & further queries..."],
];


const about = [
  ["This game was designed and developed by <strong>Acronite Monsta</strong>.", "This is the first ever game that I developed", "All my basics and imagination are here... Enjoy!"],
  ["Brought to you by <strong>Exaggeration</strong> gaming studio...", "Passionate about games, code, and creativity.. Hope you enjoy playing!", "Feel free to share feedback & have fun 🎮"],
  ["Games often play a great role in <strong>Entertainment</strong>", "My Homeland and Nature has no artificial competitors!", "But still games have their own place in each of us...", "<strong>EXAGGERATION</strong>"],
];


let page = 0;
let what = true;


function showing(index) {
  let contents = ``;
  ele('headi').innerHTML = what ? `<h1>📘 Game Instructions</h1>` : `<h1>👨‍💻 <strong>About the Developer</strong></h1>`;
  const it = what ? instructions : about;
  it[index].forEach(cont => contents += `<h4>${cont}</h4>`);

  ele("content").innerHTML = contents;
  ele("previous").style.display = index === 0 ? "none" : "block";
  ele ("next").style.display = index === it.length - 1 ? "none" : "block";
}


function pasting() {
  if (page > 0) {
    page--;
    showing(page);
    sound.currentTime = '0';
    sound.play();
  }
}


function nexting() {
  const nexus = what ? instructions.length : about.length;
  if (page < nexus - 1) {
    page++;
    showing(page);
    sound.currentTime = '0';
    sound.play();
  }
}


function opening(ok=true) {
  what = ok;
  page = 0;
  showing(page);
  on('modal');
}





// SOME SETTINGS ============================================================================================================================================

let trainMax, acc, fri;
let mup, monsterBase, monsterMax;


function editz(ed, pup=false) {
  const pops =["Slow...🐢", "Medium...😎", "Fast...💪", "Extreme...⚡","Easy...✌️", "Medium...😎", "Hard...😈", "Extreme...☠️"];
  const data = [7, 10, 13.5, 18, [5,1], [6,1.2], [7,1.75], [8,2]];
  let a, b;

  if (ed < 5) {
    trainMax = data[ed-1] * editx;
    acc = trainMax * 2.5;
    fri = trainMax * 1.6;
    a = "tr";
    b = "Train Speed is " + pops[ed-1];
  } else {
    [monsterBase, mup] = data[ed - 1].map(x => x * editx);
    monsterMax = monsterBase * 2;
    a = "mrs";
    b = "Monster Difficulty is " + pops[ed-1];
  }

  if (pup) showPopup(b);
  localStorage.setItem(a + 'Edit', ed);
}





// SKIN SELECTION SETTINGS ============================================================================================================================================

let diesel = false;
let change = false;


function usage(imgElement) {
  let path, rank, skin;
  const bed = Array.isArray(imgElement);

  if (bed) {
    [path, rank, skin] = imgElement;
  } else {
    path = imgElement.getAttribute('src');
    rank = +imgElement.getAttribute('rank') || 1;
    skin = +imgElement.getAttribute('skin') || 1;
  }

  if (skin === 1) {
    change = false;
    bgImg = backx[rank-1];

  } else if (skin === 2) {
    trainImg = trainx[rank-1];
    diesel = rank % 2 === 1;
    trainscale = diesel ? 3.1 : 2.6;
    train.width = train.height * trainscale;

  } else if (skin === 3) {
    monsterImg = monsterx[rank-1];

  } else {
    change = true;
  }

  const d = skin === 2 ? "tr" : (skin === 3 ? "mr" : "bg");
  const allImgs = document.querySelectorAll('#' + d + 'Skin img');

  if (bed) {
    allImgs.forEach(img => {
      const src = img.getAttribute('src');
      if (src === path) {
        img.classList.add('selecta');
      }
    });

  } else {
    localStorage.setItem(d + "Data", JSON.stringify([path,rank,skin]));
    allImgs.forEach(im => im.classList.remove("selecta"));
    imgElement.classList.add("selecta");
  }
}





// AUDIO BLOCK ============================================================================================================================================

const music = ele("backgroundMusic");
const storier = ele("videoMusic");
const sound = new Audio("shift.mp3");
const treat = new Audio("treasure.mp3");
let musicOn = true;
let fide;
let audioAF;


function fadeOutMusic(mus = true) {
  if (fide) clearInterval(fide);
  const proto = mus ? music : storier;
  let vol = proto.volume;

  function step() {
    if (vol > 0.01) {
      vol -= 0.01;
      proto.volume = vol;
      audioAF = requestAnimationFrame(step);
    } else {
      proto.volume = 0;
      proto.pause();
    }
  }
  step();
}


function fadeInMusic(mus = true) {
  if (audioAF) cancelAnimationFrame(audioAF);
  const proto = mus ? music : storier;
  proto.play();
  proto.volume = 0;

  fide = setInterval(() => {
    if (proto.volume < 0.99) {
      proto.volume += 0.01;
    } else {
      proto.volume = 1;
      clearInterval(fide);
    }
  }, 20);
}


function musicToggle() {
  musicOn = !musicOn;
  musicOn ? fadeInMusic() : fadeOutMusic();
  ele('musicBtn').textContent = musicOn ? "🔊" : "🔇";
}





// VIDEO BLOCK ============================================================================================================================================

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
    ele('nextBtn').innerText = 'NEXT';
    on('skipBtn');
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

  colint = setInterval(() => coloring(), 2000);
  textint = setInterval(() => {
    st.style.color = cols[flor(5)];
  },7000);
}


function storyNext() {
  line++;
  if (line < storiez.length) {
    showLine(line);
    if (line > storiez.length - 2) {
      off('skipBtn');
      ele('nextBtn').innerText = 'END';
    }
  } else {
    stoppp();
  }
}





// CANVAS BLOCK ============================================================================================================================================

const canvas = ele("gameCanvasX");
const ctx = canvas.getContext("2d");
let resizeTimer = null;
let ending = 70000 + rand(30000);
let gameRunning = false;
let gamePaused = false;
let CW, CH, k, l, editx;


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
resiz();


let train = {
  x: 60,
  width: CW * 0.23,
  height: CH * 0.17,
  top: true,
};


function klupdater() {
  const a = CH * 0.42;
  const b = CH * 0.64;
  k = a - train.height;
  l = b - train.height;
  editx = CW/1300;
}
klupdater();





// TASKS BLOCK ============================================================================================================================================

const [x,y] = [gett('trEdit'), gett('mrsEdit')];

x ? editz(+x) : editz(2);

y ? editz(+y) : editz(6);

const wait = ms => new Promise(r => setTimeout(r, ms));


window.addEventListener("load", async () => {
  resiz();
  await wait(1500);

  on('studioIntro', 2);
  await wait(2500);

  off('studioIntro');
  await wait(1500);

  ele('studioIntro').innerHTML = `<h3>EXAGGERATION Studio Presents...</h3>`;
  on('studioIntro', 2);
  await wait(2500);

  off('studioIntro');
  await wait(1500);

  on('menu', 2);
});


window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    resiz();
    klupdater();
  }, 100);
});

['bgData','trData','mrData'].forEach(dtt => {
  const dtd = JSON.parse(gett(dtt));
  if (!dtd) return;
  usage(dtd);
});





// SIDEBAR MENU BLOCK ============================================================================================================================================

ele('sideBy').addEventListener("click", () => {
  setLife(false);
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
  setLife(extralife);
}





//RESUME - PAUSE FUNCTION ============================================================================================================================================

function resumePause() {
  if (!gameRunning) return;
  gamePaused = !gamePaused;
  ele("pauser").textContent = gamePaused ? "⏸" : "▶";

  if (gamePaused) {
    if (musicOn) fadeOutMusic();
  } else {
    if (musicOn) fadeInMusic();
    update();
  }
}





// CHECKPOINT BLOCK ============================================================================================================================================

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
  mono = 1;
  gamePaused = false;
  gameRunning = true;
  crash = false;
  kb = 0;
  monsta = null;
  gpGot = 0;
  ski = 20000 + rand(7000);
  border = 0;
  challenge = false;
  onpro = false;
  offpro = false;
  genX();
  setLife(extralife);
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
    off('reset');
  }
}





// GAME OVER BLOCK ============================================================================================================================================

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
  setLife(false);
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





// POPUP BLOCK ============================================================================================================================================

function showPopup(msg = "Popup!", dura = 2500) {
  const container = document.getElementById('popupContainer') || (() => {
    const div = document.createElement('div');
    div.id = 'popupContainer';
    div.style.position = 'fixed';
    div.style.top = '30px';
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





// BACKGROUND HANDLING BLOCK ============================================================================================================================================

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





// ADVANCE BLOCK ============================================================================================================================================

let showAdvance = false;
let advanceAF;


function doAdv() {
  if (advanceAF) return;

  function ina() {
    if (showAdvance && gameRunning) {
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





// ELECTRIC BURST EFFECT ============================================================================================================================================

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





// FLASH EFFECT ============================================================================================================================================

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





// EXTRA LIFE BLOCK ============================================================================================================================================


let extralife = gett('lifex') === 'true';
let lifeX1, lifeY, lifeX2;

const setLife = active => active ? on('extraLife') : off('extraLife');


function lifer(lll) {
  monsta = null;
  extralife = false;
  crash = false;
  stuck = false;
  localStorage.setItem('lifex', 'false');
  setLife(extralife);
  on('envy');
  setTimeout(() => {
    showPopup("🔥 Resurrection... 🔥");
  },1500);
}


function doLife(xgr, kkk, lll, bbb) {
  const lifeYY = lifeY * bbb;
  const s = kkk - 1300;
  const sizi = 100 + s/30;
  if (xgr < kkk*7) ctx.drawImage(lifeImg, lifeX1 - xgr, lifeYY, sizi, sizi);
  if (xgr > lll - kkk*7) ctx.drawImage(lifeImg, lifeX2 - xgr, lifeYY, sizi, sizi);
}





// SMOKE EFFECT ============================================================================================================================================

const smokeParticles = [];


function genSmoke(xgr) {
  const colss = train.top ? ["#222", "#333"] : ["#444", "#555"];
  const numBlobs = 4 + flor(3);
  const blobs = [];
  let j = 0;
  const radii = 10 + rand(7);

  for (let i = 0; i < numBlobs; i++) {
    const yoff = i > numBlobs/2 ? radii : 0;
    blobs.push({
      dx: j * radii,
      dy: yoff + (rand() - 0.5) * 20,
      rOffset: rand(0.4) + 0.8,
      color: colss[flor(2)],
    });

    i > numBlobs/2 ? j++ : j--;
  }

  smokeParticles.push({
    x: xgr + train.width / 2,
    y: train.top ? k : l,
    radius: radii,
    opacity: 1.5,
    speedX: rand() - 0.5,
    speedY: -rand(0.7) - 0.5,
    expand: 0.05,
    blobs,
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
      ctx.globalAlpha = p.opacity;
      
      for (const b of p.blobs) {
        ctx.fillStyle = b.color;
        const bx = p.x - xgr + b.dx;
        const by = p.y + b.dy;
        const br = p.radius * b.rOffset;

        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }
  }
}





// SPARK EFFECT ============================================================================================================================================

const electricSparks = [];


function genSpark(sps) {
  const sparkX = train.x;
  const sparkY = train.top ? k + 20 : l + 20;
  const sparkEnd = sparkX + 180;
  let ups = 200;

  if (sps > 8) {
    sps < 11 ? ups = 180 : (sps < 15 ? ups = 90 : ups = 60);
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
      color: rand() < 0.5 ? "rgba(255,50,10" : "rgba(150,250,250",
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

    spark.opacity -= 0.3;
    if (spark.opacity <= 0) {
      electricSparks.splice(i, 1);
    }
  }
}





// EXPLOSION BLOCK ============================================================================================================================================

const expImg = imgload("others/explosion.png");
const boom = new Audio("explode.mp3");
let mono = 1;
let exup = 0.002 * editx;


function doExp(x, y, es) {
  let fol = es*mono;
  let sol = es*(1-mono);
  ctx.drawImage(expImg, x + sol/2 , y + sol/2 , fol , fol );
  mono += exup;
}





// FPS BLOCK ============================================================================================================================================

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





// SCORE-PROGRESS BLOCK ============================================================================================================================================

let run = 0;
let exp = 0;
let epo = 0;


function progression(xgr, abc) {
  if (xgr < 0) return;

  ele("progressBar").style.width = `${(gpGot/requirement) * 100}` + "%";

  ele('score').textContent = `Graphene: ${gpGot}/${requirement}`;

  ele('runnerScore').innerText = `Score: ${run + Math.floor(xgr/50)} || XP: ${epo + exp}`;

  const trackWidth = ele('trackingContainer').clientWidth;
  const percent = Math.min(1, Math.max(0, xgr/abc));

  ele('tracking').style.left = `${percent * trackWidth}px`;
}





// GENERATOR BLOCK ============================================================================================================================================

function collects() {
  if (!gameRunning || gamePaused) return;
  const past = gpGot;

  gpBlocks.forEach(gp => {
    const box = gp.x - cameraX;
    const isgp = (box >= 0 && box <= CW);

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

  if (!extralife) {
    const buck = lifeX1 - cameraX;
    const bob = lifeX2 - cameraX;
    const islife1 = (buck >= 0 && buck <= CW) && (lifeY >= 0 && lifeY <= CH);
    const islife2 = (bob >= 0 && bob <= CW) && (lifeY >= 0 && lifeY <= CH);

    if (islife1 || islife2) {
      extralife = true;
      localStorage.setItem('lifex', 'true');
      setLife(extralife);
      treat.currentTime = '0';
      treat.play();
    }
  }
}


function genX() {
  const var1 = CH/7;
  const varx = train.width + var1 + CW/37;
  const var2 = CW*5;
  const var3 = CH/10;
  const var4 = CH/14;
  const l2 = ending - CW*5;
  crystals = [];
  obstacles = [];
  gpBlocks = [];

  lifeX1 = CW + flor(CW*3.5);
  lifeX2 = l2 + CW/2 + flor(CW * 3.5);
  lifeY = 0.42 + flor(0.18);
  
  for (let i = 0; i < l2/10; i++) {
    crystals.push({
      x: rand(l2 + CW*3.3),
      y: 0.36 + rand(0.32),
      radius: 1,
      color: cryCol[flor(cryCol.length)],
    });
  }

  for (let i = var2; i < l2; i+= varx + flor(300)) {
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





// STATION BLOCK ============================================================================================================================================

const statUp = imgload("others/statup.jpg");
const statDown = imgload("others/statdown.jpg");

const stat = { x: ending , rtx: false , plot: 0 , };


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

  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, boardY, boardWidth, boardHeight);

  ctx.save();
  ctx.translate(x + boardWidth/2, boardY + boardHeight/2);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = "#ffcc00";
  ctx.font = `bold ${boardWidth/2}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(`Platform -- ${stat.plot + p}`, 0, 8);
  ctx.restore();
}


function doBoardz(x, kkk, ww=0) {
  const boardWidth = ww === 0 ? kkk * 0.4 : kkk * 0.6;
  const boardHeight = kkk/10;
  const boardY = kkk * 0.2;
  const pilY = kkk * 0.3;
  const pilWidth = kkk/40;
  const pilHeight = kkk/20;
  const popos = ww === 0 ? "Safe Area  ❯❯❯" : "Challenge Begins  ❯❯❯";

  ctx.fillStyle = "#201000";
  ctx.fillRect(x - pilWidth/2, pilY, pilWidth, pilHeight);

  ctx.fillStyle = "#111";
  ctx.fillRect(x - boardWidth/2, boardY, boardWidth, boardHeight);

  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 4;
  ctx.strokeRect(x - boardWidth/2, boardY, boardWidth, boardHeight);

  ctx.save();
  ctx.translate(x, boardY + boardHeight * 3/4);
  ctx.fillStyle = "#ffcc00";
  ctx.font = `bold ${boardHeight/2}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(popos, 8, 0);
  ctx.restore();
}





// AREA MAINTAIN BLOCK ============================================================================================================================================

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





// TRAIN BLOCK ============================================================================================================================================

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
  if (swich || stuck) return;
  swich = true;
  startY = train.top ? k : l;
  targetY = train.top ? l : k;
  train.top = !train.top;
  sound.currentTime = '0';
  sound.play();
}





// ITEMS BLOCK ============================================================================================================================================

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





// MONSTER BLOCK ============================================================================================================================================

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





// OBSTACLE COLLISION ============================================================================================================================================

const cpop = ["😅 OOpsie HOpsie Doo...!", "Rail Shifter Crahed 😅...!"];

function crashOb(xgr) {
  for (let i = 0; i < obstacles.length - 1; i++) {
    const ob = obstacles[i];
    const obSX = ob.x - xgr;
    if (
      train.x < obSX + ob.width &&
      train.x + train.width > obSX &&
      train.top === ob.t && !crash
    ) {
      crash = true;
      const fox = challenge;
      challenge = false;
      off('envy');

      const mons = rand() < 0.5;
      monsta = {
        x: xgr + CW*0.9,
        y: mons ? k : l,
        speed: 0,
        mt: mons,
      };
      
      if (!extralife) {

        fadeOutMusic();
        gamePaused = true;
        const obhh = ob.t ? k : l
        reUpdate(180, 1, obSX - ob.width, ob.y + obhh - ob.height, CH/2);
        const pp = cpop[flor(2)];
        setTimeout(() => {showPopup(pp)},1200);
      } else {
        stuck = true;
        obstacles.splice(i, 1);
        showPopup("🔥 EXTRA LIFE 🔥");
        showPopup("🔥 EXTRA LIFE 🔥");
        showPopup("🔥 EXTRA LIFE 🔥");
        setTimeout(() => {
          lifer();
          challenge = fox;
        }, 3000);
      }

      boom.play();
      flash();
    }
  }
}





// MONSTER COLLISION ============================================================================================================================================

function crashMrs(xgr, spx) {
  if (monsta) {
    monsta.x -= monsta.speed * spx * 60;
    const mrSX = monsta.x - xgr;
    if (
      train.x < mrSX + train.height &&
      train.x + train.width > mrSX &&
      train.top === monsta.mt && !crash
    ) {
      crash = true;
      const fox = challenge;
      challenge = false;
      off('envy');

      monsta.x = xgr + CW*0.9;
      monsta.speed = 0;
      
      if (!extralife) {
        fadeOutMusic();
        gamePaused = true;
        reUpdate(180, 2, mrSX - train.width, monsta.y - train.height, CH/2);
        const pp = cpop[flor(2)];
        setTimeout(() => {showPopup(pp)},1200);
      } else {
        stuck = true;
        showPopup("🔥 EXTRA LIFE 🔥");
        showPopup("🔥 EXTRA LIFE 🔥");
        showPopup("🔥 EXTRA LIFE 🔥");
        setTimeout(() => {
          lifer()
          challenge = fox;
        }, 3000);
      }
      
      boom.play();
      flash();
      
    } else if (monsta.x < -100 || monsta.x < xgr - 500) {
      monsta = null;
    }
  }
}





// STATION COLLISION ============================================================================================================================================

function crashStat(xgr) {
  if (xgr < stat.x - train.width || stat.rtx) return;

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
    ending = 70000 + rand(30000);
    loadCp();
    acc = cs;
    flash();
    setTimeout(() => {showPopup("😎 Checkpoint Saved...! 🚉")},1000);
  },2000);
}





// HANDLING BLOCK ============================================================================================================================================

let righto = false;
let lefto = false;
let pressT = false;
let cameraX = 0;
let speedX = 0;
let remind = 0;
let reach = 0;
let braver = true;
let lasting = 0;
let stuck = false;


function handleSpeed(xgr, dt, lll, kkk) {
  if (stuck) speedX = 0;
  if (stuck) return;

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
}


let border = 0;
let challenge = false;
let onpro = false;
let offpro = false;


function distanceHandler(kkk, lll) {
  if (reach > lll*4.7 && !challenge) {
    challenge = true;
    border = reach;
  }

  if (reach > kkk - lll*4.7 && challenge) {
    challenge = false;
    border = reach;
  }

  if (challenge && !onpro) {
    on('progi');
    onpro = true;
  }

  if (!challenge && !offpro) {
    off('progi');
    offpro = true;
  }
}


let lasttime = 0;
let timer = 400;
let kb = 0;
let lastly = 0;
let traintime = 0;
let spawner = 20;


function hyper(timez,xgr) {
  if (timez - lasttime > timer) {
    const pyro = Math.abs(speedX);
    pyro < 4 ? timer = (400 + rand(400)) : (pyro < 8 ? timer = (250 + rand(30)) : (pyro < 11 ? timer = (150 + rand(30)) : timer = (70 + rand(30))));

    diesel ? genSmoke(xgr) : genSpark(pyro);
    lasttime = timez;
  }

  if (timez - lastly > 400) {
    for (let dot of crystals) dot.radius = 2 + flor(5);
    lastly = timez;

    if (!challenge) return;
    kb++;

    if (kb > spawner) {
      spawnMonster();
      kb = 0;
      spawner = 20 + flor(12);
    }
  }
}





// GAME LOOPS ============================================================================================================================================

function update(timestamp) {
  if (gamePaused || !gameRunning) return;

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
  handleSpeed(camx, deltaT, topo, eepo);

  doBg(camx, topo, hopo);
  doArea(camx, topo, eepo + topo*1.7, hopo);
  doItems(camx, topo, hopo);
  doStat(camx, topo, hopo);
  if (!extralife) doLife(camx, topo, eepo, hopo);
  distanceHandler(eepo, topo);

  if (camx < topo * 6) doBoardz(topo*4.4 - camx, hopo, 1);
  if (camx > eepo - topo * 6) doBoardz(eepo - topo*4.4 - camx, hopo);

  diesel ? doSmoke(camx) : doSparks();
  doTrt(traintime);
  doMrs(camx);

  if (camx < topo * 1.7) doPlot(topo/2 - camx, hopo);
  if (camx > eepo - topo) doPlot(stat.x + topo/2 - camx, hopo, 1);

  progression(reach - topo*4.5, eepo - topo*9);
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
    doArea(camx, topo, eepo + topo*1.7, hopo);
    doItems(camx, topo, hopo);
    doStat(camx, topo, hopo);
    if (!extralife) doLife(camx, topo, eepo, hopo);

    if (camx < topo * 6) doBoardz(topo*4.4 - camx, hopo, 1);
    if (camx > eepo - topo * 6) doBoardz(eepo - topo*4.4 - camx, hopo);
    doMrs(camx);
    if (camx < topo * 1.7) doPlot(topo/2 - camx, hopo);
    if (camx > eepo - topo) doPlot(stat.x + topo/2 - camx, hopo, 1);

    doExp(ax, bx, esc);
    allowed--;

    requestAnimationFrame(() => reUpdate(allowed, reas, ax, bx, esc));
  } else {
    setTimeout(() => gOver(reas), 250);
  }
}





// PC CONTROLS ============================================================================================================================================

function isKey(e, keys) {
  return keys.includes(e.key) || keys.includes(e.code);
}


window.addEventListener("keydown", (e) => {
  if (isKey(e, ["Space"])) {
    e.preventDefault();
  }

  const isModal = ele('modal').style.display !== 'none';
  const isStory = ele('storyContainer').style.display !== 'none';
  const okiy = gameRunning && !gamePaused;

  if (okiy && !stuck) {
    if (isKey(e, ["p", "P"])) resumePause();
    if (isKey(e, ["m", "M"])) musicToggle();
    if (isKey(e, ["c", "C"])) collects();
  }

  if (isKey(e, ["Space", "Shift", "s", "S"]) && !pressT) {
    if (okiy) swicher();
    pressT = true;
    if (isStory) storyNext();
  }

  if (isKey(e, ["ArrowRight", "d", "D"])) {
    righto = true;
    if (isModal && !okiy) nexting();
  }

  if (isKey(e, ["ArrowLeft", "a", "A"])) {
    lefto = true;
    if (isModal && !okiy) pasting();
  }
});


window.addEventListener("keyup", (e) => {
  if (isKey(e, ["Space", "Shift", "s", "S"])) pressT = false;
  if (isKey(e, ["ArrowRight", "d", "D"])) righto = false;
  if (isKey(e, ["ArrowLeft", "a", "A"])) lefto = false;
});




// MOBILE CONTROLS ============================================================================================================================================

ele("lefter").addEventListener("pointerdown",() => lefto = true);

ele("lefter").addEventListener("pointerup", () => lefto = false);

ele("righter").addEventListener("pointerdown", () => righto = true);

ele("righter").addEventListener("pointerup", () => righto = false);

ele("switcher").addEventListener("click", () => {
  if (!gamePaused && gameRunning) swicher()
});





// FINAL BLOCK ============================================================================================================================================

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

  setTimeout(() => showPopup(help[i]), 500);

  setTimeout(() => {
    loadCp();
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

// EXAGGERATION ============================================================================================================================================