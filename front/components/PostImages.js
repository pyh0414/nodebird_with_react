import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);
  if (images.length == 1) {
    return (
      <>
        <img src={`http://localhost:3065/${images[0].src}`} onClick={onZoom} />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length == 2) {
    return (
      <>
        <div>
          <img
            src={`http://localhost:3065/${images[0].src}`}
            width="50%"
            onClick={onZoom}
          />
          <img
            src={`http://localhost:3065/${images[1].src}`}
            width="50%"
            onClick={onZoom}
          />
          {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <img
          src={`http://localhost:3065/${images[0].src}`}
          width="50%"
          onClick={onZoom}
        />
        <div
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle"
          }}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}사진 더 보기
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired
};
export default PostImages;
