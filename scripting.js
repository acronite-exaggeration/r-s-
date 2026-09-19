// _______________________________________ EXAGGERATION _______________________________________

// _______________________________________ LOADING BLOCK _______________________________________

const GAME_VERSION = '3.1.9';

function imgload(s) {
    const img = new Image();
    img.src = `${s}?v=${GAME_VERSION}`;
    return img;
}


const gett = id => localStorage.getItem(id);


const ele = id => document.getElementById(id);


const flor = n => (Math.random() * n) | 0;


const rand = (n = 1) => Math.random() * n;


function on(t, ...ids) {
    const z = Number.isInteger(t);
    if (!z) ids.unshift(t);
    ids.forEach(id => {
        setTimeout(() => {
            const e = ele(id);
            if (!e) return;
            e.style.transition = "opacity 0.7s ease";
            e.style.opacity = 0;
            e.style.display = z ? "flex" : "block";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { e.style.opacity = 1 });
            });
        }, 100);
    });
}


function off(...ids) {
    ids.forEach(id => {
        setTimeout(() => {
            const e = ele(id);
            if (!e) return;
            e.style.transition = "opacity 0.7s ease";
            e.style.opacity = 0;
            setTimeout(() => { e.style.display = "none" } , 750);
        }, 100);
    });
}





// _______________________________________ IMAGE LOADINGS _______________________________________

const lifeImg = imgload("others/life.webp");
const smokeImg = imgload("others/smoke.webp");
const sparkImg = imgload("others/sparkx.webp");
const gpImg = imgload("others/graphene.webp");
const statUp = imgload("others/statup.webp");
const statDown = imgload("others/statdown.webp");
const expImg = imgload("others/explosion.webp");
const esburstImg = imgload("others/e-spark-burst.webp");
const hvburstImg = imgload("others/heavy-burst.webp");

const offImgs = [
    imgload("others/cross.webp"),
    imgload("others/burst.webp"),
    imgload("others/xgr.webp")
]

const backx = [
    imgload("bgis/backg000.webp"),
    imgload("bgis/backg111.webp"),
    imgload("bgis/backg222.webp"),
    imgload("bgis/backg333.webp"),
    imgload("bgis/backg444.webp")
];


const trainx = [
    imgload("prototypes/loco000.webp"),
    imgload("prototypes/loco111.webp"),
    imgload("prototypes/loco222.webp"),
    imgload("prototypes/loco333.webp")
];


const monsterx = [
    imgload("prototypes/proto000.webp"),
    imgload("prototypes/proto111.webp"),
    imgload("prototypes/proto222.webp"),
    imgload("prototypes/proto333.webp"),
    imgload("prototypes/proto444.webp"),
    imgload("prototypes/proto555.webp")
];


const obi = [
    imgload("others/barrel.webp"),
    imgload("others/barrelx.webp"),
    imgload("others/crate.webp"),
    imgload("others/rock.webp"),
    imgload("others/scrap.webp"),
    imgload("others/scrapx.webp")
];





// _______________________________________ MODAL BLOCK _______________________________________

const instructions = [
    ["Use <strong>Arrow Keys / A & D</strong> to move", "Press <strong>Space / S / Shift</strong> to switch tracks", "Screen buttons for Touchscreen clarity..."],
    ["<strong>M</strong> for Mute-Unmute", "<strong>C</strong> for collecting Graphene or ExtraLife...💰", "<strong>P</strong> for Pause-Resume"],
    ["Avoid obstacles or you'll crash...🚧", "Stay ahead of the Graphene Monster...👾"],
    ["Slow down the <strong>Monster</strong> using ADVANCE...", "Collect Minimum Graphene to unlock ADVANCE button...🎯"],
    ["Reaching stations saves checkpoints...🚉", "After dying, press <strong>Continue button</strong> to resume from last checkpoint."],
    ["Access the Sidebar if got confused...☰", "Benefit from <strong>Pause-Continue & Music-Toggle</strong> features..."],
    ["Make top scores and enjoy the GamePlay...!", "Don't forget to share a Feedback & further queries..."]
];


const about = [
    ["This game was designed and developed by <strong>Acronite Monsta</strong>.", "This is the first ever game that I developed", "All my basics and imagination are here... Enjoy!", `<strong>[Version : ${GAME_VERSION}]</strong`],
    ["Brought to you by <strong>Exaggeration</strong> gaming studio...", "Passionate about games, code, and creativity.. Hope you enjoy playing!", "Feel free to share feedback & have fun 🎮", `<strong>[Version : ${GAME_VERSION}]</strong`],
    ["Games often play a great role in <strong>Entertainment</strong>", "My Homeland and Nature has no artificial competitors!", "But still games have their own place in each of us...", "<strong>EXAGGERATION</strong>"]
];


let [page, what, opend] = [0, true, false];


function showing(pg) {
    let contents = ``;
    ele('headi').innerHTML = `<h1><strong>${what ? '📘 Game Instructions' : '👨‍💻 About the Developer'}</strong></h1>`;
    const it = what ? instructions : about;
    it[pg].forEach(i => contents += `<h4>${i}</h4>`);

    ele("content").innerHTML = contents;
    ele("previous").style.display = pg === 0 ? "none" : "block";
    ele ("next").style.display = pg === it.length - 1 ? "none" : "block";
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
    const n = (what ? instructions : about).length;
    if (page < n - 1) {
        page++;
        showing(page);
        sound.currentTime = '0';
        sound.play();
    }
}


function opening(a = true) {
    what = a;
    page = 0;
    opend = true;
    showing(page);
    on('modal');
}


function closing() {
    off('modal');
    opend = false;
}





// _______________________________________ DIFFICULTY SETTINGS _______________________________________

let trainMax, acc, fri, difi, tops, monsterUp, monsterBase, monsterMax;


function editz(ed, p) {
    const pops =["Slow...🐢", "Medium...😎", "Fast...💪", "Extreme...⚡", "Easy...✌️", "Medium...😎", "Hard...😈", "Extreme...☠️"];
    const data = [ [8, 2], [11, 1.7], [15, 1.3], [20, 1], [5, 1], [6, 1.2], [8, 2], [10, 3.4] ];
    let a, b;

    if (ed < 5) {
        const dt = data[ed - 1];
        trainMax = dt[0] * editx;
        acc = trainMax/25;
        fri = trainMax/35;
        tops = dt[1];
        a = "tr";
        b = "Train Speed is ";
    } else {
        [monsterBase, monsterUp] = data[ed - 1].map(x => x * editx);
        difi = ed - 5;
        monsterMax = monsterBase * 2;
        a = "mrs";
        b = "Monster Difficulty is ";
    }

    if (p) showPopup(b + pops[ed - 1]);
    localStorage.setItem(a + 'Edit', ed);
}





// _______________________________________ SKIN SELECTION SETTINGS _______________________________________

let bgImg, trainImg, monsterImg;
let [trainscale, diesel, bgChange] = [3, false, false];


function usage(imgElement) {
    let rank, skin;
    const bed = Array.isArray(imgElement);

    if (bed) {
        [rank, skin] = imgElement;
    } else {
        rank = +imgElement.getAttribute('rank') || 1;
        skin = +imgElement.getAttribute('skin') || 1;
    }

    if (skin === 1) {
        bgChange = false;
        bgImg = backx[rank-1];

    } else if (skin === 2) {
        trainImg = trainx[rank-1];
        diesel = rank % 2 === 1;
        trainscale = diesel ? 3.5 : 3;
        train.width = train.height * trainscale;

    } else if (skin === 3) {
        monsterImg = monsterx[rank-1];

    } else {
        bgChange = true;
    }

    const d = skin === 2 ? "tr" : (skin === 3 ? "mr" : "bg");
    const allImgs = document.querySelectorAll(`#${d}Skin img`);

    if (bed) {
        allImgs.forEach(img => {
            const src = +img.getAttribute('rank');
            if (src === rank) {
                img.classList.add('selecta');
            }
        });

    } else {
        localStorage.setItem(d + "Data", JSON.stringify([rank,skin]));
        allImgs.forEach(im => im.classList.remove("selecta"));
        imgElement.classList.add("selecta");
    }
}





// _______________________________________ AUDIO BLOCK _______________________________________

const gameMusic = ele("backgroundMusic");
const storyMusic = ele("videoMusic");
const sound = new Audio(`audios/shift.mp3?v=${GAME_VERSION}`);
const treat = new Audio(`audios/treasure.mp3?v=${GAME_VERSION}`);
let fide, hide, musicOn = true;


function fadeOutMusic(m) {
    if (fide) clearInterval(fide);
    const music = m ? gameMusic : storyMusic;
    let vol = music.volume;

    hide = setInterval(() => {
        if (vol > 0.02) {
            vol -= 0.02;
            music.volume = vol;
        } else {
            music.volume = 0;
            music.pause();
            clearInterval(hide);
        }
    }, 15);
}


function fadeInMusic(m) {
    if (hide) clearInterval(hide);
    const music = m ? gameMusic : storyMusic;
    music.play();
    music.volume = 0;

    fide = setInterval(() => {
        if (music.volume < 0.98) {
            music.volume += 0.02;
        } else {
            music.volume = 1;
            clearInterval(fide);
        }
    }, 15);
}


function musicToggle() {
    musicOn = !musicOn;
    musicOn ? fadeInMusic(1) : fadeOutMusic(1);
    ele('musicBtn').textContent = musicOn ? "🔊" : "🔇";
}





// _______________________________________ VIDEO BLOCK _______________________________________

let colint, textint, interl;
let [line, colChange, stord] = [0, true, false];
const st = ele("storyText");
const cols = ['#85ff85', '#ffd979', '#ff6464', '#63aeff', '#9476feff'];

const storiez = [
    "The year is 2076. A few years ago, something tragic happened... No one knows the full truth. Many believe it was a space attack.",
    "The outer world was scorched by high-radiation storms and hyper-active thunder, forcing us to hide in the Graphene caves.",
    "But even these caves aren't safe — Graphene Monsters roam within, mutated by radiation gone wrong, always hunting us.",
    "The elders say our only goal is to reach the Final Station — the end of this journey — while collecting rare Graphene and staying alive.",
    "We are the last hope of mankind, defying fate and outrunning death from the very beginning.",
    "The world was left shattered by chaos, hunger, and steel... Who would've thought old rusty trains would become our last salvation?",
    "They were heavy, durable, metallic — we modified these trains to shift tracks in hyper-dangerous conditions.",
    "And now... you're the pilot of this unstoppable beast — shifting rails and dodging doom until the very end.",
    "These trains are the sci-fi beasts of this era. That's what we call them — RAIL SHIFTER. *_*"
];


function shuffling() {
    const col = ['#771b1b', '#7b5e14', '#005e00', '#0f457f'];
    for (let i = col.length - 1; i > 0; i--) {
        const j = flor(i + 1);
        [col[i], col[j]] = [col[j], col[i]];
    }
    return col;
}


function coloring() {
    const c = shuffling();
    const cc = `linear-gradient(90deg, ${c.join(",")})`;
    const [b1, b2] = [ele('bg1'), ele('bg2')];
    const [b11, b22] = colChange ? [b2, b1] : [b1, b2];
    b11.style.background = cc;
    b11.style.opacity = 1;
    b22.style.opacity = 0;
    colChange = !colChange;
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
    stord = false;
    setTimeout(() => {
        ele('nextBtn').innerText = 'NEXT';
        on('skipBtn');
    }, 800);
    fadeOutMusic();
    line = 0;
}


function storyyy() {
    storyMusic.currentTime = '0';
    on(2, 'storyContainer');
    stord = true;
    showLine(line);
    fadeInMusic();
    st.style.color = cols[flor(5)];
    coloring();

    colint = setInterval(() => coloring() , 2500);
    textint = setInterval(() => { st.style.color = cols[flor(5)] } , 7500);
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




// _______________________________________ SCALING BLOCK _______________________________________

let playX = true;

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    ele('rotateWarning').style.display = isPortrait ? 'flex' : 'none';
    gamePaused = isPortrait;
    if (!gameRunning || !playX || gamePaused) return;
    requestAnimationFrame(() => {
        if (uploop) cancelAnimationFrame(uploop);
        if (doloop) cancelAnimationFrame(doloop);
        update();
    })
}


async function goFullscreen() {
    const elem = document.body;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock("landscape");
            console.log("Orientation locked to landscape");
        } catch (err) {
            console.warn("Orientation lock failed:", err);
        }
    }

  requestAnimationFrame(setViewportHeight);
}


function fullx(o) {
    const e = ele('fulBtn');
    if (o) {
        e.style.opacity = 0;
        setTimeout(() => { e.style.display = 'none' }, 800);
    } else {
        e.style.transition = 'none';
        requestAnimationFrame(() => {
            e.style.opacity = 0;
            e.style.transition = 'all 0.3s ease, opacity 0.7s ease';
            e.style.display = 'block';
            requestAnimationFrame(() => { e.style.opacity = 0.5 });
        });
    }
}

fullx();





// _______________________________________ CANVAS BLOCK _______________________________________

const canvas = ele("gameCanvasX");
const ctx = canvas.getContext("2d");
let [gameRunning, gamePaused] = [false, false];
let CW, CH, k, l, editx, resizeTimer;


function resiz() {
    setViewportHeight();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    CW = canvas.width;
    CH = canvas.height;
    klupdater();
    checkOrientation();
    const [x,y] = [gett('trEdit'), gett('mrsEdit')];

    x ? editz(+x) : editz(2);
    y ? editz(+y) : editz(6);
}


let train = { x: 60 , width: 100 , height: 300 , top: true };


function klupdater() {
    const [a,b] = [CH * 0.42, CH * 0.64];
    train.height = CH * 0.17;
    train.width = train.height * trainscale;
    k = a - train.height;
    l = b - train.height;
    editx = ((CW > CH) ? CW : CH)/1300;
}





// _______________________________________ TASKS BLOCK _______________________________________

const wait = ms => new Promise(r => setTimeout(r, ms));


function waitUntilNoRotateWarning() {
    return new Promise(resolve => {
        const check = () => {
            const warning = ele("rotateWarning");
            const isHidden = !warning || warning.style.display === "none";
            isHidden ? resolve() : setTimeout(check, 100);
        };
        check();
    });
}


window.addEventListener("load", async () => {
    resiz();
    await waitUntilNoRotateWarning();

    await wait(1500);

    on(2, 'studioIntro', 'version');
    await wait(2500);

    off('studioIntro');
    await wait(1500);

    ele('studioIntro').innerHTML = `<h3>EXAGGERATION Studio Presents...</h3>`;
    on(3, 'studioIntro');
    await wait(2500);

    off('studioIntro', 'version');
    await wait(1500);

    on(4, 'menu');
});


window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => resiz() , 100);
});


document.addEventListener('fullscreenchange', () => {
    const isFull = document.fullscreenElement !== null;
    fullx(isFull);
});

setTimeout(() => {
    ['bgData','trData','mrData'].forEach(x => {
        const y = JSON.parse(gett(x));
        usage(y);
    });
    klupdater();
}, 1000);





// _______________________________________ SIDEBAR MENU BLOCK _______________________________________

ele('sideBy').addEventListener("click", () => {
    setLife(false);
    ele('gameCanvasX').classList.toggle("blur");
    on(1, 'sidebar');
    on('dark');
    off('fpsx', 'envy');
    gamePaused = true;
    playX = false;
    if (musicOn) fadeOutMusic(1);
});


function taskResume() {
    if (isfps) on('fpsx');
    off('dark', 'sidebar');
    ele('gameCanvasX').classList.remove("blur");
    on('envy');
    gamePaused = false;
    playX = true;
    if (musicOn) fadeInMusic(1);
    update();
    setLife(extralife);

    if (flashing) flash();
    if (bursting) xgrBurst();
}





// _______________________________________ RESUME - PAUSE FUNCTION _______________________________________

function resumePause() {
    if (!gameRunning || stuck) return;

    gamePaused = !gamePaused;
    ele("pauser").textContent = gamePaused ? "⏸" : "▶";
    playX = !gamePaused;

    if (gamePaused) {
        if (musicOn) fadeOutMusic(1);
    } else {
        if (musicOn) fadeInMusic(1);
        update();

        if (flashing) flash();
        if (bursting) xgrBurst();
    }
}





// _______________________________________ CHECKPOINT BLOCK _______________________________________

function saveCp() {
    const cpData = {
        rrr: run + Math.floor((reach - CW * 10.4)/(50 * editx)),
        xp: exp + epo,
        org: requirement,
        gt: gpGot,
        pt: stat.plot + 1
    };
    localStorage.setItem('trainGameCheckpoint', JSON.stringify(cpData));
}


function loadCp() {
    [reach, cameraX, epo, run, speedX, monsterCount, kb, gpGot, border] = [0,0,0,0,0,0,0,0,0];
    [showAdvance, gamePaused, crash, challenge, onpro, offpro] = [false, false, false, false, false, false];
    [monsterSpeed, requirement, mono, monsta, gameRunning] = [monsterBase, 50, 1, null, true];
    ski = (18000 + rand(7000)) * editx;
    genX();
    setLife(extralife);
    if (isfps) on('fpsx');
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


const existCp = () => gett("trainGameCheckpoint") !== null;


function delCp(ddd) {
    if (ddd === 1) {
        showPopup(existCp() ? "😎 Checkpoint removed succesfully...!" : "😤 No checkpoint exists...!");
        if (existCp()) localStorage.removeItem('trainGameCheckpoint');

    } else if (ddd === 2) {
        ["bgData", "trData", "mrData", "trEdit", "mrsEdit", "isfpsc"].forEach(id => localStorage.removeItem(id));
        showPopup("😎 All settings default...");
        [bgImg, trainImg, monsterImg] = [];
        editz(2);
        editz(6);
        const allImgs = document.querySelectorAll('img');
        allImgs.forEach(im => im.classList.remove("selecta"));
        
    } else {
        off('reset');
    }
}





// _______________________________________ GAME OVER BLOCK _______________________________________

let q;
const query = [
    "🔥 Why these obstacles...Hmm...",
    "🔥 Im gonna burst all these obstacles...",
    "🔥 Why only me - ***********",
    "🔥 You will pay for this... Monster",
    "🔥 Damn... This monster",
    "🔥 What the Hell - ************"
];


function gOver(rg) {
    off('gameCanvasX', 'envy');
    setLife(false);
    ele('gameReason').innerHTML = `<h2>GAME OVER : ${rg ? 'THE TRAIN DONE COLLISION' : 'MONSTER DESTROYED THE TRAIN'}</h2>`;
    q = flor(3) + (rg ? 0 : 3);
    ele('continueBtn').innerText = existCp() ? "Continue" : "Restart";
    on(1, 'gameOver');
    started = false;
}


function gEnd() {
    off('gameCanvasX', 'gameOver', 'sidebar');
    setTimeout(() => { ele('gameCanvasX').classList.remove("blur") } , 500);
    on('endu');
    setTimeout(() => on(2, 'enduBtn') , 2000);
    started = false;
}


function ends() {
    started = false;
    off('gameCanvasX', 'gameOver', 'sidebar', 'dark', 'endu', 'enduBtn');
    setTimeout(() => { ele('gameCanvasX').classList.remove("blur") } , 500);
    setTimeout(() => on(2, 'menuxBtn') , 2000);
}


function conCp() {
    off('gameOver');
    startGame();
    setTimeout(() => showPopup(query[q]) , 4500);
}





// _______________________________________ POPUP BLOCK _______________________________________

function showPopup(msg = "Popup!", dura = 2500) {
    const container = document.getElementById('popupContainer') || (() => {
        const d = document.createElement('div');
        d.id = 'popupContainer';
        d.style.position = 'fixed';
        d.style.top = '10vh';
        d.style.left = '50%';
        d.style.transform = 'translateX(-50%)';
        d.style.zIndex = '9999999';
        d.style.pointerEvents = 'none';
        document.body.appendChild(d);
        return d;
    })();

    const pp = document.createElement('div');
    pp.className = 'Popup';
    pp.innerText = msg;
    pp.style.opacity = '0';
    container.appendChild(pp);
    requestAnimationFrame(() => {
        pp.style.opacity = '1';

        setTimeout(() => {
            pp.style.opacity = '0';
            setTimeout(() => { pp.remove() } , 1000);
        }, dura);
    });
}





// _______________________________________ BACKGROUND HANDLING BLOCK _______________________________________

let ski;

function climate() {
    if (!bgChange) return;
    const available = backx.filter(bg => bg !== bgImg);
    if (available.length === 0) return;
    bgImg = available[flor(available.length)];
    setTimeout(() => flash(3), 10);
}

setTimeout(() => { if (bgChange) climate() } , 1500);


function changer(xgr) {
    if (xgr < ski) return;
    climate();
    ski += (18000 + rand(7000)) * editx;
}


function doBg(xgr, cww, chh) {
    const bgw = bgImg.width * (chh/bgImg.height);
    const init = -xgr/4 % bgw;
    for (let x = init; x < cww; x += bgw) ctx.drawImage(bgImg, x, 0, bgw, chh);
}





// _______________________________________ ADVANCE BLOCK _______________________________________

let advanceAF, showAdvance = false;


function doAdv() {
    if (advanceAF) return;
    const adv = ele('advance');
    let lastDD, lastOP;

    function ina() {
        if (!showAdvance || !gameRunning || crash) {
            adv.style.display = 'none';
            advanceAF = null;
            return;
        }

        const block = !gamePaused && !stuck;
        const DD = block ? 'block' : 'none';

        if (DD !== lastDD) {
            adv.style.display = DD;
            lastDD = DD;
        }

        if (block) {
            const OP = Math.floor(Date.now() / 400) % 2 === 0 ? '1' : '0';
            if (OP !== lastOP) {
                adv.style.opacity = OP;
                lastOP = OP;
            }
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
        gpgp = true;
        setTimeout(() => xgrBurst() , 20);
        setTimeout(() => {
            ["🔥 Used ADVANCE!", "🔥 XP Boosted!", "--- Monster Slowed Down ---"].forEach(p => showPopup(p));
        }, 1000);
    } else {
        showPopup(`🔥 Minimum ${requirement} Graphene Needed for ADVANCE!`);
    }
}





// _______________________________________ ELECTRIC BURST EFFECT _______________________________________

let [bursting, scaleE, lastE, opacityE] = [false, 0, 0, 1.5];


function xgrBurst(krg = 1) {
    const [cx, cy, e] = [train.x + train.width/2 , (train.top ? k : l) + train.height/2 , editx];
    const imge = krg === 1 ? esburstImg : hvburstImg;

    function animate(timestamp) {
        if (!playX) return;

        const size = CH * 0.8 * scaleE * e;
        let deltaT = (timestamp - lastE)/800;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 0.2;
        lastE = timestamp;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(scaleE);
        ctx.globalAlpha = opacityE;
        ctx.drawImage(imge, -size/2, -size/2, size, size);
        ctx.restore();

        scaleE += deltaT;
        opacityE -= deltaT;
        bursting = true;

        if (opacityE > 0) {
            requestAnimationFrame(animate);
        } else {
            [bursting, scaleE, lastE, opacityE] = [false, 0, 0, 1.5];
        }
    }

    animate();
}





// _______________________________________ FLASH EFFECT _______________________________________

let [flashing, opacityF, lastF] = [false, 0.75, 0];


function flash(f = 1) {
    const [cww, chh, red] = [CW, CH, 0.009];

    function flas(timestamp) {
        if (!playX) return;

        let deltaT = (timestamp - lastF)/16.7;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
        lastF = timestamp;

        if (opacityF > 0) {
            flashing = true;
            ctx.fillStyle = f === 1 ? `rgba(255, 255, 255, ${opacityF})` : `rgba(0, 0, 0, ${opacityF})`;
            ctx.fillRect(0, 0, cww, chh);
            opacityF -= red * deltaT;
            requestAnimationFrame(flas);
        } else {
            [flashing, opacityF, lastF] = [false, 0.75, 0];
        }
    }

    flas();
}





// _______________________________________ SHAKE EFFECT _______________________________________

function shake() {
    let [a, b] = [0, true];
    const [x, e] = [cameraX, editx];

    function xyz() {
        cameraX = x + Math.sin(a) * 3 * e;
        a += 0.8;
        if (b) requestAnimationFrame(xyz);
    }

    xyz();
    setTimeout(() => { b = false } , 700);
}





// _______________________________________ EXTRA LIFE BLOCK _______________________________________

let extralife = gett('lifex') ? gett('lifex') === 'true' : true;
let lifeX1, lifeY, lifeX2;

const setLife = active => active ? on('extraLife') : off('extraLife');


function lifer() {
    [monsta, extralife, crash, stuck, exuping, mono] = [null, false, false, false, true, 1];
    localStorage.setItem('lifex', 'false');
    setLife(extralife);
    on('envy');
    flash();
    setTimeout(() => showPopup("🔥 Resurrection... 🔥") , 800);
}


function doLife(xgr, cww, end, chh) {
    const lifeYY = lifeY * chh;
    const sizi = chh * 0.15;
    if (xgr < cww * 7) ctx.drawImage(lifeImg, lifeX1 - xgr, lifeYY, sizi, sizi);
    if (xgr > end - cww * 7) ctx.drawImage(lifeImg, lifeX2 - xgr, lifeYY, sizi, sizi);
}





// _______________________________________ SMOKE EFFECT _______________________________________

const smokeParticles = [];


function genSmoke(xgr, e) {
    smokeParticles.push({
        x: xgr + train.width/2,
        y: train.top ? k : l,
        scale: (0.5 + rand(0.5)) * e,
        opacity: 1,
        speedX: (rand() - 0.5) * e,
        speedY: (-rand(0.7) - 0.5) * e,
        grow: (0.004 + rand(0.004)) * e,
        rotation: rand(Math.PI * 2),
        spin: rand(0.02) - 0.01
    });
}


function doSmoke(xgr, dt) {
    if (stuck) return;

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        const p = smokeParticles[i];
        p.x += p.speedX * dt;
        p.y += p.speedY * dt;
        p.scale += p.grow * dt;
        p.rotation += p.spin * dt;
        p.opacity -= dt/100;

        if (p.opacity <= 0) {
            smokeParticles.splice(i, 1);
        } else {
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x - xgr, p.y);
            ctx.rotate(p.rotation);
            const size = 64 * p.scale;
            ctx.drawImage(smokeImg, -size/2, -size/2, size, size);
            ctx.restore();
            ctx.globalAlpha = 1;
        }
    }
}





// _______________________________________ SPARK EFFECT _______________________________________

const electricSparks = [];


function genSpark(e) {
    electricSparks.length = 0;
    electricSparks.push({
        x: train.x + train.width/2,
        y: train.top ? k : l,
        scale: (0.5 + rand(0.5)) * e,
        rotate: rand() - 0.5,
        opacity: 1
    });
}


function doSparks(dt) {
    if (stuck) return;
    for (let i = electricSparks.length - 1; i >= 0; i--) {
        const s = electricSparks[i];

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.translate(s.x , s.y);
        ctx.rotate(s.rotate);

        const size = 250 * s.scale;
        ctx.drawImage(sparkImg, -size, -size, size, size);

        ctx.restore();
        s.opacity -= 0.4 * dt;

        if (s.opacity <= 0) electricSparks.splice(i, 1);
    }
}





// _______________________________________ EXPLOSION BLOCK _______________________________________

const boom = new Audio(`audios/explode.mp3?v=${GAME_VERSION}`);
let mono = 1;
let exuping = true;


function doExp(chh, dt) {
    const exup = chh/110000 * dt;
    const size = chh * mono;
    const cx = train.x + train.width * 0.6 - size/2;
    const cy = (train.top ? k : l) + train.height * 0.8 - size/2;
    ctx.drawImage(expImg, cx, cy, size, size);
    mono += exup * (exuping ? 1 : -4);
}





// _______________________________________ FPS BLOCK _______________________________________

let isfps = gett('isfpsc') || true;
let frames = 0;
let lastfpx = 0;


function doFPS(dt) {
    frames++;
    const pass = dt - lastfpx;

    if (pass >= 300) {
        const fps = ((frames * 1000) / pass).toFixed();
        frames = 0;
        lastfpx = dt;
        ele('fpsx').innerText = `FPS: ${fps}`;
    }
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
        localStorage.setItem('isfpsc',isfps);
        showPopup("FPS Meter is Disabled now...😎");
    } else {
        showPopup("Already Disabled... Time for the Gameplay..🔥");
    }
}





// _______________________________________ SCORE-PROGRESS BLOCK _______________________________________

let [run, exp, epo, trackk] = [0,0,0,0];
let gpgp = true;
const runup = ele('runnerScore');


function progression(xgr, end, dt) {
    if (!challenge) return;
    runup.innerText = `Score: ${run + Math.floor(xgr/(50 * editx))} || XP: ${epo + exp}`;

    if (gpgp) {
        ele("progressBar").style.width = `${(gpGot/requirement) * 100}` + "%";
        ele('score').textContent = `Graphene: ${gpGot}/${requirement}`;
        gpgp = false;
    }

    if (dt - trackk > 300) {
        const trackWidth = ele('trackingContainer').clientWidth;
        const percent = Math.min(1, Math.max(0, xgr/end));
        ele('tracking').style.left = `${percent * trackWidth}px`;
        trackk = dt;
    }
}





// _______________________________________ COLLECTOR BLOCK _______________________________________

function collects() {
    if (!gameRunning || gamePaused || stuck) return;
    let collected = false;

    for (const gp of gpBlocks) {
        const gpx = gp.x - cameraX;

        if (!gp.got && gpx >= -gp.width && gpx <= CW) {
            [gp.got, gp.animating, collected, gpgp] = [true, true, true, true];
            gp.alpha = 1;
            gp.dy = 0;
            gpGot++;
        }
    }

    if (!extralife) {
        const checkLife = (lifeX) => {
            const lx = lifeX - cameraX;
            return lx >= 0 && lx <= CW && lifeY >= 0 && lifeY <= CH;
        };

        if (checkLife(lifeX1) || checkLife(lifeX2)) {
            extralife = true;
            localStorage.setItem('lifex', 'true');
            setLife(extralife);
            collected = true;
        }
    }

    if (collected) {
        treat.currentTime = 0;
        treat.play();
    }
}





// _______________________________________ GENERATOR BLOCK _______________________________________

let [generate, lastCleanup, lastOb] = [0,0,0];


function genX() {
    ending = endx * editx;
    stat.x = ending;

    const [start, end] = [ CW * 6 , ending - CW * 5 ];
    crystals = [];obstacles = [];gpBlocks = [];signData = [];
    [lifeX1, lifeX2, lifeY] = [ CW + flor(CW * 3.5) , end + CW/2 + flor(CW * 3.5) , 0.42 + rand(0.18) ];
    
    [CW * 1.5, ending - CW * 4].forEach(dist => {
        for (let i = 0; i < CW * 3.5; i += CH/3 + flor(CH/2)) {
            signData.push({ x: dist + i , skin: flor(3) });
        }
    });

    for (let i = 0; i < start/10; i++) {
        crystals.push({
            x: flor(start),
            y: 0.36 + rand(0.32),
            radius: 1,
            color: cryCol[flor(cryCol.length)]
        });
    }

    [generate, lastOb, lastCleanup] = [start, start, cameraX];
    generateChunk(start);
    generate = Math.min(start + CW * 10, end);
}


function generateChunk(chunkStart) {
    const [h1, h2, h3, d_ob, ups] = [ CH/7 , CH/10 , CH/14 , train.width + CH/7 + CW/30 , CW * (0.3 - difi * 0.07) ];
    const chunkEnd = Math.min(chunkStart + CW * 10, ending - CW * 5);
    if (chunkStart >= chunkEnd) return;
    const qq = (chunkEnd + CW * 5.5 < ending) ? 0 : CW * 7;
    const crystalCount = Math.floor((chunkEnd + qq - chunkStart)/10);

    for (let i = 0; i < crystalCount; i++) {
        crystals.push({
            x: chunkStart + flor(chunkEnd + qq - chunkStart),
            y: 0.36 + rand(0.32),
            radius: 1,
            color: cryCol[flor(cryCol.length)]
        });
    }

    for (let i = chunkStart; i < chunkEnd; i += (flor(CW/5) + ups)/tops) {
        gpBlocks.push({
            x: i,
            y: 0.42 + rand(0.18),
            width: h2,
            height: h2,
            got: false,
            animating: false,
            alpha: 1,
            dy: 0
        });
    }

    for (let i = lastOb; i < chunkEnd; i += d_ob + flor(300 * editx)) {
        const robs = obi[flor(obi.length)];
        const scaler = h1/robs.naturalHeight;
        const scaleww = robs.naturalWidth * scaler;
        lastOb = i;
        obstacles.push({
            x: i,
            y: h3,
            height: h1,
            width: scaleww,
            img: robs,
            t: rand() < 0.5
        });
    }
    lastOb += d_ob + flor(300 * editx);
}


function worldStream(xgr, cww, end) {
    if (xgr + cww * 8 > generate) {
        generateChunk(generate);
        generate = Math.min(generate + cww * 10, end - cww * 5);
    }

    if (xgr - lastCleanup >= cww * 3) {
        crystals = crystals.filter(c => c.x > lastCleanup);
        obstacles = obstacles.filter(o => o.x + o.width > lastCleanup);
        gpBlocks = gpBlocks.filter(g => g.x + g.width > lastCleanup);
        signData = signData.filter(s => s.x > lastCleanup);
        lastCleanup = xgr;
    }
}





// _______________________________________ BILL BOARDS BLOCK _______________________________________

function doBoardz(x, chh, ww) {
    const boardW = chh * (ww ? 0.6 : 0.4);
    const [boardH, boardY, pilW, pilH, pilY] = [chh/10, chh/5, chh/40, chh/20, chh * 0.3];
    const label = ww ? "Challenge Begins  >>>" : "Safe Area  >>>";

    ctx.fillStyle = "#201000";
    ctx.fillRect(x - pilW/2, pilY, pilW, pilH);

    ctx.fillStyle = "#111";
    ctx.fillRect(x - boardW/2, boardY, boardW, boardH);

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - boardW/2, boardY, boardW, boardH);

    ctx.save();
    ctx.translate(x, boardY + boardH/2);
    ctx.fillStyle = "#ffcc00";
    ctx.font = `bold ${boardH/2}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 8, 0);
    ctx.restore();
}


let signData = [];

function doSign(xgr, cww, chh) {
    const signY = chh/5;
    const size = chh * 0.15;

    for (const s of signData) {
        const signX = s.x - xgr;
        if (signX > cww * 1.2) break;
        if (signX > -300) {
            const img = offImgs[s.skin];
            ctx.drawImage(img, signX, signY, size, size);
        }
    }
}





// _______________________________________ STATION BLOCK _______________________________________

let endx = 50000 + flor(25000);
let ending = endx;
const stat = { x: ending , rtx: false , plot: 0 };


function doStat(xgr, cww, chh) {
    const [statX, statY, statE, statR] = [stat.x - xgr, chh * 0.35, chh * 0.3, chh * 0.7];

    [xgr, statX].forEach(x => {
        if (x < cww * 1.5) {
            ctx.drawImage(statUp, -x - 10, 0, cww * 1.1, statY);
            ctx.drawImage(statDown, -x -10, statR, cww * 1.1, statE);
        }
    })
}


function doPlot(x, chh, p = 0) {
    const [boardW, boardH, boardY] = [chh/10, chh * 0.41, chh * 0.32]
    const [cx, cy] = [x + boardW/2, boardY + boardH/2];

    ctx.fillStyle = "#111";
    ctx.fillRect(x, boardY, boardW, boardH);

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, boardY, boardW, boardH);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI/2);
    ctx.fillStyle = "#ffcc00";
    ctx.font = `bold ${boardW/2}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Platform -- ${stat.plot + p}`, 0, 0);
    ctx.restore();
}





// _______________________________________ AREA MAINTAIN FUNCTION _______________________________________

function doArea(xgr, cww, end, chh) {
    const e = editx;
    const [gSize, trackU, trackD, barGap, baseY, shadowH] = [chh * 0.35, chh/20, chh/12.5, 30 * e, chh * 0.7, chh * 0.075];

    ctx.fillStyle = "#201000";
    ctx.fillRect(0, gSize, cww, gSize);

    ctx.fillStyle = "#818A8B";
    const firstBar = Math.max(0, Math.floor((xgr - 30)/barGap) * barGap);
    const lastBar = Math.min(end, xgr + cww + 30);

    for (let i = firstBar; i <= lastBar; i += barGap) {
        const barX = i - xgr;
        const barW = 10 * e;
        const adjust = chh/100;
        ctx.fillRect(barX, gSize + trackU - adjust, barW, trackU);
        ctx.fillRect(barX, gSize + gSize - trackD - adjust, barW, trackU);
    }

    ctx.fillStyle = "#000";
    const rGap = cww/2;
    const firstR = Math.max(0, Math.floor((xgr - 60)/rGap) * rGap);
    const lastR = Math.min(end, xgr + cww + 60);

    for (let i = firstR; i <= lastR; i += rGap) {
        const rX = i - xgr;
        const rpg = e * 10;
        for (let t = 0; t <= 3; t++) {
            ctx.fillRect(rX - rpg * t, baseY + shadowH * t, rpg * (4 + t * 2), shadowH);
        }
    }

    ctx.strokeStyle = "#42220b";
    ctx.lineWidth = 5 * e;
    ctx.beginPath();

    const x = [ gSize + trackU , gSize + trackD , gSize + gSize - trackD , gSize + gSize - trackU ];
    for (let y of x) {
        ctx.moveTo(0, y);
        ctx.lineTo(cww, y);
    }
    ctx.stroke();
}





// _______________________________________ TRAIN BLOCK _______________________________________

let [swich, crash] = [false, false];
let [startY, targetY, xx] = [0,0,0];


function doTrt(timez, dt) {
    if (crash) return;
    const e = editx;
    xx += 0.13 * dt;
    const baseX = train.x + Math.sin(xx) * 3 * e;
    let baseY;

    if (swich) {
        const t = Math.min(timez/200, 1);
        baseY = startY + (targetY - startY) * t;

        if (t >= 1) {
            swich = false;
            traintime = 0;
        }

        ctx.fillStyle = "#5dade2";
        const [barX, barS, barH] = [baseX - train.width/10, 12 * e, 100 * e];

        for (let i = 0; i < train.width * 1.2; i += barS) {
            ctx.fillRect(barX + i, baseY, 4 * e, barH);
        }
    } else {
        baseY = train.top ? k : l;
    }

    ctx.drawImage(trainImg, baseX, baseY, train.width, train.height);
}


function swicher() {
    if (swich || stuck || gamePaused || !gameRunning) return;
    swich = true;
    startY = train.top ? k : l;
    targetY = train.top ? l : k;
    train.top = !train.top;
    sound.currentTime = '0';
    sound.play();
}





// _______________________________________ ITEMS BLOCK _______________________________________

const cryCol = ["#00f0ff", "#ff00f0", "#00ff88", "#ffee00", "#ff6600", "#df0000", "#5800df"];
let gpGot = 0;
let requirement = 50;
let crystals = [], obstacles = [], gpBlocks = [];


function doItems(xgr, cww, chh, dt) {
    const lllPlus40 = cww + 40;
    const pi = Math.PI * 2;

    for (const dot of crystals) {
        const dx = dot.x - xgr;
        if (dx >= -40 && dx <= lllPlus40) {
            ctx.beginPath();
            ctx.arc(dx, dot.y * chh, dot.radius, 0, pi);
            ctx.fillStyle = dot.color;
            ctx.fill();
        }
    }

    for (const ob of obstacles) {
        const obx = ob.x - xgr;
        if (obx > cww * 1.2) break;
        const obh = ob.t ? k : l;
        if (obx > -ob.width && obx < cww) {
            ctx.drawImage(ob.img, obx, ob.y + obh, ob.width, ob.height);
        }
    }

    for (const gp of gpBlocks) {
        const gx = gp.x - xgr;
        if (gx > cww * 1.2) break;
        const gy = gp.y * chh;

        if (gp.got && gp.animating) {
            gp.alpha -= 0.03 * dt;
            gp.dy -= editx * dt;
            if (gp.alpha <= 0) {
                gp.alpha = 0;
                gp.animating = false;
            }

            ctx.save();
            ctx.globalAlpha = gp.alpha;
            ctx.drawImage(gpImg, gx, gy + gp.dy, gp.width, gp.height);
            ctx.restore();
        }

        if (!gp.got && gx > -gp.width && gx < cww) {
            ctx.drawImage(gpImg, gx, gy, gp.width, gp.height);
        }
    }
}





// _______________________________________ MONSTER BLOCK _______________________________________

const monsterRoar = new Audio(`audios/roarx.mp3?v=${GAME_VERSION}`);
let [monsterCount, monsterSpeed, mx, my] = [0,0,0,0];
let monsta = null;


function spawnMonster() {
    if (monsta) return;
    monsterSpeed = monsterBase + monsterCount;

    if (monsterSpeed >= monsterMax) {
        showAdvance = true;
        doAdv();
        monsterSpeed = monsterMax;
    }

    monsterCount += monsterUp;
    const mons = rand() < 0.5;
    monsta = { x: cameraX + CW + 100 , y: mons ? k : l , speed: monsterSpeed , mt: mons };
    monsterRoar.play();
}


function doMrs(xgr, dt) {
    if (!monsta) return;
    mx += 0.16 * dt;
    my += 0.12 * dt;
    const e = editx;
    const size = train.height;
    const monsterX = monsta.x - xgr + Math.sin(mx) * 10 * e;
    const monsterY = monsta.y + Math.sin(my) * 5 * e;

    for (let i = 0; i < size; i += 2) {
        const color = rand(3);
        const flameColor = color < 1 ? "#ff0202ff" : (color < 2 ? "#ffe802" : "#000");
        const flameWidth = i < size/2 ? 20 + i/2 + rand(70) : 50 + (size - i)/2 + rand(70);
        ctx.fillStyle = flameColor;
        ctx.fillRect(monsterX + size/3, monsterY + i, flameWidth * e, 2 * e);
    }

    ctx.drawImage(monsterImg, monsterX, monsterY, size, size);
}





// _______________________________________ OBSTACLE COLLISION _______________________________________

const cpop = ["😅 OOpsie HOpsie Doo...!", "Rail Shifter Crahed 😅...!"];

function crashOb(xgr) {
    if (crash) return;

    for (let i = 0; i < obstacles.length; i++) {
        const ob = obstacles[i];
        const obSX = ob.x - xgr;
        if (obSX > CW) break;
        const collided = train.x < obSX + ob.width && train.x + train.width > obSX && train.top === ob.t;

        if (collided) {
            crash = true;
            const prevo = challenge;
            challenge = false;
            off('envy');

            const mons = rand() < 0.5;
            monsta = { x: xgr + CW * 0.9 , y: mons ? k : l , speed: 0 , mt: mons };
            shake();
            setTimeout(() => xgrBurst(5) , 20);

            if (!extralife) {
                if (musicOn) fadeOutMusic(1);
                gamePaused = true;
                gameRunning = false;
                off('fpsx');
                reas = 1;
                reUpdate();
                const msg = cpop[flor(2)];

                setTimeout(() => {
                    showPopup(msg);
                    setTimeout(() => { allowed = false } , 2000);
                }, 1200);
            } else {
                stuck = true;
                obstacles.splice(i, 1);
                showPopup("🔥 EXTRA LIFE 🔥");

                setTimeout(() => {
                    exuping = false;
                    setTimeout(() => {
                        lifer();
                        challenge = prevo;
                    }, 1500);
                }, 1500);
            }

            boom.play();
            break;
        }
    }
}





// _______________________________________ MONSTER COLLISION _______________________________________

function crashMrs(xgr, dt) {
    if (!monsta || crash) return;

    monsta.x -= monsta.speed * dt;
    const mrSX = monsta.x - xgr;
    const collided = train.x < mrSX + train.height && train.x + train.width > mrSX && train.top === monsta.mt;

    if (collided) {
        crash = true;
        const prevo = challenge;
        challenge = false;
        off('envy');

        monsta.x = xgr + CW * 0.9;
        monsta.speed = 0;
        shake();
        setTimeout(() => xgrBurst(5) , 20);

        if (!extralife) {
            if (musicOn) fadeOutMusic(1);
            gamePaused = true;
            gameRunning = false;
            reas = null;
            reUpdate();
            off('fpsx');
            const msg = cpop[flor(2)];

            setTimeout(() => {
                showPopup(msg);
                setTimeout(() => { allowed = false } , 2000);
            }, 1200);

        } else {
            stuck = true;
            showPopup("🔥 EXTRA LIFE 🔥");

            setTimeout(() => {
                exuping = false;
                setTimeout(() => {
                    lifer();
                    challenge = prevo;
                }, 1500);
            }, 1500);
        }

        boom.play();

    } else if (monsta.x < -100 || monsta.x < xgr - 500) monsta = null;
}





// _______________________________________ STATION COLLISION _______________________________________

function crashStat(xgr) {
    if (stat.rtx || xgr < stat.x - train.width) return;
    stat.rtx = true;
    showPopup("😤 Saving the Checkpoint...! 🚉");
    saveCp();
    const Acc = acc;
    acc = 0;
    const dcc = 0.3 * editx;

    const slowDownTrain = () => {
        if (speedX <= 0) {
            speedX = 0;
            return;
        }
        speedX -= dcc;
        if (speedX < 0) speedX = 0;
        requestAnimationFrame(slowDownTrain);
    };

    requestAnimationFrame(slowDownTrain);

    setTimeout(() => {
        endx = 50000 + flor(25000);
        loadCp();
        acc = Acc;
        flash();
        setTimeout(() => showPopup("😎 Checkpoint Saved...! 🚉") , 1000);
    }, 2000);
}





// _______________________________________ SPEED HANDLER BLOCK _______________________________________

let lasting, [cameraX, speedX, remind, reach] = [0,0,0,0];
let [righto, lefto, pressT, stuck, braver, braverr] = [false, false, false, false, true, true];


function handleSpeed(xgr, dt) {
    if (stuck) {
        speedX = 0;
        return;
    }

    const [a, f, max] = [acc * dt, fri * dt, trainMax * dt];

    if (righto) {
        remind = 0;
        speedX = Math.min(speedX + a, max);
        if (xgr > reach) reach = xgr;

    } else if (lefto) {
        remind = 0;

        if (xgr > 0) speedX = Math.max(speedX - a, -max);

        if (xgr <= reach - 1000 || xgr <= border) {
            if (speedX !== 0) speedX = 0;

            if (braver) {
                braver = false;
                showPopup(rand() > 0.5 ? "🔥 Brave People... Never Turn Back!" : "🔥 What's the fear to move Back...");
                setTimeout(() => { braver = true } , 3500);
            }
        }

    } else {
        remind++;
        if (xgr <= 0) {
            speedX = 0;
        } else if (speedX > 0) {
            speedX = Math.max(0, speedX - f);
        } else if (speedX < 0) {
            speedX = Math.min(0, speedX + f);
        }
    }

    if (braverr && remind >= 2000 * dt) {
        braverr = false;
        showPopup(rand() > 0.5 ? "🔥 It's time to move ahead..." : "🔥 Let's move on Buddy...");
        setTimeout(() => { braverr = true } , 5000);
    }
}





// _______________________________________ EVENT HANDLER BLOCK _______________________________________

let [border, lasttime, kb, lastly, traintime, spawner, timer] = [0,0,0,0,0,20,400];
let [challenge, onpro, offpro] = [false, false, false];


function distanceHandler(end, cww) {
    const d1 = cww * 5.7;
    const d2 = end - cww * 4.7;

    if (!challenge && reach < d2) {
        if (reach > d1) {
            challenge = true;
            border = reach;
        }
    } else {
        if (reach > d2) {
            challenge = false;
            border = reach;
        }
    }

    if (!onpro && reach > d1) {
        on('progi');
        onpro = true;
    }

    if (!offpro && reach > d2) {
        off('progi');
        offpro = true;
    }
}


function hyper(timez, xgr) {
    const [dt, dtt, e] = [timez - lasttime, timez - lastly, editx];

    if (dt > timer && !stuck) {
        const pyro = Math.min(20, Math.abs(speedX)/e);
        timer = (pyro < 4) ? 500 + rand(300) : 70 + (20 - pyro) * 25 + rand(30);
        diesel ? genSmoke(xgr, e) : genSpark(e);
        lasttime = timez;
    }

    if (dtt > 400) {
        for (let i = 0; i < crystals.length; i++) {
            crystals[i].radius = (2 + flor(5)) * e;
        }
        lastly = timez;

        if (challenge) {
            kb++;
            if (kb > spawner) {
                spawnMonster();
                kb = 0;
                spawner = 20 + flor(12);
            }
        }
    }
}





// _______________________________________ GAME LOOPS _______________________________________

let uploop, doloop, reas;
let relasting = 0;
let allowed = true;


function update(timestamp) {
    if (gamePaused || !gameRunning) return;

    let deltaT = (timestamp - lasting)/16.7;
    if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
    if (swich) traintime += deltaT * 16.7;
    lasting = timestamp;
    cameraX += speedX;
    const [cww, chh, end, camx] = [CW, CH, ending, cameraX];
    ctx.clearRect(0, 0, cww, chh);

    if (bgChange) changer(reach);
    hyper(timestamp, camx);
    handleSpeed(camx, deltaT);
    worldStream(cameraX, cww, end);

    doBg(camx, cww, chh);
    doArea(camx, cww, end + cww * 1.7, chh);
    doItems(camx, cww, chh, deltaT);
    doStat(camx, cww, chh);
    if (!extralife) doLife(camx, cww, end, chh);
    distanceHandler(end, cww);

    if (camx < cww * 7) {
        if (camx > cww * 3.5) doBoardz(cww * 5.4 - camx, chh, 1);
        doSign(camx, cww, chh);
    }

    if (camx > end - cww * 6) {
        if (camx < end - cww * 2.5) doBoardz(end - cww * 4.4 - camx, chh);
        doSign(camx, cww, chh);
    }

    diesel ? doSmoke(camx, deltaT) : doSparks(deltaT);

    doTrt(traintime, deltaT);
    doMrs(camx, deltaT);

    if (camx < cww * 1.5) doPlot(cww/2 - camx, chh);
    if (camx > end - cww) doPlot(stat.x + cww/2 - camx, chh, 1);

    progression(reach - cww * 5.7, end - cww * 10.4, timestamp);
    crashMrs(camx, deltaT);
    crashOb(camx);
    crashStat(camx);

    if (isfps) doFPS(timestamp);
    if (stuck) doExp(chh/2.5, deltaT);

    uploop = requestAnimationFrame(update);
}


function reUpdate(timestamp) {
    if (allowed) {
        let deltaT = (timestamp - relasting)/16.7;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
        relasting = timestamp;
        const [cww, chh, end, camx] = [CW, CH, ending, cameraX];
        ctx.clearRect(0, 0, cww, chh);
        
        doBg(camx, cww, chh);
        doArea(camx, cww, end + cww * 1.7, chh);
        doItems(camx, cww, chh, deltaT);
        doStat(camx, cww, chh);
        doMrs(camx, deltaT);
        doExp(chh/2.5, deltaT);

        doloop = requestAnimationFrame(reUpdate);
    } else {
        setTimeout(() => {
            gOver(reas);
            allowed = true;
        }, 250);
    }
}





// _______________________________________ PC CONTROLS _______________________________________

const isKey = (e, keys) => keys.includes(e.key) || keys.includes(e.code);


window.addEventListener("keydown", (e) => {
    if (isKey(e, ["Space"])) {
        e.preventDefault();
    }

    if (isKey(e, ["p", "P"])) resumePause();
    if (isKey(e, ["m", "M"])) musicToggle();
    if (isKey(e, ["c", "C"])) collects();

    if (isKey(e, ["Space", "Shift", "s", "S"]) && !pressT) {
        swicher();
        pressT = true;
        if (stord) storyNext();
    }

    if (isKey(e, ["ArrowRight", "d", "D"])) {
        righto = true;
        if (opend) nexting();
    }

    if (isKey(e, ["ArrowLeft", "a", "A"])) {
        lefto = true;
        if (opend) pasting();
    }
});


window.addEventListener("keyup", (e) => {
    if (isKey(e, ["Space", "Shift", "s", "S"])) pressT = false;
    if (isKey(e, ["ArrowRight", "d", "D"])) righto = false;
    if (isKey(e, ["ArrowLeft", "a", "A"])) lefto = false;
});




// _______________________________________ MOBILE CONTROLS _______________________________________

function setupHoldButton(el, onStart, onEnd) {
    el.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        onStart();
    });

    el.addEventListener("pointerup", (e) => {
        el.releasePointerCapture(e.pointerId);
        onEnd();
    });

    el.addEventListener("pointercancel", (e) => {
        el.releasePointerCapture(e.pointerId);
        onEnd();
    });
    
    el.addEventListener("pointerleave", (e) => {
        if (el.hasPointerCapture(e.pointerId)) {
            el.releasePointerCapture(e.pointerId);
            onEnd();
        }
    });
}

setupHoldButton(ele('lefter'), () => { lefto = true }, () => { lefto = false });
setupHoldButton(ele('righter'), () => { righto = true }, () => { righto = false });

ele("switcher").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    swicher();
});

ele("coll").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    collects();
});





// _______________________________________ FINAL BLOCK _______________________________________

let started = false;

function startGame() {
    if (started) return;
    started = true;
  
    const help = [
        "😤 You can always set Train Speed from Settings",
        "😤 Boost your Reflexes by increasing difficulty & speed",
        "😤 You can always set Monster Difficulty from Settings",
        "🔥 Track & Enable game FPS via settings",
        "😤 You can reset your progress or default the settings",
        "🔥 Always learn from your tiny mistakes",
        "😎 Use Toggle-Music and Pause-Resume feature effectively",
        "😎 Collect Graphene or ExtraLife using 💰 button",
        "😎 Increase your XP + Slow down Monster -- by practicing ADVANCE",
    ];

    on('dark');
    const i = flor(help.length);
    if (bgChange) climate();

    setTimeout(() => showPopup(help[i]) , 500);

    setTimeout(() => {
        loadCp();
        off('dark', 'progi');
        on('gameCanvasX', 'envy');
        if (musicOn) fadeInMusic(1);
        update();
        flash();
    }, 3500);
}


ele("startBtn").addEventListener("click", () => {
    if (bgImg && trainImg && monsterImg) {
        off('menuxBtn');
        gameMusic.currentTime ='0';
        startGame();
        setTimeout(() => showPopup("🔥 Time for the Torgue 🔥") , 4500);
    } else {
        showPopup("Please Choose All the Skins for the GamePlay First...!");
    }
});

// _______________________________________ EXAGGERATION _______________________________________