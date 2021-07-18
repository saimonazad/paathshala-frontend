import React, { useEffect, useState } from "react";
import Announcement from "./announcement";
import PostCard from "./postCard";
import Feeds from "./feeds";
//feed action -redux
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../../redux/actions/WallApp";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
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

  //get newsfeed post
  const { data: feed, error } = useSWR("/newsfeed/follower/", fetcher);

  return (
    <div className={classes.root}>
      <Announcement />
      <PostCard feed={feed} />
      <Feeds feed={feed} />
    </div>
  );
};

export default NewsFeed;
