import DisplayItem from '../displayItem';

export default class LineChatter extends DisplayItem {

    constructor(props = {}) {
        super(props);

        const x = this.ctx.random(0, this.ctx.windowWidth);
        const y = this.ctx.random(0, this.ctx.windowHeight);

        const fill = props && props.colors && props.colors.fill;
        const stroke = props && props.colors && props.colors.fill;

        this.state = {
            x1: x,
            y1: y,
            x2: x,
            y2: y,
            fill: this.ctx.color(fill),
            stroke: this.ctx.color(stroke),
            weight: this.ctx.random(1, 5),
            MAX: Math.ceil(this.ctx.random(50, 250)),
            VEL: Math.ceil(this.ctx.random(-1, 1)),
            grow: this.ctx.random(0, 10) > 5 ? true : false,
            rot: 1,
        }
    }

    tick() {
        const { VEL, MAX } = this.state;
        let { x1, y1, x2, y2, grow, rot } = this.state;
        
        let distance;

        if (grow) {

            x2 = x2 + VEL;
            y2 = y2 + VEL;

            distance = this.ctx.dist( x1, y1, x2, y2 );

            if (distance > MAX) {
                grow = false;
            }

        } else {

            x2 = x2 - VEL;
            y2 = y2 - VEL;

            distance = this.ctx.dist( x1, y1, x2, y2 );

            if (distance > MAX ) {
                grow = true;
            }
        }

        rot = rot + VEL;
        if (rot > 360) {
            rot = 0;
        }

        this.setState({
            x1, y1, x2, y2, grow, rot,
        });
    }

    render() {
        const { x1, x2, y1, y2, stroke, weight, rot } = this.state;

        this.ctx.stroke(stroke);
        this.ctx.strokeWeight(weight);
        this.ctx.push();
        this.ctx.translate(x1, y1);
        // this.ctx.rotate(rot);
        this.ctx.line(0, 0, x2 - x1, y2 - y1);
        this.ctx.pop();
    }

}