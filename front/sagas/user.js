import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user";

function loginAPI() {
  //서버에 요청을 보내는 부분
}

function* login() {
  try {
    yield call(loginAPI);
    yield put({
      // put은 dispatchd와 동일
      type: LOG_IN_SUCCESS
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login); // saga가 LOG_IN 요청이 들어오는지 검사, 들어오면 login()
}

export default function* userSaga() {
  yield all([fork(watchLogin)]);
}
