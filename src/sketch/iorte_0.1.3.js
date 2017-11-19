// https://jsfiddle.net/jacobjoaquin/hdxvLwbk/

import p5 from 'p5';
import DisplayList from '../display/displayList';
import Background from '../display/Background';
import Circle from '../display/CirclePulse';
import Line from '../display/LineChatter';

import COLORS from '../config/colors';

const BG = COLORS.SUNSET;
const FILLS = COLORS.MARKET_PLACE;
const STROKES = COLORS.GREEN_NEUTRAL;
const COUNT = 100;

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
        this.drawLayer = this.drawLayer.bind(this);

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

        this.angleMode(this.RADIANS); 
        this.createCanvas(this.windowWidth, this.windowHeight, p5.WEBGL);
        this.initializeDisplayList();

        window.setInterval(
            this.initializeDisplayList,
            10000,
        )
    }

    initializeDisplayList() {
        this.destroy();
        this.populateDisplayList();
    }

    populateDisplayList() {
        console.log('Iorte.populateDisplayList');

        const config = this.getConfig();
        this.displayList.register(new Background(config));

        const multiplier = 0.2;
        const layers = [
            {
                Item: Line,
                count: COUNT - (COUNT * multiplier),
                config
            },
            {
                Item: Circle,
                count: COUNT * multiplier,
                config,
            }
        ]

        layers.forEach((layer) => this.drawLayer(layer));
    }

    drawLayer(layer = {}) {
        // console.log('drawLayer [layer:%o]', layer);
        const { Item, count, config } = layer;

        [...Array(count)].forEach((v, i) => {
            this.displayList.register(new Item(config));
        });
    }

    getConfig() {
        const idx = Math.floor(this.random(0, FILLS.length));
        const stroke = STROKES[idx];
        const fill = FILLS[idx];

        const config = {
            context: this.context,
            colors: {
                background: BG,
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
