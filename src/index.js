import './styles.css';
import Sketch from './sketch/midnight';

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