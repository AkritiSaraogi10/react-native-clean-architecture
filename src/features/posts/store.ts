import { Middleware, MiddlewareAPI, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { postApis } from "./data/data_sources/post_data_api_impl_rtk";
import Snackbar from "react-native-snackbar";
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {

        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!')
            // const errorMessage = action.error.message || "An error occurred"; // Provide a default message if action.error.message is undefined
            // Snackbar.show({
            //     text: 'data' in action.error
            //         ? (action.error.data as { message: string }).message
            //         : action.error.message,

            //     duration: Snackbar.LENGTH_SHORT,
            // });

        }

        return next(action)
    }

export const store = configureStore({
    reducer: {
        [postApis.reducerPath]: postApis.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApis.middleware, rtkQueryErrorLogger),
})

setupListeners(store.dispatch);