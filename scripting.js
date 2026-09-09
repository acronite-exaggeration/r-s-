// EXAGGERATION ================================================================================================

// LOADING BLOCK ===============================================================================================

const GAME_VERSION = '3.1.8';

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





// IMAGE LOADINGS =============================================================================================

const lifeImg = imgload("others/life.png");
const smokeImg = imgload("others/smoke.webp");
const sparkImg = imgload("others/sparkx.webp");
const gpImg = imgload("others/graphene.webp");
const statUp = imgload("others/statup.jpg");
const statDown = imgload("others/statdown.jpg");
const expImg = imgload("others/explosion.webp");
const esburstImg = imgload("others/e-spark-burst.webp");
const hvburstImg = imgload("others/heavy-burst.webp");

const offImgs = [
    imgload("others/cross.png"),
    imgload("others/burst.webp"),
    imgload("others/xgr.png")
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
    imgload("others/crate.jpg"),
    imgload("others/rock.webp"),
    imgload("others/scrap.webp"),
    imgload("others/scrapx.webp")
];





// MODAL BLOCK ================================================================================================

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
    ["This game was designed and developed by <strong>Acronite Monsta</strong>.", "This is the first ever game that I developed", "All my basics and imagination are here... Enjoy!"],
    ["Brought to you by <strong>Exaggeration</strong> gaming studio...", "Passionate about games, code, and creativity.. Hope you enjoy playing!", "Feel free to share feedback & have fun 🎮"],
    ["Games often play a great role in <strong>Entertainment</strong>", "My Homeland and Nature has no artificial competitors!", "But still games have their own place in each of us...", "<strong>EXAGGERATION</strong>"]
];


let page = 0;
let what = true;
let opend = false;


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





// SOME SETTINGS ==============================================================================================

let trainMax, acc, fri;
let monsterUp, monsterBase, monsterMax;
let difi, tops;


function editz(ed, p = false) {
    const pops =["Slow...🐢", "Medium...😎", "Fast...💪", "Extreme...⚡","Easy...✌️", "Medium...😎", "Hard...😈", "Extreme...☠️"];
    const data = [ [8, 2], [11, 1.7], [15, 1.3], [20, 1], [5, 1], [6, 1.2], [8, 2], [10, 3.4] ];
    let a, b;

    if (ed < 5) {
        const dt = data[ed - 1];
        trainMax = dt[0] * editx;
        acc = trainMax/25;
        fri = trainMax/35;
        tops = dt[1];
        a = "tr";
        b = "Train Speed is " + pops[ed-1];
    } else {
        [monsterBase, monsterUp] = data[ed - 1].map(x => x * editx);
        difi = ed - 5;
        monsterMax = monsterBase * 2;
        a = "mrs";
        b = "Monster Difficulty is " + pops[ed-1];
    }

    if (p) showPopup(b);
    localStorage.setItem(a + 'Edit', ed);
}





// SKIN SELECTION SETTINGS ====================================================================================

let diesel = false;
let bgChange = false;
let bgImg, trainImg, monsterImg;
let trainscale = 3;


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
        trainscale = diesel ? 3.1 : 2.6;
        train.width = train.height * trainscale;

    } else if (skin === 3) {
        monsterImg = monsterx[rank-1];

    } else {
        bgChange = true;
    }

    const d = skin === 2 ? "tr" : (skin === 3 ? "mr" : "bg");
    const allImgs = document.querySelectorAll('#' + d + 'Skin img');

    if (bed) {
        allImgs.forEach(img => {
            const src = img.getAttribute('rank');
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





// AUDIO BLOCK ================================================================================================

const gameMusic = ele("backgroundMusic");
const storyMusic = ele("videoMusic");
const sound = new Audio(`shift.mp3?v=${GAME_VERSION}`);
const treat = new Audio(`treasure.mp3?v=${GAME_VERSION}`);
let musicOn = true;
let fide;
let hide;


function fadeOutMusic(m = true) {
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


function fadeInMusic(m = true) {
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
    musicOn ? fadeInMusic() : fadeOutMusic();
    ele('musicBtn').textContent = musicOn ? "🔊" : "🔇";
}





// VIDEO BLOCK ================================================================================================

let colint;
let textint;
let currentColor = 1;
let line = 0;
let interl;
let stord = false;
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
    const bg1 = ele("bg1");
    const bg2 = ele("bg2");

    if (currentColor === 1) {
        bg2.style.background = cc;
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
        currentColor = 2;
    } else {
        bg1.style.background = cc;
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
    stord = false;
    setTimeout(() => {
        ele('nextBtn').innerText = 'NEXT';
        on('skipBtn');
    }, 800);
    fadeOutMusic(false);
    line = 0;
}


function storyyy() {
    storyMusic.currentTime = '0';
    on(2, 'storyContainer');
    stord = true;
    showLine(line);
    fadeInMusic(false);
    st.style.color = cols[flor(5)];
    coloring();

    colint = setInterval(() => coloring() , 2000);
    textint = setInterval(() => { st.style.color = cols[flor(5)] } , 7000);
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




// SCALING BLOCK ==============================================================================================

let playX = true;

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


function checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth;
    ele('rotateWarning').style.display = isPortrait ? 'flex' : 'none';
    if (!gameRunning || !playX) return;
    gamePaused = isPortrait;
    if (gamePaused) return;
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

fullx(false);





// CANVAS BLOCK ===============================================================================================

const canvas = ele("gameCanvasX");
const ctx = canvas.getContext("2d");
let resizeTimer;
let gameRunning = false;
let gamePaused = false;
let CW, CH, k, l, editx;


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
    train.height = CH * 0.17;
    train.width = train.height * trainscale;
    const a = CH * 0.42;
    const b = CH * 0.64;
    k = a - train.height;
    l = b - train.height;
    editx = ((CW > CH) ? CW : CH)/1300;
}





// TASKS BLOCK ================================================================================================

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





// SIDEBAR MENU BLOCK =========================================================================================

ele('sideBy').addEventListener("click", () => {
    setLife(false);
    ele('gameCanvasX').classList.toggle("blur");
    on(1, 'sidebar');
    on('dark');
    off('fpsx', 'envy');
    gamePaused = true;
    playX = false;
    if (musicOn) fadeOutMusic();
});


function taskResume() {
    if (isfps) on('fpsx');
    off('dark', 'sidebar');
    ele('gameCanvasX').classList.remove("blur");
    on('envy');
    gamePaused = false;
    playX = true;
    if (musicOn) fadeInMusic();
    update();
    setLife(extralife);

    if (flashing) flash();
    if (bursting) xgrBurst();
}





// RESUME - PAUSE FUNCTION ====================================================================================

function resumePause() {
    if (!gameRunning || stuck) return;

    gamePaused = !gamePaused;
    ele("pauser").textContent = gamePaused ? "⏸" : "▶";
    playX = !gamePaused;

    if (gamePaused) {
        if (musicOn) fadeOutMusic();
    } else {
        if (musicOn) fadeInMusic();
        update();

        if (flashing) flash();
        if (bursting) xgrBurst();
    }
}





// CHECKPOINT BLOCK ===========================================================================================

function saveCp() {
    const cpData = {
        rrr: run + Math.floor((reach - CW* 9 ) / (50 * editx)),
        xp: exp + epo,
        org: requirement,
        gt: gpGot,
        pt: stat.plot + 1
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
        off('reset');
    }
}





// GAME OVER BLOCK ============================================================================================

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
    const rt = ele('gameReason');

    if (rg === 1) {
        rt.innerHTML = "<h2>GAME OVER : THE TRAIN DONE COLLISION</h2>";
        q = flor(3);
    } else {
        rt.innerHTML = "<h2>GAME OVER : MONSTER DESTROYED THE TRAIN</h2>";
        q = 3 + flor(3);
    }

    ele('continueBtn').innerText = existCp() ? "Continue" : "Restart";
    on(1, 'gameOver');
}


function gEnd() {
    off('gameCanvasX', 'gameOver', 'sidebar');
    setTimeout(() => { ele('gameCanvasX').classList.remove("blur") } , 500);
    on('endu');
    setTimeout(() => on(2, 'enduBtn') , 2000);
}


function ends() {
    off('gameCanvasX', 'gameOver', 'sidebar', 'dark', 'endu', 'enduBtn');
    setTimeout(() => { ele('gameCanvasX').classList.remove("blur") } , 500);
    setTimeout(() => on(2, 'menuxBtn') , 2000);
}


function conCp() {
    off('gameOver');
    startGame();
    setTimeout(() => showPopup(query[q]) , 4500);
}





// POPUP BLOCK ================================================================================================

function showPopup(msg = "Popup!", dura = 2500) {
    const container = document.getElementById('popupContainer') || (() => {
        const div = document.createElement('div');
        div.id = 'popupContainer';
        div.style.position = 'fixed';
        div.style.top = '10vh';
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
            setTimeout(() => { popup.remove() } , 1000);
        }, dura);
    });
}





// BACKGROUND HANDLING BLOCK ==================================================================================

let ski;

function climate() {
    if (!bgChange) return;

    const available = backx.filter(bg => bg !== bgImg);
    if (available.length === 0) return;

    const demo = available[flor(available.length)];

    bgImg = demo;
    setTimeout(() => flash(3), 10);
}

setTimeout(() => { if (bgChange) climate() } , 1500);


function changer(xgr) {
    if (xgr < ski) return;
    climate();
    ski += (20000 + rand(7000)) * editx;
}


function doBg(xgr, cww, chh) {
    const bgw = bgImg.width * (chh/bgImg.height);
    const init = -xgr/4 % bgw;
    for (let x = init; x < cww; x += bgw) ctx.drawImage(bgImg, x, 0, bgw, chh);
}





// ADVANCE BLOCK ==============================================================================================

let showAdvance = false;
let advanceAF;


function doAdv() {
    if (advanceAF) return;
    let a1x = true;
    let a2x = true;
    let a3x = true;
    let a4x = true;

    function ina() {
        if (!showAdvance || !gameRunning || crash) {
            cancelAnimationFrame(advanceAF);
            advanceAF = null;
            ele('advance').style.display = 'none';

        } else {
            if (!gamePaused && !stuck) {
                a2x = true;
                if (a1x) {
                    ele('advance').style.display = "block";
                    a1x = false;
                }

                const visible = Math.floor(Date.now() / 400) % 2 === 0;

                if (visible) {
                    a4x = true;
                    if (a3x) {
                        ele('advance').style.opacity = '1';
                        a3x = false;
                    }
                } else {
                    a3x = true;
                    if (a4x) {
                        ele('advance').style.opacity = '0';
                        a4x = false;
                    }
                }

            } else {
                a1x = true;
                if (a2x) {
                    ele('advance').style.display = "none";
                    a2x = false;
                }
            }

            advanceAF = requestAnimationFrame(ina);
        }
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
            showPopup("🔥 Used ADVANCE!");
            showPopup("🔥 XP Boosted!");
            showPopup("~ Monster Slowed Down ~");
        }, 1000);
    } else {
        showPopup(`🔥 Minimum ${requirement} Graphene Needed for ADVANCE!`);
    }
}





// ELECTRIC BURST EFFECT ======================================================================================

let bursting = false;
let scaleE = 0;
let lastE = 0;
let opacityE = 1.5;

function xgrBurst(krg = 1) {
    const centerX = train.x + train.width/2;
    const centerY = (train.top ? k : l) + train.height/2;

    const imge = krg === 1 ? esburstImg : hvburstImg;

    function animate(timestamp) {
        if (!playX) return;

        let deltaT = (timestamp - lastE)/1000 * 1.2;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 0.2;
        lastE = timestamp;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(scaleE);
        ctx.globalAlpha = opacityE;

        const size = CH * 0.8 * scaleE;
        ctx.drawImage(imge, -size/2, -size/2, size, size);

        ctx.restore();

        scaleE += deltaT;
        opacityE -= deltaT;
        bursting = true;

        if (opacityE > 0) {
            requestAnimationFrame(animate);
        } else {
            bursting = false;
            scaleE = 0;
            lastE = 0;
            opacityE = 1.5;
        }
    }

    animate();
}





// FLASH EFFECT ===============================================================================================

let flashing = false;
let opacityF = 0.75;
let lastF = 0;


function flash(f = 1) {
    const var1 = CW;
    const var2 = CH;
    const reduction = 0.009;

    function flas(timestamp) {
        if (!playX) return;

        let deltaT = (timestamp - lastF)/1000 * 60;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
        lastF = timestamp;

        if (opacityF > 0) {
            flashing = true;
            ctx.fillStyle = f === 1 ? `rgba(255, 255, 255, ${opacityF})`: `rgba(0, 0, 0, ${opacityF})`;
            ctx.fillRect(0, 0, var1, var2);
            opacityF -= reduction * deltaT;

            requestAnimationFrame(flas);
        } else {
            flashing = false;
            opacityF = 0.75;
            lastF = 0;
        }
    }

    flas();
}





// SHAKE EFFECT ===============================================================================================

function shake() {
    let a = 0;
    let goat = true;
    const x = cameraX;
    const e = editx;

    function xyz() {
        cameraX = x + Math.sin(a) * 3 * e;
        a += 0.8;
        if (goat) requestAnimationFrame(xyz);
    }

    xyz();
    setTimeout(() => { goat = false } , 700);
}





// EXTRA LIFE BLOCK ===========================================================================================

let extralife = gett('lifex') ? gett('lifex') === 'true' : true;
let lifeX1, lifeY, lifeX2;

const setLife = active => active ? on('extraLife') : off('extraLife');


function lifer() {
    monsta = null;
    extralife = false;
    crash = false;
    stuck = false;
    exuping = true;
    mono = 1;
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





// SMOKE EFFECT ===============================================================================================

const smokeParticles = [];


function genSmoke(xgr) {
    const e = editx;

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
        p.opacity -= 0.007 * dt;

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





// SPARK EFFECT ===============================================================================================

const electricSparks = [];


function genSpark() {
    electricSparks.length = 0;
    electricSparks.push({
        x: train.x + train.width/2,
        y: train.top ? k : l,
        scale: (0.5 + rand(0.5)) * editx,
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





// EXPLOSION BLOCK ============================================================================================

const boom = new Audio("explode.mp3");
let mono = 1;
let exuping = true;


function doExp(chh, dt) {
    const exup = chh/110000 * dt;
    const size = chh * mono;
    const cx = train.x + train.width * 0.6 - size/2;
    const cy = (train.top ? k : l) + train.height * 0.8 - size/2;
    
    ctx.drawImage(expImg, cx, cy, size, size);
    mono += exuping ? exup : -exup * 4;
}





// FPS BLOCK ==================================================================================================

let isfps = gett('isfpsc') || true;
let frames = 0;
let lastfpx = 0;


function doFPS(dt) {
    frames++;
    const elapsed = dt - lastfpx;

    if (elapsed >= 300) {
        const fps = ((frames * 1000) / elapsed).toFixed();
        frames = 0;
        lastfpx = dt;
        ele('fpsx').innerText = "FPS: " + fps;
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





// SCORE-PROGRESS BLOCK =======================================================================================

let run = 0;
let exp = 0;
let epo = 0;
let gpgp = true;
let trackk = 0;
const runup = ele('runnerScore');


function progression(xgr, end, dt) {
    if (!challenge) return;

    if (gpgp) {
        ele("progressBar").style.width = `${(gpGot/requirement) * 100}` + "%";
        ele('score').textContent = `Graphene: ${gpGot}/${requirement}`;
        gpgp = false;
    }

    if (dt - trackk > 300) {
        trackk = dt;
        const trackWidth = ele('trackingContainer').clientWidth;
        const percent = Math.min(1, Math.max(0, xgr/end));
        ele('tracking').style.left = `${percent * trackWidth}px`;
    }

    runup.innerText = `Score: ${run + Math.floor(xgr/(50 * editx))} || XP: ${epo + exp}`;
}





// COLLECTOR BLOCK ============================================================================================

function collects() {
    if (!gameRunning || gamePaused || stuck) return;
    let collected = false;

    for (const gp of gpBlocks) {
        const screenX = gp.x - cameraX;

        if (!gp.got && screenX >= -gp.width && screenX <= CW) {
            gp.got = true;
            gp.animating = true;
            gp.alpha = 1;
            gp.dy = 0;
            gpGot++;
            collected = true;
            gpgp = true;
        }
    }

    if (!extralife) {
        const checkLife = (lifeX) => {
            const screenX = lifeX - cameraX;
            return screenX >= 0 && screenX <= CW && lifeY >= 0 && lifeY <= CH;
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





// GENERATOR BLOCK ============================================================================================

function genX() {
    ending = endx * editx;
    stat.x = ending;

    const var1 = CH/7;
    const varx = train.width + var1 + CW/30;
    const var2 = CW*6;
    const var3 = CH/10;
    const var4 = CH/14;
    const l2 = ending - CW*5;
    const ups = CW * (0.3 - difi/20);

    crystals = [];
    obstacles = [];
    gpBlocks = [];
    signData = [];

    lifeX1 = CW + flor(CW * 3.5);
    lifeX2 = l2 + CW/2 + flor(CW * 3.5);
    lifeY = 0.42 + rand(0.18);

    [CW * 1.5, ending - CW * 4].forEach(dist => {
        for (let i = 0; i < CW * 3.5; i += CH/3 + flor(CH/2)) {
            signData.push({
                x: dist + i,
                skin: flor(3)
            });
        }
    })

    for (let i = 0; i < ending/10; i++) {
        crystals.push({
            x: flor(ending + CW * 2),
            y: 0.36 + rand(0.32),
            radius: 1,
            color: cryCol[flor(cryCol.length)]
        });
    }

    for (let i = var2; i < l2; i+= varx + flor(300 * editx)) {
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
            t: topp
        });
    }

    for (let i = var2; i < l2; i += (flor(CW/4) + ups)/tops ) {
        gpBlocks.push({
            x: i,
            y: 0.42 + rand(0.18),
            width: var3,
            height: var3,
            got: false,
            animating: false,
            alpha: 1,
            dy: 0
        });
    }
}





// BILL BOARDS BLOCK ==========================================================================================

function doBoardz(x, chh, ww = 0) {
    const isChallenge = ww !== 0;
    const boardWidth = chh * (isChallenge ? 0.6 : 0.4);
    const boardHeight = chh/10;
    const boardY = chh * 0.2;

    const pilY = chh * 0.3;
    const pilWidth = chh/40;
    const pilHeight = chh/20;

    const label = isChallenge ? "Challenge Begins  >>>" : "Safe Area  >>>";

    ctx.fillStyle = "#201000";
    ctx.fillRect(x - pilWidth/2, pilY, pilWidth, pilHeight);

    ctx.fillStyle = "#111";
    ctx.fillRect(x - boardWidth/2, boardY, boardWidth, boardHeight);

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - boardWidth/2, boardY, boardWidth, boardHeight);

    ctx.save();
    ctx.translate(x, boardY + boardHeight * 0.5);
    ctx.fillStyle = "#ffcc00";
    ctx.font = `bold ${boardHeight/2}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 8, 0);
    ctx.restore();
}


let signData = [];

function doSign(xgr, chh) {
    const signY = chh * 0.20;
    const size = chh * 0.15;

    signData.forEach(s => {
        const img = offImgs[s.skin];
        const signX = s.x - xgr;
        ctx.drawImage(img, signX, signY, size, size);
    });
}





// STATION BLOCK ==============================================================================================

let endx = 50000 + flor(25000);
let ending = endx;
const stat = { x: ending , rtx: false , plot: 0 };


function doStat(xgr, cww, chh) {
    const statX = stat.x - xgr;
    const statY = chh * 0.35;
    const statE = chh * 0.3;
    const statR = chh * 0.7;

    if (xgr < cww * 1.5) {
        ctx.drawImage(statUp, -xgr - 10, 0, cww * 1.1, statY);
        ctx.drawImage(statDown, -xgr -10, statR, cww * 1.1, statE);
    }

    if (statX < cww * 1.5) {
        ctx.drawImage(statUp, statX, 0, cww * 1.1, statY);
        ctx.drawImage(statDown, statX, statR, cww * 1.1, statE);
    }
}


function doPlot(x, chh, p = 0) {
    const boardWidth = chh/10;
    const boardHeight = chh * 0.41;
    const boardY = chh * 0.32;
    const centerX = x + boardWidth/2;
    const centerY = boardY + boardHeight/2;

    ctx.fillStyle = "#111";
    ctx.fillRect(x, boardY, boardWidth, boardHeight);

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, boardY, boardWidth, boardHeight);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(Math.PI/2);
    ctx.fillStyle = "#ffcc00";
    ctx.font = `bold ${boardWidth/2}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Platform -- ${stat.plot + p}`, 0, 0);
    ctx.restore();
}





// AREA MAINTAIN FUNCTION =====================================================================================

function doArea(xgr, cww, end, chh) {
    const e = editx;
    const groundTop = chh * 0.35;
    const groundHeight = chh * 0.35;
    const trackU = chh * 0.05;
    const trackD = chh * 0.08;
    const barGap = 30 * e;
    const baseY = chh * 0.7;
    const shadowH = chh * 0.075;

    ctx.fillStyle = "#201000";
    ctx.fillRect(0, groundTop, cww, groundHeight);

    ctx.fillStyle = "#818A8B";
    for (let i = 0; i < end; i += barGap) {
        const barX = i - xgr;
        if (barX >= -30 && barX <= cww + 30) {
            const barW = 10 * e;
            const adjust = chh/100;
            ctx.fillRect(barX, groundTop + trackU - adjust, barW, trackU);
            ctx.fillRect(barX, groundTop + groundHeight - trackD - adjust, barW, trackU);
        }
    }

    ctx.fillStyle = "#000";
    for (let i = 0; i < end; i += cww / 2) {
        const screenX = i - xgr;
        const rpg = e * 10;
        if (screenX >= -60 && screenX <= cww + 60) {
            ctx.fillRect(screenX, baseY, rpg * 4, shadowH);
            ctx.fillRect(screenX - rpg, baseY + shadowH, rpg * 6, shadowH);
            ctx.fillRect(screenX - rpg * 2, baseY + shadowH * 2, rpg * 8, shadowH);
            ctx.fillRect(screenX - rpg * 3, baseY + shadowH * 3, rpg * 10, shadowH);
        }
    }

    ctx.strokeStyle = "#42220b";
    ctx.lineWidth = 5 * e;
    ctx.beginPath();

    const lineOffsets = [ groundTop + trackU , groundTop + trackD , groundTop + groundHeight - trackD , groundTop + groundHeight - trackU ];

    for (let y of lineOffsets) {
        ctx.moveTo(0, y);
        ctx.lineTo(cww, y);
    }

    ctx.stroke();
}





// TRAIN BLOCK ================================================================================================

let swich = false;
let startY = 0;
let targetY = 0;
let crash = false;
let xx = 0;


function doTrt(timez, dt) {
    if (crash) return;
    const e = editx;
    xx += 0.13 * dt;
    const baseX = train.x + Math.sin(xx) * 3 * e;
    let baseY = train.top ? k : l;

    if (swich) {
        const t = Math.min(timez/200, 1);
        baseY = startY + (targetY - startY) * t;

        if (t >= 1) {
            swich = false;
            traintime = 0;
        }

        ctx.fillStyle = "#5dade2";
        const barX = baseX - train.width/10;
        const barSpacing = 12 * e;
        const barHeight = 100 * e;

        for (let i = 0; i < train.width * 1.2; i += barSpacing) {
            ctx.fillRect(barX + i, baseY, 4 * e, barHeight);
        }
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





// ITEMS BLOCK ================================================================================================

const cryCol = ["#00f0ff", "#ff00f0", "#00ff88", "#ffee00", "#ff6600", "#df0000", "#5800df"];
let gpGot = 0;
let requirement = 50;
let crystals = [];
let obstacles = [];
let gpBlocks = [];


function doItems(xgr, cww, chh) {
    const lllPlus40 = cww + 40;
    const pi = Math.PI * 2;

    for (const dot of crystals) {
        const screenX = dot.x - xgr;
        if (screenX >= -40 && screenX <= lllPlus40) {
            ctx.beginPath();
            ctx.arc(screenX, dot.y * chh, dot.radius, 0, pi);
            ctx.fillStyle = dot.color;
            ctx.fill();
        }
    }

    for (const ob of obstacles) {
        const obhh = ob.t ? k : l;
        const screenX = ob.x - xgr;
        if (screenX > -ob.width && screenX < cww) {
            ctx.drawImage(ob.img, screenX, ob.y + obhh, ob.width, ob.height);
        }
    }

    for (const gp of gpBlocks) {
        const blockX = gp.x - xgr;
        const screenY = gp.y * chh;

        if (gp.got && gp.animating) {
            gp.alpha -= 0.03;
            gp.dy -= editx;
            if (gp.alpha <= 0) {
                gp.alpha = 0;
                gp.animating = false;
            }

            ctx.save();
            ctx.globalAlpha = gp.alpha;
            ctx.drawImage(gpImg, blockX, screenY + gp.dy, gp.width, gp.height);
            ctx.restore();
        }

        if (!gp.got && blockX > -gp.width && blockX < cww) {
            ctx.drawImage(gpImg, blockX, screenY, gp.width, gp.height);
        }
    }
}





// MONSTER BLOCK ==============================================================================================

const monsterRoar = new Audio("roarx.mp3");
let monsta = null;
let monsterCount = 0;
let monsterSpeed = 0;
let sway = 0;
let mobx = 0;


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
    sway += 0.15 * dt;
    mobx += 0.15 * dt;
    const e = editx;

    const size = train.height;
    const monsterX = monsta.x - xgr + Math.sin(sway) * 10 * e;
    const monsterY = monsta.y + Math.sin(mobx) * 5 * e;

    for (let i = 0; i < size; i += 2) {
        const color = rand(3);

        const flameColor = color < 1 ? "#ff0202ff" : (color < 2 ? "#ffe802" : "#000");

        const flameWidth = i < size/2 ? 20 + i/2 + rand(70) : 50 + (size - i)/2 + rand(70);

        ctx.fillStyle = flameColor;
        ctx.fillRect(monsterX + size/3, monsterY + i, flameWidth * e, 2 * e);
    }

    ctx.drawImage(monsterImg, monsterX, monsterY, size, size);
}





// OBSTACLE COLLISION =========================================================================================

const cpop = ["😅 OOpsie HOpsie Doo...!", "Rail Shifter Crahed 😅...!"];

function crashOb(xgr) {
    if (crash) return;

    for (let i = 0; i < obstacles.length; i++) {
        const ob = obstacles[i];
        const obSX = ob.x - xgr;

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
                if (musicOn) fadeOutMusic();
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





// MONSTER COLLISION ==========================================================================================

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
            if (musicOn) fadeOutMusic();
            gamePaused = true;
            gameRunning = false;
            reas = 2;
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





// STATION COLLISION ==========================================================================================

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





// SPEED HANDLER BLOCK ========================================================================================

let righto = false;
let lefto = false;
let pressT = false;
let cameraX = 0;
let speedX = 0;
let remind = 0;
let reach = 0;
let braver = true;
let braverr = true;
let lasting = null;
let stuck = false;


function handleSpeed(xgr, dt) {
    if (stuck) {
        speedX = 0;
        return;
    }

    if (righto) {
        remind = 0;
        speedX = Math.min(speedX + acc * dt, trainMax * dt);
        if (xgr > reach) reach = xgr;

    } else if (lefto) {
        remind = 0;

        if (xgr > 0) speedX = Math.max(speedX - acc * dt, -trainMax * dt);

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
            speedX = Math.max(0, speedX - fri * dt);
        } else if (speedX < 0) {
            speedX = Math.min(0, speedX + fri * dt);
        }
    }

    if (braverr && remind >= 2000 * dt) {
        braverr = false;
        showPopup(rand() > 0.5 ? "🔥 It's time to move ahead..." : "🔥 Let's move on Buddy...");
        setTimeout(() => { braverr = true } , 5000);
    }
}





// EVENT HANDLER BLOCK ========================================================================================

let border = 0;
let challenge = false;
let onpro = false;
let offpro = false;


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


let lasttime = 0;
let timer = 400;
let kb = 0;
let lastly = 0;
let traintime = 0;
let spawner = 20;


function hyper(timez, xgr) {
    const dt = timez - lasttime;
    const e = editx;

    if (dt > timer && !stuck) {
        const pyro = Math.min(20 * e, Math.abs(speedX));

        timer = (pyro < 4 * e) ? 500 + rand(300) : 70 + (20 - pyro/e) * 25 + rand(30);
        
        if (diesel) {
            genSmoke(xgr);
        } else {
            genSpark();
            timer *= 1.4;
        }

        lasttime = timez;
    }

    const dtt = timez - lastly;

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





// GAME LOOPS =================================================================================================

let uploop, doloop;

function update(timestamp) {
    if (gamePaused || !gameRunning) return;

    let deltaT = (timestamp - lasting)/1000 * 60;
    if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
    if (swich) traintime += deltaT * 16.7;
    lasting = timestamp;

    cameraX += speedX;
    const cww = CW;
    const chh = CH;
    const end = ending;
    const camx = cameraX;

    ctx.clearRect(0, 0, cww, chh);

    if (bgChange) changer(reach);
    hyper(timestamp, camx);
    handleSpeed(camx, deltaT);

    doBg(camx, cww, chh);
    doArea(camx, cww, end + cww * 1.7, chh);
    doItems(camx, cww, chh);
    doStat(camx, cww, chh);
    if (!extralife) doLife(camx, cww, end, chh);
    distanceHandler(end, cww);

    if (camx < cww * 7) {
        doBoardz(cww * 5.4 - camx, chh, 1);
        doSign(camx, chh);
    }

    if (camx > end - cww * 6) {
        doBoardz(end - cww * 4.4 - camx, chh);
        doSign(camx, chh);
    }

    diesel ? doSmoke(camx, deltaT) : doSparks(deltaT);

    doTrt(traintime, deltaT);
    doMrs(camx, deltaT);

    if (camx < cww * 1.7) doPlot(cww/2 - camx, chh);
    if (camx > end - cww) doPlot(stat.x + cww/2 - camx, chh, 1);

    progression(reach - cww * 4.5, end - cww * 9, timestamp);
    crashMrs(camx, deltaT);
    crashOb(camx);
    crashStat(camx);

    if (isfps) doFPS(timestamp);
    if (stuck) doExp(chh/2.5, deltaT);

    uploop = requestAnimationFrame(update);
}



let relasting = 0;
let allowed = true;
let reas;


function reUpdate(timestamp) {
    if (allowed) {
        let deltaT = (timestamp - relasting)/1000 * 60;
        if (isNaN(deltaT) || !isFinite(deltaT)) deltaT = 1;
        relasting = timestamp;

        const cww = CW;
        const chh = CH;
        const end = ending;
        const camx = cameraX;
        ctx.clearRect(0, 0, cww, chh);
        
        doBg(camx, cww, chh);
        doArea(camx, cww, end + cww * 1.7, chh);
        doItems(camx, cww, chh);
        doStat(camx, cww, chh);
        if (!extralife) doLife(camx, cww, end, chh);

        if (camx < cww * 7) {
            doBoardz(cww * 5.4 - camx, chh, 1);
            doSign(camx, chh);
        }

        if (camx > end - cww * 6) {
            doBoardz(end - cww * 4.4 - camx, chh);
            doSign(camx, chh);
        }

        doMrs(camx, deltaT);

        if (camx < cww * 1.7) doPlot(cww/2 - camx, chh);
        if (camx > end - cww) doPlot(stat.x + cww/2 - camx, chh, 1);

        doExp(chh/2.5, deltaT);

        doloop = requestAnimationFrame(reUpdate);
    } else {
        setTimeout(() => {
            gOver(reas);
            allowed = true;
        }, 250);
    }
}





// PC CONTROLS ================================================================================================

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




// MOBILE CONTROLS ============================================================================================

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





// FINAL BLOCK ================================================================================================

function startGame() {
  
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
        if (musicOn) fadeInMusic();
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

// EXAGGERATION ===============================================================================================
