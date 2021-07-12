import { createStore, compose, applyMiddleware } from 'redux';
import reducers from "./reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appliedMiddlewares = applyMiddleware(...middlewares);

const store = createStore(reducers, composer(appliedMiddlewares));

export default store;