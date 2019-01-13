import { mapDispatchToProps } from './src/ducks/actions';
import store from './src/ducks/store';

class App {
    constructor(options) {
        this.dom = options.dom;
        this.store = options.store;
        this.dispatch = options.mapDispatchToProps(this.store.dispatch);
        this.store.subscribe(this.update.bind(this));
        this.dom
            .querySelector('#getuser')
            .addEventListener('click',
                this.getUser.bind(this)
            );
    }

    getUser() {
        this.dispatch.fetchData();
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
        console.log("Updating");
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
        store: store(),
        mapDispatchToProps
    });
    app.render();
});
console.log("Running");
