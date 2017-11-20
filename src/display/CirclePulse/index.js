import DisplayItem from '../displayItem';

export default class CirclePulse extends DisplayItem {

        constructor(props = {}) {
            super(props);
            // console.log('DisplayItem.constructor', props);

            const x = this.ctx.random(0, this.ctx.windowWidth);
            const y = this.ctx.random(0, this.ctx.windowHeight);
            const MIN = 10;
            const MAX = this.ctx.windowWidth * .20;
            const fill = props && props.colors && props.colors.fill;
            const stroke = props && props.colors && props.colors.stroke;

            const fillAlpha = `rgba(${fill.toString()}, 0.01)`;

            this.state = {
                x: x || 100,
                y: y || 100,
                rad: 0,
                fill: this.ctx.color(fillAlpha),
                stroke: this.ctx.color(stroke),
                MIN: Math.ceil(this.ctx.random(MIN - (MIN * .5), MIN + (MIN * .5))),
                MAX: Math.ceil(this.ctx.random(MAX - (MAX * .5), MAX + (MAX * .5))),
                VEL: this.ctx.random(0.5, 2),
                grow: true,
            }
        }

        tick() {
            const {MIN, MAX, VEL }  = this.state;
            let { x, y, rad, grow } = this.state;

            rad = grow ? rad + VEL : rad - VEL;

            if (rad > MAX) {
                grow = false;
            };

            if (rad < MIN) {
                grow = true;

                x = this.ctx.random(0, this.ctx.windowWidth);
                y = this.ctx.random(0, this.ctx.windowHeight);
            }

            this.setState({
                x,
                y,
                rad,
                grow,
            });
        }

        render() {
            const { x, y, rad, fill, stroke } = this.state;

            this.ctx.push();
            this.ctx.translate(x, y);
            this.ctx.fill(fill);
            this.ctx.stroke(stroke);

            this.ctx.ellipse(0, 0, rad, rad);
            this.ctx.pop();
        }

    }