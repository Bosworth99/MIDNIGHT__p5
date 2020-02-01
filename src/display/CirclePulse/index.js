import DisplayItem from '../displayItem';

export default class CirclePulse extends DisplayItem {

    constructor(props = {}) {
        super(props);
        // console.log('DisplayItem.constructor', props);

        const x = this.ctx.random(0, this.ctx.windowWidth);
        const y = this.ctx.random(0, this.ctx.windowHeight);
        const MIN = this.ctx.windowWidth * .05;
        const MAX = this.ctx.windowWidth * .2;
        const fill = props && props.colors && props.colors.fill;
        const stroke = props && props.colors && props.colors.stroke;

        this.state = {
            x: x || 100,
            y: y || 100,
            rad: this.ctx.random(0,10) > 5 ? MIN : MAX,
            rad2: this.ctx.random(MIN,MAX),
            rot: 0,
            fill: this.ctx.color([...fill, this.ctx.random(0, 10)]),
            stroke: this.ctx.color(stroke),
            MIN: this.ctx.random(MIN - (MIN * .5), MIN + (MIN * .5)),
            MAX: this.ctx.random(MAX - (MAX * .5), MAX + (MAX * .5)),
            VEL: this.ctx.random(0.1, 1),
            grow: true,
        }
    }

    tick() {
        const { x, y, MIN, MAX, VEL }  = this.state;
        let { rad, rad2, grow, rot } = this.state;

        rad = grow ? rad + VEL : rad - VEL;
        rad2 = grow ? rad2 + VEL : rad2 - VEL;

        if (rad > MAX) {
            grow = false;
        };

        if (rad < MIN) {
            grow = true;
        }

        rot = (Math.PI * 20);

        this.setState({
            rad,
            rad2,
            grow,
            rot,
        });
    }

    render() {
        const { x, y, rad, rad2, rot, fill, stroke } = this.state;

        const divisor = this.ctx.random(0,10);

        this.ctx.push();
        this.ctx.fill(fill);
        this.ctx.stroke(stroke);
        this.ctx.ellipse(x, y, rad, rad);
        this.ctx.ellipse(x, y, rad2, rad2);
        this.ctx.rotate(rot);
        this.ctx.pop();
    }

}