import {App,AppPropsType} from "./App"
import store,{AppStoreType,integratedRootReducerType} from "./store/store"
import {asyncReducerName,getMiddleware,integratedRootReducer,RootReducer} from "./store/store-utils"
import AppReducer from "./store/appSlice"

export {
    App,
    store,
    asyncReducerName,
    getMiddleware,
    integratedRootReducer,
    RootReducer,
    AppReducer
}
export type {
    AppPropsType,
    AppStoreType,
    integratedRootReducerType
}