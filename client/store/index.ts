import {createStore, AnyAction, Store, applyMiddleware} from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import {reducer, RootState} from "./reducers/index";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const makeStore
    = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>