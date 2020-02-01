import DisplayItem from '../displayItem';

export default class LineChatter extends DisplayItem {

    constructor(props = {}) {
        super(props);

        const MAX = this.ctx.random(100, 500);
        const MIN = this.ctx.random(50, 100);
        const VEL = this.ctx.random(.01, 2);
        const rot = this.ctx.random(1, 2);

        const length = this.ctx.random(0, 200);
        const x1 = this.ctx.random(0, this.ctx.windowWidth);
        const y1 = this.ctx.random(0, this.ctx.windowHeight);
        const x2 = x1 + this.ctx.random(0, length);
        const y2 = y1 + this.ctx.random(0, length);
        const dist = this.ctx.dist( x1, y1, x2, y2 );
        
        let grow = this.ctx.random(0, 10) > 5 ? true : false;
        if (dist > MAX) {
            grow = false;
        } else if (dist < MIN) {
            grow = true;
        }

        const fill = props && props.colors && props.colors.fill;
        const stroke = props && props.colors && props.colors.fill;

        this.state = {
<<<<<<< HEAD
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
=======
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            fill: this.ctx.color([...fill, this.ctx.random(0, 75)]),
            stroke: this.ctx.color([...stroke, this.ctx.random(0, 75)]),
            weight: this.ctx.random(0.1, 5),
            MAX,
            MIN,
            VEL,
            grow,
            rot,
>>>>>>> master
        }
    }

    tick() {
        const { VEL, MAX } = this.state;
        let { x1, y1, x2, y2, grow, rot } = this.state;
        
<<<<<<< HEAD
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
=======
        const dist = this.ctx.dist( x1, y1, x2, y2 );

        if (grow) {
            x1 = x1 + VEL;
            y1 = y1 + VEL;            
            x2 = x2 - VEL;
            y2 = y2 - VEL;
        } else {
            x1 = x1 - VEL;
            y1 = y1 - VEL;   
            x2 = x2 + VEL;
            y2 = y2 + VEL;
        }
>>>>>>> master

        if (dist > MAX) {
            grow = false;
        } else if (dist < MIN) {
            grow = true;
        }

<<<<<<< HEAD
        rot = rot + VEL;
        if (rot > 360) {
            rot = 0;
        }
=======
        rot *= VEL;
>>>>>>> master

        this.setState({
            x1, y1, x2, y2, grow, rot,
        });
    }

    render() {
<<<<<<< HEAD
        const { x1, x2, y1, y2, stroke, weight, rot } = this.state;

        this.ctx.stroke(stroke);
        this.ctx.strokeWeight(weight);
        this.ctx.push();
        this.ctx.translate(x1, y1);
        // this.ctx.rotate(rot);
        this.ctx.line(0, 0, x2 - x1, y2 - y1);
=======
        const { x1, x2, y1, y2, stroke, fill, weight, rot } = this.state;
        this.ctx.push();
        this.ctx.fill(fill);
        this.ctx.stroke(stroke);
        this.ctx.strokeWeight(weight);
        this.ctx.line(x1, y1, x2, y2);
        this.ctx.rotate(rot);
>>>>>>> master
        this.ctx.pop();
    }

}