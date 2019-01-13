import { mapDispatch } from './src/ducks/actions';
import store from './src/ducks/store';

class App {
    constructor(options) {
        this.dom = options.dom;
        this.store = options.store;
        this.fetchData = options.mapDispatch(this.store.dispatch).fetchData;
        this.store.subscribe(this.render.bind(this));
        this.dom
            .querySelector('#getuser')
            .addEventListener('click',
                this.getUser.bind(this)
            );
    }

    getUser() {
        this.fetchData();
    }

    displayUser(user) {
        if (user) {
            this.dom
                .querySelector('#userinfo')
                .innerHTML = user.email;
        }
    }

    render() {
        const state = this.store.getState();
        this.displayUser(state.user);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App({
        dom: document.querySelector('#root'),
        store: store(),
        mapDispatch
    });
    app.render();
});
