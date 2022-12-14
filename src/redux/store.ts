import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { State } from "./reducers/index";
import reducers from "./reducers/index";

const middleware = [thunk];

export const store = createStore(reducers, applyMiddleware(...middleware));
