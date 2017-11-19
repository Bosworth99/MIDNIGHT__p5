import './styles.css';
// import Sketch from './sketch/default_0.1.0';

// import Sketch from './sketch/iorte_0.1.0';
import Sketch from './sketch/iorte_0.1.2';

// import Sketch from './sketch/shatterline_0.1.0';

class App {

    constructor() {
        console.log('App');
    }

    init() {
        const sketch = new Sketch();
    }
}

const instance = new App();
instance.init();