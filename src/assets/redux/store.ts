import reducer from "./reducer";
import { IState } from "../../../src/models";
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store; 