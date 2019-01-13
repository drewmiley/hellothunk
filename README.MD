# hellothunk

A simple example of implementing redux-thunk sans view frameworks.

## How to replicate

1. `git init`
2. `touch .gitignore`
3. Add `node_modules/` and `package-lock.json` to the `.gitignore` file.
4. `npm init`
5. Answer the questions however you wish.
6. COMMIT
7. `npm install @babel/core @babel/preset-env`
8. `npm install babel-loader webpack webpack-cli webpack-dev-server copy-webpack-plugin`
9. `touch webpack.config.js`
10. `touch index.html`
11. `touch index.js`
12. In `webpack.config.js` add
```
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(["index.html"])
  ]
};
```
13. In `index.html` add
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello Thunk</title>
  </head>
  <body>
    <script src="./app.js"></script>
  </body>
</html>
```
14. In `index.js` add
```
console.log('Running');
```
15. In `package.json`, in scripts object, set
```
"start": "webpack-dev-server"
```
16. `npm start`
17. Open `http://localhost:8080` and view the console
18. COMMIT
19. In `index.html` in `<body>` tag, add
```
<div id="root">
    <span id="userinfo"></span>
    <button id="getuser">Get user</button>
</div>
```
20. In `index.html`, add
```
class App {
    constructor(options) {
        this.dom = options.dom;
        this.dom
            .querySelector('#getuser')
            .addEventListener('click',
                this.getUser.bind(this)
            );
    }

    getUser() {
        console.log('getUser');
    }

    displayUser(user) {
      this.dom
          .querySelector('#userinfo')
          .innerHTML = 'User';
    }

    render() {
        this.displayUser();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App({
        dom: document.querySelector('#root')
    });
    app.render();
});
```
21. Open `http://localhost:8080` and inspect your application.
22. COMMIT
23. `npm install redux redux-thunk`
24. `mkdir src`
25. `mkdir src/ducks`
26. `touch src/ducks/actions.js`
27. `touch src/ducks/reducers.js`
28. `touch src/ducks/store.js`
29. In `src/ducks/actions.js` add
```
export const mapDispatch = dispatch => ({
    fetchData: () => dispatch(fetchData())
});

const fetchData = () => dispatch => {
    const url = 'https://randomuser.me/api/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(response => response.results[0])
        .then(user => dispatch(fetchDataSuccess(user)));
};

const fetchDataSuccess = user => ({
    type: 'FETCH_DATA_SUCCESS',
    user
});
```
30. In `src/ducks/reducers.js` add
```
export function user(state = null, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.user;
        default:
            return state;
    }
}
```
31. In `src/ducks/store.js` add
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { user } from './reducers';

const reducer = combineReducers({
    user
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
```
32. In `index.js` add the imports
```
import { mapDispatch } from './src/ducks/actions';
import store from './src/ducks/store';
```
33. In `index.js` add the options in the class initialisation
```
store: store(),
mapDispatch
```
34. In `index.js` inside `constructor` add
```
this.store = options.store;
this.fetchData = options.mapDispatch(this.store.dispatch).fetchData;
this.store.subscribe(this.render.bind(this));
```
35. In `index.js` replace the other methods with
```
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
```
36. Open `http://localhost:8080` and fetch a user.
37. COMMIT
38. Congratulations on reaching the end of this tutorial!
