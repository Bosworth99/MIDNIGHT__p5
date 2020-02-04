import DisplayItem from '../displayItem';

export default class LineChatter extends DisplayItem {

    constructor(config = {}) {
        super(config);

        const MAX = this.ctx.random(500, 1000);
        const MIN = this.ctx.random(250, 500);
        const VEL = this.ctx.random(.2, .8);
        const rot = this.ctx.random(1, 2);

        const length = this.ctx.random(250, 750);
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

        // const fill = config && config.colors && config.colors.fill;
        // const stroke = config && config.colors && config.colors.fill;

        const colorList = config.colors.list || [];
        const fill = colorList[Math.floor(this.ctx.random(0, colorList.length))];
        const stroke = colorList[Math.floor(this.ctx.random(0, colorList.length))];

        this.state = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            fill: this.ctx.color([...fill, this.ctx.random(0, 50)]),
            stroke: this.ctx.color([...stroke, this.ctx.random(0, 100)]),
            weight: this.ctx.random(0.1, 3),
            MAX,
            MIN,
            VEL,
            grow,
            rot,
        }
    }

    tick() {
        const { VEL, MIN, MAX } = this.state;
        let { x1, y1, x2, y2, grow, rot } = this.state;
        
        const dist = this.ctx.dist( x1, y1, x2, y2 );

        // if (grow) {
        //     x1 = x1 + VEL;
        //     y1 = y1 + VEL;            
        //     x2 = x2 - VEL;
        //     y2 = y2 - VEL;
        // } else {
        //     x1 = x1 - VEL;
        //     y1 = y1 - VEL;   
        //     x2 = x2 + VEL;
        //     y2 = y2 + VEL;
        // }

        if (grow) {
            x1 = this.ctx.random(0,10) > 6 ? x1 - VEL : x1 + VEL;
            y1 = this.ctx.random(0,10) > 6 ? y1 - VEL : y1 + VEL;            
            x2 = this.ctx.random(0,10) > 6 ? x2 + VEL : x2 - VEL;
            y2 = this.ctx.random(0,10) > 6 ? y2 + VEL : y2 - VEL;
        } else {
            x1 = this.ctx.random(0,10) > 6 ? x1 + VEL : x1 - VEL;
            y1 = this.ctx.random(0,10) > 6 ? y1 + VEL : y1 - VEL;            
            x2 = this.ctx.random(0,10) > 6 ? x2 - VEL : x2 + VEL;
            y2 = this.ctx.random(0,10) > 6 ? y2 - VEL : y2 + VEL;
        }

        if (dist > MAX) {
            grow = false;
        } else if (dist < MIN) {
            grow = true;
        }

        rot += VEL;

        this.setState({
            x1, y1, x2, y2, grow, rot,
        });
    }

    render() {
        const { x1, x2, y1, y2, stroke, fill, weight, rot } = this.state;
        this.ctx.push();
        this.ctx.fill(fill);
        this.ctx.strokeWeight(weight);
        this.ctx.stroke(stroke);
        this.ctx.line(x1, y1, x2, y2);
        this.ctx.rotate(rot);
        this.ctx.pop();
    }
}