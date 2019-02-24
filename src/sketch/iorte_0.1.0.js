// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';
import DisplayList from '../display/displayList';
import DisplayItem from '../display/CirclePulse';

const COUNT = 25;
const MIN_RAD = 100;
const MAX_RAD = 300;
const COLOR = 'red';
const BG = 'rgba(50,50,50,.05)';
const VELOCITY = 1;

export default class Iorte extends p5 {

    constructor(sketch = ()=>{}, node = false, sync = false) {
        super(sketch, node, sync);
        console.log('Iorte.constructor [this:%o]', this);

        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.setState = this.setState.bind(this);
        this.initializeDisplayList = this.initializeDisplayList.bind(this);
        this.populateDisplayList = this.populateDisplayList.bind(this);

        this.context = this;
        this.clearTimer = null;
        this.displayList = new DisplayList();

        this.state = {
            frame: 0,
        }
    }

    setState = (newState) => {
        this.state = { ...this.state, ...newState };
    }

    setup = () => {
        console.log('Iorte.setup', this.windowWidth, this.windowHeight);
        this.createCanvas(this.windowWidth, this.windowHeight, p5.WEBGL);
        this.initializeDisplayList();
    }

    initializeDisplayList = () => {
        this.destroy();
        this.populateDisplayList();

        this.setState({
            frame: 0,
        })
    }

    populateDisplayList = () => {
        console.log('Iorte.populateDisplayList');

        for (let i = 0; i < COUNT; i++) {

            const config = {
                context: this.context,
                x: this.random(0, this.windowWidth),
                y: this.random(0, this.windowHeight),
                COLOR,
                MIN_RAD,
                MAX_RAD,
                VELOCITY,
            }

            this.displayList.register(new DisplayItem(config));
        }
    }

    draw = () => {
        const { frame } = this.state;
        // console.log('Iorte.draw [frame:%o]', frame);

        this.tick();
        this.render();
    }

    tick = () => {
        let { frame } = this.state;

        this.displayList.tick();
        frame++;

        this.setState({
            frame,
        })
    }

    render = () => {
        this.background(BG)
        this.displayList.render();
    }

    destroy = () => {
        this.displayList.destroy();
    }

    // EVENTS

    windowResized = () => {
        console.log('windowResized', this.windowWidth, this.windowHeight);
        this.resizeCanvas(this.windowWidth, this.windowHeight);

        if (this.clearTimer) {
            window.clearTimeout(this.clearTimer);
        }

        this.clearTimer = window.setTimeout(() => {
            this.initializeDisplayList();
        }, 250);
    }

    mousePressed = () => {
        console.log('mousePressed');
        this.initializeDisplayList();
    }
}
