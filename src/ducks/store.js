import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { users } from './reducers';

const reducer = combineReducers({
    users
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
