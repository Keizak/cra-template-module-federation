import {configureStore} from "@reduxjs/toolkit";
import {asyncReducerName, getMiddleware, RootReducer} from "./store-utils";

const store = configureStore({
    reducer: RootReducer,
    middleware: getMiddleware
})

export default store

export type AppStoreType = ReturnType<typeof RootReducer>

export type integratedRootReducerType = {
    [asyncReducerName]: AppStoreType,
}

// @ts-ignore
window.store = store // for developers
