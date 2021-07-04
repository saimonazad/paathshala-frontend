import React, { useEffect } from "react";
import Announcement from "./announcement";
import PostCard from "./postCard";
import Feeds from "./feeds";
//feed action -redux
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../../redux/actions/WallApp";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../../../authentication";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

const NewsFeed = () => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedPosts(authUser.username));
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
