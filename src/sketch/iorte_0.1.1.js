// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';
import DisplayList from '../display/displayList';
import Background from '../components/Background';
import Circle from '../components/CirclePulse';
import Line from '../components/LineChatter';

const COUNT = 1;

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

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    setup() {
        console.log('Iorte.setup', this.windowWidth, this.windowHeight);
        this.createCanvas(this.windowWidth, this.windowHeight, p5.WEBGL);
        this.initializeDisplayList();
    }

    initializeDisplayList() {
        this.destroy();
        this.populateDisplayList();
    }

    populateDisplayList() {
        console.log('Iorte.populateDisplayList');

        const config = {
            context: this.context,
        }

        this.displayList.register(new Background(config));

        for (let i = 1; i < COUNT; i++) {

            const ran = this.random(0,100);
            let DisplayItem;

            if (ran < 5) {
                DisplayItem = Circle;
            } else if (ran < 100) {
                DisplayItem = Line;
            }

            this.displayList.register(new DisplayItem(config));
        }
    }

    draw() {
        this.tick();
        this.render();
    }

    tick() {
        this.displayList.tick();
    }

    render() {
        this.displayList.render();
    }

    destroy() {
        this.displayList.destroy();
    }

    // EVENTS

    windowResized() {
        console.log('windowResized', this.windowWidth, this.windowHeight);
        this.resizeCanvas(this.windowWidth, this.windowHeight);

        if (this.clearTimer) {
            window.clearTimeout(this.clearTimer);
        }

        this.clearTimer = window.setTimeout(() => {
            this.initializeDisplayList();
        }, 250);
    }

    mousePressed() {
        console.log('mousePressed');
        this.initializeDisplayList();
    }
}
