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
  TextField,
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
import { useSelector, useDispatch } from "react-redux";
import Grow from "@material-ui/core/Grow";
import { useRouter } from "next/router";
import { getComments, addComment } from "../../../redux/actions/WallApp";
import Link from "@material-ui/core/Link";
import { fetcher, deletion } from "../../../services/fetcher";
import useSWR, { mutate, trigger } from "swr";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import PageLoader from "../../../../@jumbo/components/PageComponents/PageLoader";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import { useAuth } from "../../../../authentication";
import CircularProgress from "@material-ui/core/CircularProgress";
import Linkify from "react-linkify";
import UserDetails from "./userDetails";
var linkify = require("linkify-it")();
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Attachments from "./Attachments";
import Like from "./like";

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
  postInput: {
    height: 36,
    border: `1px solid ${theme.palette.text.mineShaft}`,
    "&::focus": {
      border: "none",
    },
  },
  btn: { textTransform: "none", fontWeight: 400 },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

const Feed = ({ group, enroll, personal, feed }) => {
  const { authUser } = useAuth();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(null);
  const [commentActive, setCommentActive] = useState(false);
  const [activePost, setActivePost] = useState(0);
  const [selectedPost, setselectedPost] = useState(0);

  const handleCommentBox = (id) => {
    dispatch(getComments(id));
    setActivePost(id);
    setCommentActive(true);
  };

  //post state
  const [postText, setPostText] = useState("");
  //handler to setPostText
  const postTextHandler = (value) => {
    setPostText(value);
  };

  //newsfeed post handler
  const submitHandler = (e) => {
    e.preventDefault();
    //feed data to post
    const commentData = {
      comment_text: postText,
    };
    dispatch(addComment(activePost, commentData));
    setPostText("");
  };

  //destructure feed array to render
  let feedPosts;
  if (feed) {
    feedPosts = [].concat(...feed);
    //sort by time
    feedPosts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  const { comments, isLoading } = useSelector(({ comment }) => comment);

  //post 3 dots open/close
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setselectedPost(event.currentTarget.value);
    setAnchorEl(event.currentTarget);
  };
  //post 3 dots menu close
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  //post delete func
  const postDeleteHandler = () => {
    console.log(selectedPost);
    setloading(true);
    let updatedFeed = feed.map((k) => k.filter((e) => e.id !== selectedPost));
    mutate("/newsfeed/follower/", updatedFeed, true);
    httpClient
      .delete(`/newsfeed/post/?post_id=${selectedPost}`)
      .then((res) => trigger("/newsfeed/follower/"))
      .catch((e) => console.log(e));
    setloading(false);
    setAnchorEl(null);
  };
  //edit post
  const [editPost, seteditPost] = useState(false);

  const postEditHandler = () => {
    seteditPost(!editPost);
    setAnchorEl(null);
  };
  const submitUpdatedPost = (e) => {
    e.preventDefault();
    setloading(true);
    var updatedFeed = feed.map((el) =>
      el.map((k) => (k.id == selectedPost ? { ...k, post_text: postText } : k))
    );
    mutate("/newsfeed/follower/", updatedFeed, true);
    httpClient
      .put(`/newsfeed/post/?post_id=${selectedPost}`, {
        post_text: postText,
      })
      .then((res) => trigger("/newsfeed/follower/"))
      .catch((e) => console.log(e));
    setloading(false);

    seteditPost(false);
  };

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
                  <UserDetails
                    courseId={feed.posted_on}
                    username={feed.user}
                    time={feed.timestamp}
                  />
                </Box>
                {authUser == feed.user && (
                  <Box>
                    <IconButton
                      value={feed.id}
                      onClick={(e) => handleClick(e)}
                      color="secondary"
                      className={classes.appbar_rightIcon}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                )}
                <Menu
                  elevation={1}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  open={open}
                  onClose={handleClose}

                  // className={classes.menu}
                >
                  <MenuItem onClick={postEditHandler}>Edit/Update</MenuItem>
                  <MenuItem onClick={postDeleteHandler}>Delete</MenuItem>
                </Menu>
              </Box>
              {editPost && selectedPost == feed.id ? (
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={submitUpdatedPost}
                >
                  <Box display="flex" mt={1}>
                    <Box flexGrow={4} pl={1} pr={1}>
                      <TextField
                        defaultValue={feed.post_text}
                        onChange={(e) => setPostText(e.target.value)}
                        name="post"
                        variant="outlined"
                        required
                        fullWidth
                        id="post"
                        InputProps={{
                          className: classes.postInput,
                        }}
                      />
                    </Box>
                    <Box flexGrow={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        fullWidth
                      >
                        Update
                      </Button>
                    </Box>
                    <Box flexGrow={1} ml={1}>
                      <Button
                        onClick={postEditHandler}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </form>
              ) : (
                <Typography className={classes.status}>
                  <Linkify>{feed.post_text}</Linkify>
                  <Attachments id={feed.id} />
                  {linkify.match(feed.post_text) && (
                    <LinkPreview
                      url={linkify.match(feed.post_text)[0].url}
                      width="100%"
                    />
                  )}
                </Typography>
              )}

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
                {/* <Button
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
                </Button> */}
                <Like postId={feed.id} />
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

                  <CmtList
                    data={comments}
                    renderRow={(comment, index) => (
                      <Comments key={index} comment={comment} />
                    )}
                  />
                </Collapse>
              )}
            </Box>
          </Grow>
        )}
        ListEmptyComponent={
          <ListEmptyResult
            title="No Post Found"
            content="Post and share first!"
          />
        }
      />
      {loading && <PageLoader />}
    </Box>
  );
};

export default Feed;
