import DisplayItem from '../displayItem';

export default class Iorteta extends DisplayItem {
        
        constructor(props = {}) {
            super(props);
            console.log('DisplayItem.constructor', props);

            const { x, y, COLOR, MIN_RAD, MAX_RAD, VELOCITY } = props;
            
            this.state = {
                x: x || 100, 
                y: y || 100,
                rad: MIN_RAD,
                COLOR,
                clr: this.ctx.color(COLOR),
                MIN_RAD: MIN_RAD || 50,
                MAX_RAD: MAX_RAD || 250,
                VELOCITY: VELOCITY || 1,
                grow: true,
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
            this.ctx.stroke(clr);
            this.ctx.ellipse(x, y, rad, rad);
        }
    
    }