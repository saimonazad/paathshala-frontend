import React, { useEffect, useState } from "react";
import PostCard from "./postCard";
import Feeds from "./feeds";
//feed action -redux
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../../../redux/actions/WallApp";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import { useRouter } from "next/router";
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
  const router = useRouter();
  let urlParam = router.query;
  let courseId = urlParam.slug[0];
  //get newsfeed post
  const { data: feed, error,mutate } = useSWR(
    `/newsfeed/post/?posted_on=${courseId}`,
    fetcher
  );

  return (
    <div className={classes.root}>
      <PostCard feed={feed} mutate={mutate} />
      <Feeds feed={feed} mutate={mutate} />
    </div>
  );
};

export default NewsFeed;
