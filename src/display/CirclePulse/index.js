import DisplayItem from '../displayItem';

export default class CirclePulse extends DisplayItem {

    constructor(props = {}) {
        super(props);
        // console.log('DisplayItem.constructor', props);

        const x = this.ctx.random(0, this.ctx.windowWidth);
        const y = this.ctx.random(0, this.ctx.windowHeight);
        const MIN = 10;
        const MAX = this.ctx.windowWidth * .15;
        const fill = props && props.colors && props.colors.fill;
        const stroke = props && props.colors && props.colors.stroke;

        this.state = {
            x: x || 100,
            y: y || 100,
            rad: 0,
            fill: this.ctx.color(fill),
            stroke: this.ctx.color(stroke),
            MIN: this.ctx.random(MIN - (MIN * .5), MIN + (MIN * .5)),
            MAX: this.ctx.random(MAX - (MAX * .5), MAX + (MAX * .5)),
            VEL: this.ctx.random(0.5, 2),
            grow: true,
        }
    }

    tick() {
        const { x, y, MIN, MAX, VEL }  = this.state;
        let { rad, grow } = this.state;

        rad = grow ? rad + VEL : rad - VEL;

        if (rad > MAX) {
            grow = false;
        };

        if (rad < MIN) {
            grow = true;
        }

        this.setState({
            rad,
            grow,
        });
    }

    render() {
        const { x, y, rad, fill, stroke } = this.state;

        this.ctx.fill(fill);
        this.ctx.stroke(stroke);
        this.ctx.ellipse(x, y, rad, rad);
    }

}