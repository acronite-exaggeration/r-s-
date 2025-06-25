
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
    el.style.display = t ? "flex" : "block";
    el.style.opacity = 0;
    el.style.transition = 'none';

    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.7s ease";
      el.style.opacity = 1;
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


function fadeOutMusic(mus = true) {
  const proto = mus ? music : storier;
  let vol = proto.volume;

  function step() {
    if (vol > 0.02) {
      vol -= 0.02;
      proto.volume = vol;
      requestAnimationFrame(step);
    } else {
      proto.volume = 0;
      proto.pause();
    }
  }
  step();
}


function fadeInMusic(mus = true) {
  const proto = mus ? music : storier;
  proto.play();
  proto.volume = 0;

  let fide = setInterval(() => {
    if (proto.volume < 0.98) {
      proto.volume += 0.02;
    } else {
      proto.volume = 1;
      clearInterval(fide);
    }
  }, 25);
}


function musicToggle() {
  musicOn = !musicOn;
  musicOn ? fadeInMusic() : fadeOutMusic();
  ele('musicBtn').textContent = musicOn ? "🔊" : "🔇";
}
