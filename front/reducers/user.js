const dummyUser = {
  nickname: "박연호",
  Post: [],
  Followings: [],
  Follower: []
};

export const intialState = {
  isLoggedIn: false,
  user: null
};

export const LOG_IN = "LOG_IN"; // 액션 이름
export const LOG_OUT = "LOG_OUT";

export const logoutAction = {
  // 실제 액션
  type: LOG_OUT
};

export const loginAction = {
  // 실제 액션
  type: LOG_IN,
  data: {
    nickname: "yeonho"
  }
};
const reducer = (state = intialState, action) => {
  // state와 action을 받아서 다음 state를 생성

  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
