// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';
import DisplayList from '../display/displayList';
import { Background, getSeed as getBackgroundSeed } from '../display/Background';
import Circle from '../display/CirclePulse';
import Line from '../display/LineChatter';

import { COLORS, LIST as CLIST } from '../config/colors';

const DISPLAY_UPDATE_INTERVAL = 10000;
const COLOR_UPDATE_INTERVAL = 20000; 

export default class Iorte extends p5 {

    constructor(sketch = ()=>{}, node = false, sync = false) {
        super(sketch, node, sync);

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

        this.colorList = null;
        this.flColor = null;
        this.skColor = null;

        this.state = {
            frame: 0,
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    setup() {
        this.createCanvas(this.windowWidth, this.windowHeight, p5.WEBGL);
        this.updateColorList()
        this.initializeDisplayList();
    }

    initializeDisplayList() {
        this.destroy();
        this.populateDisplayList();
        this.setColorInterval();
        this.setUpdateInterval();
    }

    populateDisplayList() {
        const config = this.getConfig();
        this.displayList.register(new Background(config));

        const count = this.random(250, 750);
        const density = this.random(2, 5);

        for (let i = 0; i < count; i++) {

            const ran = this.random(0,100);
            let DisplayItem;

            if (ran < density) {
                DisplayItem = Circle;
            } else {
                DisplayItem = Line;
            }

            this.displayList.register(new DisplayItem(config));
        }
    }

    getConfig() {
        const config = {
            context: this.context,
            colors: {
                list: this.colorList,
                stroke: this.skColor,
                fill: this.flColor,
            },
        }
        return config;
    }

    updateColorList() {
        const type = CLIST[Math.floor(this.random(0, CLIST.length))];
        this.colorList = COLORS[type];
        this.skColor = this.colorList[Math.floor(this.random(0, this.colorList.length))];
        this.flColor = this.colorList[Math.floor(this.random(0, this.colorList.length))];
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

    setColorInterval() {
        if (this.colorInterval) {
            window.clearInterval(this.colorInterval);
        }

        this.colorInterval = window.setInterval(() => {
            this.updateColorList();
        }, COLOR_UPDATE_INTERVAL);      
    }

    setUpdateInterval() {
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
        }

        this.updateTimer = window.setInterval(() => {
            this.initializeDisplayList();
        }, DISPLAY_UPDATE_INTERVAL);
    }

    mousePressed() {
        console.log('mousePressed');
        this.initializeDisplayList();
        this.updateColorList();
    }
}
