import {configureStore} from "@reduxjs/toolkit"

import reducer from "./condencedStore"
import {api} from "./api"

export default function StorConfigure(){
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api)
    })
}