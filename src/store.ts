import { combineReducers, configureStore, getDefaultMiddleware } from "redux-starter-kit";
import taskModule from "./modules/taskModule";

const rootReducer = combineReducers({
    task: taskModule.reducer,
});

export const setupStore = () => {
    const middleware = getDefaultMiddleware();
    return configureStore({
        reducer: rootReducer,
        middleware,
    });
};
