
// LOADING BLOCK...

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





// IMAGE LOADINGS...

let bgImg, trainImg, monsterImg;

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





// MODAL BLOCK...

const storiez = [
  "Its the year 2076, we were very young, something tragedic happened which neither of us knows...",
  "The outer world suffered Radiations and Hyper-Active Thunderstorms, which let us to live in these Graphene caves!",
  "But the cave is also not secure, Graphene monster always search for us, remnants of Radiation levels gone wrong...",
  "Elders told only aim was to reach the Final Station - the ending of our journey + collecting rare graphene and be alive...",
  "We were the only hope of Mankind, challenging our fate and destiny, escaping the death since the beginning...",
  "It left a world split by chaos and steel, but who knows that old rusty trains would carry the last hope of mankind.",
  "These all were heavy, durable, metallic and effecient... We modified them to shift track in Hyper-Danger conditions...",
  "Unfortunately,,, You are the pilot of this unstoppable machine, shifting rails and dodging doom, till the ending...",
  "The Train was a super-scifi machine of today. Thats what we call a RAIL SHIFTER ._.",
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
  ["This game was designed and developed by <strong>Anthony Masih</strong>.", "This is the first ever game that I developed", "All my basics and imagination are here... Enjoy!"],
  ["Brought to you by <strong>Exaggeration</strong> gaming studio...", "Passionate about games, code, and creativity.. Hope you enjoy playing!", "Feel free to share feedback & have fun 🎮"],
  ["Games often play a great role in <strong>Entertainment</strong>", "My Homeland and Nature has no artificial competitors!", "But still games have their own place in each of us...", "<strong>EXAGGERATION</strong>"],
]


let page = 0;
let what = true;


function showing(index) {
  let contents = ``;
  ele('headi').innerHTML = what ? `<h1>📘 Game Instructions</h1>` : `<h1>👨‍💻 <strong>About the Developer</strong></h1>`;
  const it = what ? instructions : about;

  const ludo = it[index];
  ludo.forEach(cont => contents += `<h4>${cont}</h4>`);
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
  const nexus = what ? instructions : about;
  if (page < nexus.length - 1) {
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





// SOME SETTINGS...

let trainMax, acc, fri;
let mup, monsterBase, monsterMax;


function editz(ed, pup=false) {
  const pops =["Slow...🐢", "Medium...😎", "Fast...💪", "Extreme...⚡","Easy...✌️", "Medium...😎", "Hard...😈", "Extreme...☠️"];
  const data = [[6,15], [9,22.5], [12,30], [16,36], [6,1], [7,1.4], [8,2], [9,2.25]];
  let a, b;

  if (ed < 5) {
    [trainMax, acc] = data[ed-1];
    fri = acc - 6;
    a = "tr";
    b = "Train Speed is " + pops[ed-1];
  } else {
    [monsterBase, mup] = data[ed-1];
    monsterMax = monsterBase * 2;
    a = "mrs";
    b = "Monster Difficulty is " + pops[ed-1];
  }

  if (pup) showPopup(b);
  localStorage.setItem(a + 'Edit', ed);
}





// SKIN SELECTION SETTINGS...

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





// AUDIO BLOCK...

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
let CW, CH, k,l;


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
}
klupdater();





// TASKS BLOCK...

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
