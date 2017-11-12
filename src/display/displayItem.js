
export default class DisplayItem {
    
        constructor(props = { context: null }) {
            const { context } = props;
            this.ctx = context;
            this.state = {};
        }
    
        setState(newState) {
            this.state = { ...this.state, ...newState };
        }

        render() {}
    
        tick() {}

        destroy() {
            delete this.state;
            delete this;
        }
    }