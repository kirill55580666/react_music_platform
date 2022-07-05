import {combineReducers} from "redux";
import { HYDRATE } from "../../node_modules/next-redux-wrapper/es6/index";
import {playerReducer} from "./playerReducer";
import {trackReducer} from "./trackReducer";


const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};


export type RootState = ReturnType<typeof rootReducer>
