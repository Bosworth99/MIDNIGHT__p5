import './styles.css';

import p5 from 'p5';
import Sketch from './sketch';

class App {

    constructor() {
        console.log('App');
    }

    init() {
        const sketch = new p5(Sketch)
    }
    
}

const instance = new App();
instance.init();