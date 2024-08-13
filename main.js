const nono = document.getElementById("nono");
const ctx = nono.getContext("2d");
let timer = 0;
let miss = 0;
let score = 0;
const visible = [];
const laneColors = [
    "rgba(0, 0, 255, 0.7)",
    "rgba(100, 100, 255, 0.7)",
    "rgba(100, 100, 255, 0.7)",
    "rgba(0, 0, 255, 0.7)",
]
const lane = [
    [],
    [],
    [],
    [],
]
const speed = 10;

class NonoBonker {
    constructor(lane, key, highlightColor) {
        this.lane = lane;
        this.xPos = (lane - 1) * 100 + 50;
        this.yPos = 800 - 50;
        this.radius = 30;
        this.bind = key;
        this.pressing = false;
        this.highlightColor = highlightColor;
    }
    check = () => {
        console.log([...visible]);
        console.log(lane[this.lane - 1][0]);
        if (this.pressing) {
            if (visible.includes(lane[this.lane - 1][0])) {
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 100) {
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 100 && Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 50) {
                    miss++;
                    console.log("miss")
                    score -= 500;
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 50 && Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 40) {
                    score += 100;
                    visible.splice(0, 1);
                    lane[this.lane - 1].splice(0, 1);
                    lane[this.lane - 1][0].gone = true;
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 40 && Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 30) {
                    score += 200;
                    visible.splice(0, 1);
                    lane[this.lane - 1].splice(0, 1);
                    lane[this.lane - 1][0].gone = true;
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 30 && Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 20) {
                    score += 300;
                    visible.splice(0, 1);
                    lane[this.lane - 1].splice(0, 1);
                    lane[this.lane - 1][0].gone = true;
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 20 && Math.abs(lane[this.lane - 1][0].yPos - this.yPos) > 10) {
                    score += 500;
                    visible.splice(0, 1);
                    lane[this.lane - 1].splice(0, 1);
                    lane[this.lane - 1][0].gone = true;
                    return null
                }
                if (Math.abs(lane[this.lane - 1][0].yPos - this.yPos) <= 10) {
                    score += 1000;
                    visible.splice(0, 1);
                    lane[this.lane - 1].splice(0, 1);
                    lane[this.lane - 1][0].gone = true;
                    return null
                }
            }
        }
    }
    draw = () => {
        // draw bonkers
        ctx.beginPath();
        if (this.pressing) {
            ctx.fillStyle = this.highlightColor;
            ctx.strokeStyle = this.highlightColor;
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.strokeStyle = "black";
        }
        ctx.lineWidth = 1;
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        // draw lines
        ctx.beginPath();
        ctx.strokeStyle = "grey"
        ctx.moveTo(this.xPos, this.yPos - this.radius);
        ctx.lineTo(this.xPos, 0);
        ctx.moveTo(this.xPos, this.yPos + this.radius);
        ctx.lineTo(this.xPos, 800);
        ctx.stroke();
    }
}

class Nono {
    // constructor(lane, sec, hold) {
    constructor(lane, sec) {
        this.lane = lane;
        this.yPos = 800 - 50 - (sec * 60 * speed)
        this.xPos = (lane - 1) * 100 + 50
        this.radius = 30
        // this.holdPos = 800 - 50 - (sec * 60 * speed) - (hold * 60 * speed)
        this.gone = false;
    }
    update = () => {
        if (this.gone) {
            this.yPos = 1200
            return null;
        }
        // if (this.holdPos - this.radius > 800) {
        if (this.yPos - this.radius > 800) {
            miss++;
            visible.splice(0, 1);
            lane[this.lane - 1].splice(0, 1);
            console.log("miss")
            this.gone = true;
        }
        this.yPos += speed
        // this.holdPos += speed
    }
    draw = () => {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        // ctx.beginPath();
        // ctx.lineWidth = 1;
        // ctx.arc(this.xPos, this.holdPos, this.radius, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.lineWidth = 1;
        // ctx.moveTo(this.xPos - this.radius, this.yPos);
        // ctx.lineTo(this.xPos - this.radius, this.holdPos);
        // ctx.moveTo(this.xPos + this.radius, this.yPos);
        // ctx.lineTo(this.xPos + this.radius, this.holdPos);
        // ctx.stroke();
    }
}

const nonoBonkers = [
    new NonoBonker(1, "KeyQ", laneColors[0]),
    new NonoBonker(2, "KeyW", laneColors[1]),
    new NonoBonker(3, "KeyO", laneColors[2]),
    new NonoBonker(4, "KeyP", laneColors[3]),
];

const nonos = [
    // first section
    new Nono(1, 1),//, 1),
    new Nono(2, 1),//0.5),
    new Nono(3, 1),//0.5),
    new Nono(2, 1.5),//0.5),
    new Nono(3, 1.5),//0.5),
    new Nono(4, 1),//, 1),

    // second section
    new Nono(1, 3),//, 0),
    new Nono(2, 3.1),//, 0),
    new Nono(3, 3.2),//, 0),
    new Nono(4, 3.3),//, 0),
    new Nono(3, 3.4),//, 0),
    new Nono(2, 3.5),//, 0),
    new Nono(1, 3 + 0.6),//, 0),
    new Nono(2, 3.1 + 0.6),//, 0),
    new Nono(3, 3.2 + 0.6),//, 0),
    new Nono(4, 3.3 + 0.6),//, 0),
    new Nono(3, 3.4 + 0.6),//, 0),
    new Nono(2, 3.5 + 0.6),//, 0),
    new Nono(1, 3 + 1.2),//, 0),
    new Nono(2, 3.1 + 1.2),//, 0),
    new Nono(3, 3.2 + 1.2),//, 0),
    new Nono(4, 3.3 + 1.2),//, 0),
    new Nono(3, 3.4 + 1.2),//, 0),
    new Nono(2, 3.5 + 1.2),//, 0),
    new Nono(1, 3 + 1.8),//, 0),
    new Nono(2, 3.1 + 1.8),//, 0),
    new Nono(3, 3.2 + 1.8),//, 0),
    new Nono(4, 3.3 + 1.8),//, 0),
    new Nono(3, 3.4 + 1.8),//, 0),
    new Nono(2, 3.5 + 1.8),//, 0),
    new Nono(1, 3 + 2.4),//, 0),
]

window.addEventListener("keydown", (event) => {
    for (i = 0; i < nonoBonkers.length; i++) {
        if (event.code == nonoBonkers[i].bind) {
            nonoBonkers[i].pressing = true;
        }
    }
})
window.addEventListener("keyup", (event) => {
    for (i = 0; i < nonoBonkers.length; i++) {
        if (event.code == nonoBonkers[i].bind) {
            nonoBonkers[i].pressing = false;
        }
    }
})

function init() {
    for (let i = 0; i < nonoBonkers.length; i++) {
        nonoBonkers[i].draw();
    }
    for (let i = 0; i < nonos.length; i++) {
        nonos[i].draw();
        lane[nonos[i].lane - 1].push(nonos[i]);
    }
    setInterval(requestAnimationFrame, 1000 / 60, update)
}

function update() {
    ctx.clearRect(0, 0, 400, 800);
    for (let i = 0; i < nonoBonkers.length; i++) {
        nonoBonkers[i].draw();
        nonoBonkers[i].check();
    }
    for (let i = 0; i < nonos.length; i++) {
        nonos[i].update();
        if (nonos[i].yPos <= 800 && nonos[i].yPos >= 0 && !visible.includes(nonos[i])) {
            visible.push(nonos[i]);
        }
        nonos[i].draw();
    }
    timer++;
    ctx.fillStyle = "red"
}

window.onload = init();