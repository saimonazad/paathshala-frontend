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
import React from "react";
import Post from "../post";
import PostMediaUpload from "../postMediaUpload";

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
  const classes = useStyles();

  return (
    <Box
      boxShadow={2}
      borderRadius={4}
      bgcolor="background.box"
      className={classes.root}
    >
      <Post />
      <Divider className={classes.divider} />
      <PostMediaUpload />
    </Box>
  );
};

export default PostCard;
