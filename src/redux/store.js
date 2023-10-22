import { createStore } from "redux";
import reducer from "./reducers.ts";

const store = createStore(reducer);

export default store;