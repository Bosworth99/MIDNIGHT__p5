// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';

const MIN_RAD = 150;
const MAX_RAD = 250;
const ITEM_COLOR = 'red';
const BG = 'rgba(50,50,50,.05)';
const VELOCITY = 1;

export default class Sketch extends p5 {
    
    constructor(sketch = ()=>{}, node = false, sync = false) {
        super(sketch, node, sync);
        console.log('Sketch [this:%o]', this);

        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.render = this.render.bind(this);
        this.increment = this.increment.bind(this);
        this.windowResized = this.windowResized.bind(this);
    }

    setup() {
        console.log('setup', this.windowWidth, this.windowHeight);
        this.createCanvas(this.windowWidth, this.windowHeight, p5.WEBGL);

        this.bg = this.color(BG);
        this.itemColor = this.color(ITEM_COLOR);
        this.rad = MIN_RAD;
        this.grow = true;
        this.frame = 0;
    }

    draw() {
        this.increment();
        this.render();
    }

    render() {
        let x = this.windowWidth / 2;
        let y = this.windowHeight / 2;

        this.background(this.bg);
        this.fill(this.itemColor);
        this.stroke(this.itemColor);
        this.ellipse(x, y, this.rad, this.rad);
    }

    increment() {
        this.rad = this.grow ? this.rad + VELOCITY : this.rad - VELOCITY;

        if (this.rad > MAX_RAD) {
            this.grow = false;
        };

        if (this.rad < MIN_RAD) {
            this.grow = true;
        }

        this.frame++;
    }

    // EVENTS

    windowResized() {
        console.log('windowResized', this.windowWidth, this.windowHeight);
        this.resizeCanvas(this.windowWidth, this.windowHeight);
    }
}
