import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  put,
  take,
  delay
} from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from "../reducers/user";

// axios.defaults.baseURL = "http://localhost:3065/api";

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post("http://localhost:3065/api/user/login", loginData, {
    withCredentials: true
  });
}

function* login(action) {
  try {
    const result = yield call(logInAPI, action.data); // axios의 응답 받음
    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data // reducer
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI(signUpData) {
  // call함수의 두번째 인자
  // 서버에 요청을 보내는 부분
  return axios.post("http://localhost:3065/api/user", signUpData);
}

function* signUp(action) {
  // action : form에서 넘어온 값
  try {
    yield call(signUpAPI, action.data);
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
