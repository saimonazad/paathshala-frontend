import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Box,
  Chip,
  Divider,
  IconButton,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React, { useState, useEffect } from "react";
import Post from "../post";
import PostMediaUpload from "../postMediaUpload";
//import redux
import { useDispatch, useSelector } from "react-redux";

import { createCoursePost } from "../../../../redux/actions/WallApp";

import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  postInput: {
    height: 38,
  },
  avatar: {
    alignSelf: "center",
  },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

const PostCard = () => {
  const router = useRouter();
  const urlParam = router.query;
  let courseId = urlParam.slug[0];
  const dispatch = useDispatch();

  const classes = useStyles();
  //post state
  const [postText, setPostText] = useState("");
  //handler to setPostText
  const postTextHandler = (value) => {
    setPostText(value);
  };
  //redux action dispatch

  //newsfeed post handler
  const submitHandler = (e) => {
    e.preventDefault();
    //feed data to post
    const feedData = {
      post_text: postText,
      posted_on: courseId,
      post_type: "testPost",
    };
    dispatch(createCoursePost(feedData));
    setPostText("");
  };
  return (
    <Box
      boxShadow={2}
      borderRadius={4}
      bgcolor="background.box"
      className={classes.root}
    >
      <Post submit={submitHandler} setText={postTextHandler} post={postText} />
      <Divider className={classes.divider} />
      <PostMediaUpload />
    </Box>
  );
};

export default PostCard;
