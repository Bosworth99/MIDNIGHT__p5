
import Router from './routes';

import './styles.css';

class App {

    constructor() {
        console.log('App');
    }

    init() {
        this.router = Router;
    }
}

const instance = new App();
instance.init();