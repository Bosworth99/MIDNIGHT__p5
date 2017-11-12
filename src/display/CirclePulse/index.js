import DisplayItem from '../displayItem';

export default class CirclePulse extends DisplayItem {

        constructor(props = {}) {
            super(props);
            // console.log('DisplayItem.constructor', props);

            const x = this.ctx.random(0, this.ctx.windowWidth);
            const y = this.ctx.random(0, this.ctx.windowHeight);
            const MIN = 100;
            const MAX = 300;

            this.state = {
                x: x || 100,
                y: y || 100,
                rad: this.ctx.random(MIN * .5, MAX * .5),
                clr: this.ctx.color('red'),
                MIN: this.ctx.random(MIN - (MIN * .5), MIN + (MIN * .5)),
                MAX: this.ctx.random(MAX - (MAX * .5), MAX + (MAX * .5)),
                VEL: this.ctx.random(0.5, 2),
                grow: this.ctx.random(10) > 5 ? true : false,
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
            const { x, y, rad, clr } = this.state;

            this.ctx.fill(clr);
            this.ctx.stroke('red');
            this.ctx.ellipse(x, y, rad, rad);
        }

    }