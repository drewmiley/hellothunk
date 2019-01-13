import { mapDispatchToProps } from './src/ducks/actions';
import store from './src/ducks/store';

class App {
    constructor(options) {
        this.dom = options.dom;
        this.store = options.store;
        this.store.subscribe(this.update.bind(this));
    }

    renderButton(state) {
        this.dom
            .querySelector('#getuser')
            .innerHTML = "Hello";
    }

    renderUser(state) {
        this.dom
            .querySelector('#userinfo')
            .innerHTML = "Some stuff";
    }

    update() {
        const state = this.store.getState();
        this.renderButton(state);
        this.renderUser(state);
    }

    render() {
        this.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App({
        dom: document.querySelector('#root'),
        store: store()
    });
    app.render();
});
console.log("Running");
