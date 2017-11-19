import DisplayItem from '../displayItem';

const ALPHA = 15;
const RESET = 100;

export default class Background extends DisplayItem {

    constructor(props = {}) {
        super(props);
        console.log('Background:', this.state);

        const { colors } = props;

        this.getColor = this.getColor.bind(this);
        this.COLORS = colors.background;

        this.state = {
            color: this.getColor(),
            frame: 0,
        }
    }

    getColor() {

        const clr = this.COLORS[Math.floor(this.ctx.random(0, this.COLORS.length))];
        const color = this.ctx.color(clr[0], clr[1], clr[2], ALPHA);
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