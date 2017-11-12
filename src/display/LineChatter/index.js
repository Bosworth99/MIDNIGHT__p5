import DisplayItem from '../displayItem';

export default class LineChatter extends DisplayItem {

    constructor(props = {}) {
        super(props);

        const x = this.ctx.random(0, this.ctx.windowWidth);
        const y = this.ctx.random(0, this.ctx.windowHeight);

        this.state = {
            x1: x,
            y1: y,
            x2: x,
            y2: y,
            clr: this.ctx.color('red'),
            weight: this.ctx.random(1, 10),
            MAX: this.ctx.random(100, 1000),
            VEL: this.ctx.random(0.1, 1),
            grow: this.ctx.random(0, 10) > 5 ? true : false,
            rot: 1,
        }
    }

    tick() {
        const { VEL, MIN, MAX } = this.state;
        let { x1, y1, x2, y2, grow, rot } = this.state;
        
        const distance = this.ctx.dist( x1, y1, x2, y2 );

        if (grow) {
            x2 = x2 + VEL;
            y2 = y2 + VEL;
            rot = rot + VEL;

            if (distance > MAX) {
                grow = false;
            }

        } else {
            x2 = x2 - VEL;
            y2 = y2 - VEL;
            rot = rot - VEL;

            if (distance > MAX ) {
                grow = true;
            }
        }

        this.setState({
            x1, y1, x2, y2, grow, rot,
        });
    }

    render() {
        const { x1, x2, y1, y2, clr, weight, rot } = this.state;
        this.ctx.push();
        this.ctx.stroke(clr);
        this.ctx.strokeWeight(weight);
        this.ctx.line(x1, y1, x2, y2);
        // this.ctx.rotate(rot*10);
        this.ctx.pop();
    }

}