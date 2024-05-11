import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "../Slice/taskSlice"


const rootReducer = combineReducers({
        task: taskReducer,     
});
export default rootReducer;
