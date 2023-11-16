import {configureStore} from "@reduxjs/toolkit" 
import authReducer from "./fautures/auth.slice.js"
import projectReducer from "./fautures/project.slice.js"
import taskReducer from "./fautures/task.slice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        task: taskReducer
    }
})