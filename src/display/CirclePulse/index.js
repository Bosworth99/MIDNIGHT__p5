import DisplayItem from '../displayItem';

export default class CirclePulse extends DisplayItem {

        constructor(props = {}) {
            super(props);
            // console.log('DisplayItem.constructor', props);

            const { x, y, COLOR, MIN_RAD, MAX_RAD, VELOCITY } = props;

            this.state = {
                x: x || 100,
                y: y || 100,
                rad: this.ctx.random(MIN_RAD * .5, MAX_RAD * .5),
                COLOR,
                clr: this.ctx.color(COLOR),
                MIN_RAD: this.ctx.random(MIN_RAD - (MIN_RAD * .5), MIN_RAD + (MIN_RAD * .5)),
                MAX_RAD: this.ctx.random(MAX_RAD - (MAX_RAD * .5), MAX_RAD + (MAX_RAD * .5)),
                VELOCITY: this.ctx.random(0.5, 2),
                grow: this.ctx.random(10) > 5 ? true : false,
            }
        }

        tick() {
            const { x, y, MIN_RAD, MAX_RAD, VELOCITY }  = this.state;
            let { rad, grow } = this.state;

            rad = grow ? rad + VELOCITY : rad - VELOCITY;

            if (rad > MAX_RAD) {
                grow = false;
            };

            if (rad < MIN_RAD) {
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
            this.ctx.strokeWeight(5);
            this.ctx.stroke('black');
            this.ctx.ellipse(x, y, rad, rad);
        }

    }