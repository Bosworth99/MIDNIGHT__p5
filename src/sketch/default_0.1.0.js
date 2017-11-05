// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';

const MIN_RAD = 150;
const MAX_RAD = 250;
const ITEM_COLOR = 'red';
const BG = 'rgba(50,50,50,.01)';
const VELOCITY = 1;

export default class Sketch extends p5 {
    
    constructor() {
        super();
        console.log('Sketch');

        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.render = this.render.bind(this);
        this.increment = this.increment.bind(this);
        this.windowResized = this.windowResized.bind(this);

        window.addEventListener('resize', this.windowResized);

        this.setup();
    }

    setup() {
        console.log('setup', windowWidth, windowHeight);
        createCanvas(windowHeight, windowWidth);

        this.bg = color(BG);
        this.itemColor = color(ITEM_COLOR);
        this.rad = MIN_RAD;
        this.grow = true;
        this.frame = 0;
    }

    draw() {
        this.increment();
        this.render();
    }

    render() {
        if (this.frame === 1) {
            window.dispatchEvent(new Event('resize'));
        }

        let x = windowWidth / 2;
        let y = windowHeight / 2;

        background(this.bg);
        fill(this.itemColor);
        line(this.itemColor);
        ellipse(x, y, this.rad, this.rad);
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
        console.log('frame: %s, rad: %s', this.frame, this.rad);
    }

    // EVENTS

    windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }
}
