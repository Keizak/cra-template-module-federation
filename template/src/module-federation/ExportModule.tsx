import {useEffect, useState} from "react";
import {App, integratedRootReducer} from "../app";
import {Provider} from "react-redux";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {Middleware} from "@reduxjs/toolkit";

export type CustomStoreFromHost = {
    injectReducer: (asyncReducer: any, key?: string) => Promise<number>
    addMiddleware: (...middlewares: Middleware[]) => void,
    removeMiddleware: (middleware: Middleware) => void,
}
export type RemoteAppWrapperPropsType = {
    store: ToolkitStore & CustomStoreFromHost,
    baseUrl: string
}
export const RemoteAppWrapper = (props: RemoteAppWrapperPropsType) => {
    const {store = {} as ToolkitStore & CustomStoreFromHost, baseUrl} = props

    const [isReducerMounted, setIsReducerMounted] = useState(false)

    useEffect(() => {
        store.injectReducer(integratedRootReducer).then(() => {
            setIsReducerMounted(true)
        })
        // store.addMiddleware(LessonsAPI.middleware)
        // Если у вас есть мидлваеры, подключаем их тут к общему стору
        return () => {
            setIsReducerMounted(false)
            // store.removeMiddleware(LessonsAPI.middleware)
            // Если подключили мидлваеры, после размонтирования лучше их отключить
        }
    }, [])

    return (
        isReducerMounted ?
            <Provider store={store}>
                <App baseUrl={baseUrl}/>
            </Provider> : <div>Загрузка</div>)
}

export default RemoteAppWrapper