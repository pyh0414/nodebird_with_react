const dummyUser = {
  nickname: "박연호",
  Post: [],
  Followings: [],
  Follower: []
};

export const intialState = {
  isLoggedIn: false,
  user: null,
  signUpdata: {},
  loginData: {}
};

export const LOG_IN = "LOG_IN"; // 액션 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT = "LOG_OUT";

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const logoutAction = {
  // 실제 액션
  type: LOG_OUT
};

export const loginAction = data => {
  // 그냥 객체인 경우는 데이터가 없거나, 데이터가 정적인 경우
  // 실제 액션
  return {
    type: LOG_IN,
    data
  };
};

export const signUpAction = data => {
  // 동적인 데이터가 들어 올 경우는 함수로
  // 실제 액션
  return {
    type: SIGN_UP,
    data
  };
};

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS
};
const reducer = (state = intialState, action) => {
  // state와 action을 받아서 다음 state를 생성

  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        loginData: action.data
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case SIGN_UP:
      return {
        ...state,
        signupData: action.data
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
