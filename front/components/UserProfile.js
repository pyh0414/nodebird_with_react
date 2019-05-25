import { Avatar, Card, Button } from "antd";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    // useCallBack을 사용했다는 것은 자식 props에 전달할 함수라는 것
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <Card actions={[]}>
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
