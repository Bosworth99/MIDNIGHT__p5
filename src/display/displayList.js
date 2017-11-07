
export default class DisplayList {
    
        constructor() {
            console.log('DisplayList.constructor');

            this.state = {
                items: [],
            }
        }
    
        setState(newState) {
            this.state = { ...this.state, newState };
            // console.log('DisplayList.setState [this.state:%o]', this.state);
        }

        register(item = {}) {
            // console.log('DisplayList.register [item:%o]', item);
            const { items } = this.state;
            item.id = `item_${items.length}`;
            items.push(item);
            this.setState({ items: [...items] });
        }

        deregister(item = { id: null }) {
            // console.log('DisplayList.deregister [item:%o]', item);
            const { items } = this.state;
            this.setState({ items: [...items].filter(itm => !item.id === items.id) });
        }

        render() {
            // console.log('DisplayList.render');
            const { items } = this.state;
            items.forEach(item => item && item.render && typeof item.render === 'function' && item.render());
        }
    
        tick() {
            // console.log('DisplayList.tick');
            const { items } = this.state;
            items.forEach(item => item && item.tick && typeof item.tick === 'function' && item.tick());
        }

        destroy() {
            // console.log('DisplayList.destroy');
            const { items } = this.state;
            items.forEach(item => item && item.destroy && typeof item.destroy === 'function' && item.destroy());
            items.length = 0;

            this.setState({
                items: [],
            })        
        }
    
    }