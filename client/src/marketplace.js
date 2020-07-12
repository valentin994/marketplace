import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const marketplace = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware)
));

export default marketplace;