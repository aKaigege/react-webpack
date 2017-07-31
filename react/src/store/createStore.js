import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { compose, createStore, applyMiddleware } from 'redux';

var buildStore;

buildStore = compose(applyMiddleware(thunk))(createStore);

export default function configureStore(initialState) {
	const store = buildStore(rootReducer, initialState);

	return store;
}
