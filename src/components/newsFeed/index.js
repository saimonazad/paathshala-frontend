import React, { useEffect } from "react";
import Announcement from "./announcement";
import PostCard from "./postCard";
import Feeds from "./feeds";
//feed action -redux
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../../redux/actions/WallApp";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

const NewsFeed = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedPosts());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Announcement />
      <PostCard />
      <Feeds />
    </div>
  );
};

export default NewsFeed;
