export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초"
      },
      content: "첫 번째 게시글",
      img:
        "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
      Comments: []
    }
  ], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: "", // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false,
  addCommentErrorReason: "",
  commentAdded: false
};

export const LOAD_MAIN_POSTS_REQUEST = "POST/LOAD_MAIN_POSTS_REQUEST";
export const LOAD_MAIN_POSTS_SUCCESS = "POST/LOAD_MAIN_POSTS_SUCCESS";
export const LOAD_MAIN_POSTS_FAILURE = "POST/LOAD_MAIN_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "POST/LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "POST/LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "POST/LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "POST/LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "POST/LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "POST/LOAD_USER_POSTS_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "POST/UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "POST/UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "POST/UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "POST/REMOVE_IMAGE";

export const ADD_POST_REQUEST = "POST/ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "POST/ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "POST/ADD_POST_FAILURE";

export const LIKE_POST_REQUEST = "POST/LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "POST/LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "POST/LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "POST/UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "POST/UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "POST/UNLIKE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "POST/ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "POST/ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "POST/ADD_COMMENT_FAILURE";

export const LOAD_COMMENTS_REQUEST = "POST/LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "POST/LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "POST/LOAD_COMMENTS_FAILURE";

export const RETWEET_REQUEST = "POST/RETWEET_REQUEST";
export const RETWEET_SUCCESS = "POST/RETWEET_SUCCESS";
export const RETWEET_FAILURE = "POST/RETWEET_FAILURE";

export const REMOVE_POST_REQUEST = "POST/REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "POST/REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "POST/REMOVE_POST_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
        addPostErrorReason: "",
        postAdded: false
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        mainPosts: [action.data, ...state.mainPosts],
        postAdded: true,
        imagePaths: []
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error
      };
    }
    case LOAD_COMMENTS_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Comments = action.data.comments;
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts
      };
    }

    case LOAD_MAIN_POSTS_REQUEST:
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST: {
      return {
        ...state,
        mainPosts: []
      };
    }

    case LOAD_MAIN_POSTS_SUCCESS:
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS: {
      return {
        ...state,
        mainPosts: action.data
      };
    }
    case LOAD_MAIN_POSTS_FAILURE:
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE: {
      return {
        ...state,
        mainPosts: []
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment: true,
        addCommentErrorReason: "",
        commentAdded: false
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Comments = [...post.Comments, action.data.comment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        isAddingComment: false,
        mainPosts,
        commentAdded: true
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error
      };
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        imagePaths: [...state.imagePaths, ...action.data]
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_IMAGE: {
      return {
        ...state,
        imagePaths: state.imagePaths.filter((v, i) => i !== action.index)
      };
    }
    case LIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case LIKE_POST_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Likers = [{ id: action.data.userId }, ...post.Likers];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Likers };
      return {
        ...state,
        mainPosts
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = state.mainPosts[postIndex];
      const Likers = post.Likers.filter(v => v.id !== action.data.userId);
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Likers };
      return {
        ...state,
        mainPosts
      };
    }
    case UNLIKE_POST_FAILURE: {
      return {
        ...state
      };
    }

    case RETWEET_REQUEST: {
      return {
        ...state
      };
    }
    case RETWEET_SUCCESS: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      };
    }
    case RETWEET_FAILURE: {
      return {
        ...state
      };
    }

    case REMOVE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: state.mainPosts.filter(v => v.id !== action.data)
      };
    }
    case REMOVE_POST_FAILURE: {
      return {
        ...state
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};
