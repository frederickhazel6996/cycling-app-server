import { combineReducers } from "redux";

import admin from "./admin_reducer";
import original from "../store/reducer";

const rootReducer = combineReducers({
    original,
    admin,
});

export default rootReducer;
