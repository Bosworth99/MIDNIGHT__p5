// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';
import DisplayList from '../display/displayList';
import Background from '../display/Background';
import Circle from '../display/CirclePulse';
import Line from '../display/LineChatter';

import COLORS from '../config/colors';

const FILLS = COLORS.SWANS;
const STROKES = COLORS.GREEN_NEUTRAL;
const COUNT = 700;

export default class Iorte extends p5 {

    constructor(sketch = ()=>{}, node = false, sync = false) {
        super(sketch, node, sync);
        console.log('Iorte.constructor [this:%o]', this, FILLS);

        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
        this.setState = this.setState.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.initializeDisplayList = this.initializeDisplayList.bind(this);
        this.populateDisplayList = this.populateDisplayList.bind(this);

        this.context = this;
        this.resizeTimer = null;
        this.updateTimer = null;
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

        const config = this.getConfig();
        this.displayList.register(new Background(config));

        for (let i = 0; i < COUNT; i++) {

            const ran = this.random(0,100);
            let DisplayItem;

            if (ran < 3) {
                DisplayItem = Circle;
            } else {
                DisplayItem = Line;
            }

            this.displayList.register(new DisplayItem(config));
        }
    }

    getConfig() {

        const idx = Math.floor(this.random(0, FILLS.length));
        const stroke = STROKES[idx];
        const fill = FILLS[idx];

        const config = {
            context: this.context,
            colors: {
                background: COLORS.MARKET_PLACE,
                stroke,
                fill,
            },
        }

        return config;
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

        if (this.resizeTimer) {
            window.clearTimeout(this.resizeTimer);
        }

        this.resizeTimer = window.setTimeout(() => {
            this.initializeDisplayList();
        }, 250);
    }

    setInterval() {
        if (this.updateTimer) {
            window.clearTimeout(this.updateTimer);
        }

        this.updateTimer = window.setInterval(
            this.initializeDisplayList,
            20000,
        )
    }

    mousePressed() {
        console.log('mousePressed');
        this.initializeDisplayList();
    }
}
