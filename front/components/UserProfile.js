import { Avatar, Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector(state => state.user);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          {user.Post.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {user.Followings}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {user.Followers}
        </div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname}</Avatar>}
        title={user.nickname}
      />
    </Card>
  );
};

export default UserProfile;
