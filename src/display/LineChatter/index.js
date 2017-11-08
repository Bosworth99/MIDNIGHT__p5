import DisplayItem from '../displayItem';

export default class LineChatter extends DisplayItem {

    constructor(props = {}) {
        super(props);

        const { x, y } = props;

        this.state = {
            x1: x,
            y1: y,
            x2: x,
            y2: y,
            clr: this.ctx.color('red'),
            LEN: this.ctx.random(20, 300),
            VEL: this.ctx.random(0.1, 1),
            grow: this.ctx.random(0, 10) > 5 ? true : false,
            rot: 0.1,
        }
    }

    tick() {
        const { x1, y1, VEL, LEN } = this.state;
        let { x2, y2, grow, rot } = this.state;

        if (grow) {
            x2 = x2 + VEL;
            y2 = y2 + VEL;
            rot = this.ctx.radians(rot + VEL);
        } else {
            x2 = x2 - VEL;
            y2 = y2 - VEL;
            rot = this.ctx.radians(rot - VEL);
        }

        const distance = this.ctx.dist( x1, y1, x2, y2 );

        if (distance > LEN) {
            grow = false;
        } else if (distance < 10 ) {
            grow = true;
        }

        this.setState({
            x2, y2, grow, rot,
        });
    }

    render() {
        const { x1, x2, y1, y2, clr, rot } = this.state;
        this.ctx.push();
        this.ctx.stroke(clr);
        this.ctx.line(x1, y1, x2, y2);
        this.ctx.rotate(rot)
        this.ctx.pop();
    }

}