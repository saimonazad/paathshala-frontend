import React, { useEffect, useState } from "react";
import {
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  Grid,
  Divider,
  Button,
  label,
  Collapse,
} from "@material-ui/core/";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Post from "../post";
import Comments from "../comments";
import moment from "moment";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0, 0, 2),
    },
  },
  feed: {
    padding: theme.spacing(2, 2, 1),
  },
  profile__name: {
    fontWeight: 600,
    fontSize: theme.spacing(2),
    color: theme.palette.common.black,
  },
  post__time: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.gray,
  },
  profile__img: {
    marginRight: theme.spacing(1),
  },
  btn__like: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
    marginRight: theme.spacing(1.2),
  },
  btn__group: {
    marginRight: theme.spacing(2),
  },
  divider: {},
  status: {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.mineShaft,
  },
  appbar_rightIcon: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  iconMiddle: { verticalAlign: "top" },
}));
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Grow from "@material-ui/core/Grow";
//redux

import {
  createComment,
  clearErrors,
} from "../../../reduxBackup/actions/CommentActions";
import { wrapper } from "../../../redux/store";
import { CREATE_COMMENT_SUCCESS } from "../../../reduxBackup/constants/allComments";
import { useRouter } from "next/router";

const Feed = ({ group, enroll, personal }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [commentActive, setCommentActive] = useState(false);
  const [activePost, setActivePost] = useState(0);
  const [allComments, setAllComments] = useState([]);

  const handleCommentBox = (id) => {
    setCommentActive(true);
    setActivePost(id);
  };

  //post state
  const [postText, setPostText] = useState("");
  //handler to setPostText
  const postTextHandler = (value) => {
    setPostText(value);
  };
  //redux action dispatch
  //redux state
  //useeffect

  //newsfeed post handler
  const submitHandler = (e) => {
    e.preventDefault();
    //feed data to post
    const commentData = {
      comment_text: postText,
    };
    dispatch(createComment(commentData, activePost));
    fetchComments();
    setPostText("");
  };
  async function fetchComments() {
    await axios
      .get(
        `https://paathshala.staging.baeinnovations.com/newsfeed/comments/?post_id=${activePost}`,
        {
          headers: {
            Authorization: `token `,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAllComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchComments();
  }, [activePost, allComments]);

  const { feedPosts } = useSelector(({ wallApp }) => wallApp);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CmtList
        data={feedPosts}
        renderRow={(feed, index) => (
          <Grow
            mb={2}
            key={index}
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <Box
              bgcolor="background.box"
              boxShadow={2}
              borderRadius={4}
              className={classes.feed}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Box>
                    <Avatar src="" className={classes.profile__img} />
                  </Box>
                  <Box>
                    <Typography
                      component="h2"
                      className={classes.profile__name}
                    >
                      {feed.user}
                    </Typography>
                    <Typography component="h3" className={classes.post__time}>
                      {moment(feed.timeStamp).fromNow()}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    color="secondary"
                    className={classes.appbar_rightIcon}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography className={classes.status}>
                {feed.post_text}
              </Typography>

              <Divider className={classes.divider} />
              {/* <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  ml={1}
                  mr={1}
                  p={1}
                >
                  <Box>
                    <label
                      htmlFor="icon-button-file"
                      className={classes.btn__group}
                    >
                      <IconButton
                        className={classes.btn__like}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <ThumbUpIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      15
                    </label>
                    <label htmlFor="icon-button-file">
                      <IconButton
                        className={classes.btn__like}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <ChatBubbleIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      15
                    </label>
                  </Box>
                  <Box>
                    <label htmlFor="icon-button-file">
                      <IconButton
                        className={classes.btn__like}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <FontAwesomeIcon
                          icon={faShare}
                          style={{ fontSize: "18px" }}
                        />
                      </IconButton>
                      2 Shares
                    </label>
                  </Box>
                </Box>
                <Divider className={classes.divider} /> */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                ml={1}
                mr={1}
              >
                <Button
                  size="small"
                  color="secondary"
                  classes={{ root: classes.button, label: classes.label }}
                  startIcon={
                    <ThumbUpAltOutlinedIcon
                      style={{ fontSize: "24px", verticalAlign: "middle" }}
                    />
                  }
                >
                  Like
                </Button>
                <Button
                  onClick={() => handleCommentBox(feed.id)}
                  size="small"
                  color="secondary"
                  classes={{ root: classes.button, label: classes.label }}
                  startIcon={
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ fontSize: "24px" }}
                    />
                  }
                >
                  Comment
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  classes={{ root: classes.button, label: classes.label }}
                  startIcon={
                    <FontAwesomeIcon
                      icon={faShare}
                      style={{ fontSize: "24px" }}
                    />
                  }
                >
                  Share
                </Button>
              </Box>

              {commentActive && activePost == feed.id && (
                <Collapse in={true}>
                  <Divider className={classes.divider} />
                  <Box p={1}>
                    <Post
                      submit={submitHandler}
                      setText={postTextHandler}
                      post={postText}
                    />
                  </Box>
                  <Divider className={classes.divider} />

                  {allComments.length > 0 ? (
                    <Box p={1}>
                      {allComments.map((comment) => (
                        <Comments comment={comment} />
                      ))}
                    </Box>
                  ) : (
                    ""
                  )}
                </Collapse>
              )}
            </Box>
          </Grow>
        )}
        ListEmptyComponent={
          <ListEmptyResult
            loader={true}
            title="No Post Found"
            content="Empty result description"
          />
        }
      />
    </Box>
  );
};

export default Feed;
