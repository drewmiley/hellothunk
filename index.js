import { mapDispatchToProps } from './src/ducks/actions';
import store from './src/ducks/store';

const initialisedStore = store();
//
// ReactDOM.render(
//   <Provider store={store()}>
//       <AppContainer />
//   </Provider>,
//   document.getElementById('root')
// );
console.log("Running");
