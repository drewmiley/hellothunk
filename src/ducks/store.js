import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { fetchDataSuccess } from './reducers';

const reducer = combineReducers({
    fetchDataSuccess
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
