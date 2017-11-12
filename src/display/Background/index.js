import DisplayItem from '../displayItem';

const COLORS = [
	[206,210,186],
    [171,189,154],
    [139,154,113],
    [133,141,111],
    [144,152,125],
];
const ALPHA = .5;
const RESET = 100;

export default class Background extends DisplayItem {

    constructor(props = {}) {
        super(props);
        console.log(this.ctx);
        this.getColor = this.getColor.bind(this);

        this.state = {
            color: this.getColor(),
            frame: 0,
        }
    }

    getColor() {
        const clr = COLORS[Math.floor(this.ctx.random(0, COLORS.length))];
        const color = this.ctx.color(clr[0], clr[1], clr[2], 2);
        return color;
    }

    tick() {
        let { color, frame } = this.state;

        frame = frame + 1;

        if (frame > RESET) {
            frame = 0;
            color = this.getColor();
        }
        this.setState({
            frame,
            color,
        });
    }

    render() {
        const { color } = this.state;
        this.ctx.background(color);
    }
}