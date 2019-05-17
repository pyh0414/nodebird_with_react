import { all, call } from "redux-saga/effects";

import user from "./user";
import post from "./post";

export default function* rootSage() {
  yield all([call(user), call(post)]);
}
