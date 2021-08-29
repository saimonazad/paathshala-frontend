import { Button } from "@material-ui/core";
import React from "react";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../../services/fetcher";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
import { toast } from "react-toastify";

const Like = ({ postId }) => {
  const {
    data: isLiked,
    error,
    mutate,
  } = useSWR(`/newsfeed/likes/?post_id=${postId}`, fetcher);

  const handleLike = () => {
    httpClient
      .post(`/newsfeed/likes/?post_id=${postId}`)
      .then((res) => {
        toast.success("You liked this post!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        mutate();
      })
      .catch((err) =>
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <>
      {isLiked?.length > 0 ? (
        <Button
          size="small"
          color="secondary"
          startIcon={
            <ThumbUpAltIcon
              style={{ fontSize: "24px", verticalAlign: "middle" }}
            />
          }
        >
          Like
        </Button>
      ) : (
        <Button
          size="small"
          color="secondary"
          onClick={handleLike}
          startIcon={
            <ThumbUpAltOutlinedIcon
              style={{ fontSize: "24px", verticalAlign: "middle" }}
            />
          }
        >
          Like
        </Button>
      )}
    </>
  );
};

export default Like;
