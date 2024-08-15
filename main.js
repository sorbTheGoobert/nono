const nono = document.getElementById("nono");
const ctx = nono.getContext("2d");
const keys = {
    key1: "KeyQ",
    key2: "KeyW",
    key3: "KeyO",
    key4: "KeyP",
}
let timer = 0;
let loop;
let hit = 0;
let miss = 0;
let resArr = [];

//audio (what have i done)
const missSFX = new Audio("./assets/HOLYCRAPV1.wav");
const hitSFX = new Audio("./assets/happyv1wow.wav");
const beat = new Audio("./assets/hollup.wav");
let turnedOffSFX = true

class Lanes {
    constructor(lane) {
        this.lane = lane;
        this.xPos = lane * 100 - 50;
    }
    draw = () => {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(this.xPos, 0);
        ctx.lineTo(this.xPos, 800);
        ctx.stroke();
    }
}

class NoNos {
    constructor(lane) {
        this.lane = lane;
        this.xPos = lane * 100 - 50;
        this.radius = 30;
        this.yPos = 800 - 830;
    }
    draw = () => {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 1;
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    }
    update = () => {
        this.yPos += 7;
        // console.log(this);
        // console.log(this.yPos);
        // console.log(this.index)
        const index = findNoNo();
        if(index !== null){
            let temp = index
            while (temp > 0) {
                resArr.push(nonos.shift());
                temp--;
            }
            nonos.shift();
            while (resArr.length > 0) {
                nonos.unshift(resArr.pop());
            }
            miss++;
            if(!turnedOffSFX){
                missSFX.play();
            }
        }
    }
}

const player = {
    bind: {
        key1: false,
        key2: false,
        key3: false,
        key4: false,
        key1hold: false,
        key2hold: false,
        key3hold: false,
        key4hold: false,
    },
    radius: 30,
    highlight: {
        key1: "rgb(000, 100, 255)",
        key2: "rgb(000, 255, 255)",
        key3: "rgb(000, 255, 255)",
        key4: "rgb(000, 100, 255)",
    },
    check: () => {
        if (player.bind.key1) {
            for (let i = 0; i < nonos.length; i++) {
                if (nonos[i].lane == 1) {
                    if (
                        nonos[i].yPos + nonos[i].radius >= 800 - 50 - player.radius &&
                        nonos[i].yPos - nonos[i].radius <= 800 - 50 + player.radius
                    ) {
                        let temp = i
                        while (temp > 0) {
                            resArr.push(nonos.shift());
                            temp--;
                        }
                        nonos.shift();
                        while (resArr.length > 0) {
                            nonos.unshift(resArr.pop());
                        }
                        hit++;
                        if(!turnedOffSFX){
                            hitSFX.play();
                        }
                        break;
                    }
                }
            }
        }
        if (player.bind.key2) {
            for (let i = 0; i < nonos.length; i++) {
                if (nonos[i].lane == 2) {
                    if (
                        nonos[i].yPos + nonos[i].radius >= 800 - 50 - player.radius &&
                        nonos[i].yPos - nonos[i].radius <= 800 - 50 + player.radius
                    ) {
                        let temp = i
                        while (temp > 0) {
                            resArr.push(nonos.shift());
                            temp--;
                        }
                        nonos.shift();
                        while (resArr.length > 0) {
                            nonos.unshift(resArr.pop());
                        }
                        hit++;
                        if(!turnedOffSFX){
                            hitSFX.play();
                        }
                        break;
                    }
                }
            }
        }
        if (player.bind.key3) {
            for (let i = 0; i < nonos.length; i++) {
                if (nonos[i].lane == 3) {
                    if (
                        nonos[i].yPos + nonos[i].radius >= 800 - 50 - player.radius &&
                        nonos[i].yPos - nonos[i].radius <= 800 - 50 + player.radius
                    ) {
                        let temp = i
                        while (temp > 0) {
                            resArr.push(nonos.shift());
                            temp--;
                        }
                        nonos.shift();
                        while (resArr.length > 0) {
                            nonos.unshift(resArr.pop());
                        }
                        hit++;
                        if(!turnedOffSFX){
                            hitSFX.play();
                        }
                        break;
                    }
                }
            }
        }
        if (player.bind.key4) {
            for (let i = 0; i < nonos.length; i++) {
                if (nonos[i].lane == 4) {
                    if (
                        nonos[i].yPos + nonos[i].radius >= 800 - 50 - player.radius &&
                        nonos[i].yPos - nonos[i].radius <= 800 - 50 + player.radius
                    ) {
                        let temp = i
                        while (temp > 0) {
                            resArr.push(nonos.shift());
                            temp--;
                        }
                        nonos.shift();
                        while (resArr.length > 0) {
                            nonos.unshift(resArr.pop());
                        }
                        hit++;
                        if(!turnedOffSFX){
                            hitSFX.play();
                        }
                        break;
                    }
                }
            }
        }
    }
    ,
    draw: () => {
        ctx.beginPath();
        if (player.bind.key1hold) {
            ctx.fillStyle = player.highlight.key1
        } else {
            ctx.fillStyle = "white"
        }
        ctx.strokeStyle = "black"
        ctx.arc(50, 800 - 50, player.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
        ctx.beginPath();
        if (player.bind.key2hold) {
            ctx.fillStyle = player.highlight.key2
        } else {
            ctx.fillStyle = "white"
        }
        ctx.strokeStyle = "black"
        ctx.arc(150, 800 - 50, player.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
        ctx.beginPath();
        if (player.bind.key3hold) {
            ctx.fillStyle = player.highlight.key3
        } else {
            ctx.fillStyle = "white"
        }
        ctx.strokeStyle = "black"
        ctx.arc(250, 800 - 50, player.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
        ctx.beginPath();
        if (player.bind.key4hold) {
            ctx.fillStyle = player.highlight.key4
        } else {
            ctx.fillStyle = "white"
        }
        ctx.strokeStyle = "black"
        ctx.arc(350, 800 - 50, player.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    }
}

window.addEventListener("keypress", (event) => {
    switch (event.code) {
        case keys.key1:
            player.bind.key1 = true
            break;
        case keys.key2:
            player.bind.key2 = true
            break;
        case keys.key3:
            player.bind.key3 = true
            break;
        case keys.key4:
            player.bind.key4 = true
            break;
    }
})
window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case keys.key1:
            player.bind.key1hold = true
            break;
        case keys.key2:
            player.bind.key2hold = true
            break;
        case keys.key3:
            player.bind.key3hold = true
            break;
        case keys.key4:
            player.bind.key4hold = true
            break;
    }
})
window.addEventListener("keyup", (event) => {
    switch (event.code) {
        case keys.key1:
            player.bind.key1hold = false
            break;
        case keys.key2:
            player.bind.key2hold = false
            break;
        case keys.key3:
            player.bind.key3hold = false
            break;
        case keys.key4:
            player.bind.key4hold = false
            break;
    }
})

const lanes = [
    new Lanes(1),
    new Lanes(2),
    new Lanes(3),
    new Lanes(4),
]

const nonos = [
]

function findNoNo() {
    for(let i = 0; i < nonos.length; i++){
        if(nonos[i].yPos - nonos[i].radius >= 800) {
            return i;
        }
    }
    return null;
}

function randomLane() {
    const random = Math.random();
    if (random < 0.25) return 1;
    else if (random < 0.5) return 2;
    else if (random < 0.75) return 3;
    else if (random <= 1) return 4;
}


function init() {
    for (i = 0; i < lanes.length; i++) {
        lanes[i].draw();
    }
    for (i = 0; i < nonos.length; i++) {
        nonos[i].draw();
    }
    player.draw();
    loop = setInterval(update, 1000 / 60);
}

function update() {
    ctx.clearRect(0, 0, 400, 800)
    for (let i = 0; i < lanes.length; i++) {
        lanes[i].draw();
    }
    for (let i = 0; i < nonos.length; i++) {
        nonos[i].update();
        nonos[i].draw();
    }
    player.check();
    player.draw();
    player.bind.key1 = false;
    player.bind.key2 = false;
    player.bind.key3 = false;
    player.bind.key4 = false;
    if (timer % (60 * 0.2) === 0) {
        nonos.push(new NoNos(randomLane()));
        if(!turnedOffSFX){
            beat.play();
        }
    }
    timer++;
    ctx.font = "24px Arial"
    ctx.fillStyle = "red";
    ctx.fillText(hit + " hit", 10, 30);
    ctx.fillText(miss + " missed", 10, 80);
    // ctx.fillStyle = "red"
    // ctx.fillRect(0, 700, 100, 100);
}

window.onload = init();