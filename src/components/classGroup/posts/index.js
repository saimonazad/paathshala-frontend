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
import Notice from "./notice";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import RatingClass from "./rating";
import Following from "./following";
import { Grid, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * > *": {
      margin: theme.spacing(2, 0),
    },
  },
  posts: {
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(-4) },
  },
  fab: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
  },
}));

const Posts = ({ user, courseInfo }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  let urlParam = router.query;
  let courseId = urlParam.slug[0];
  //get newsfeed post
  const {
    data: feed,
    error,
    mutate,
  } = useSWR(`/newsfeed/post/?posted_on=${courseId}`, fetcher);

  return (
    <div className={classes.root}>
      <Notice courseInfo={courseInfo} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <RatingClass courseInfo={courseInfo} />
        </Grid>
        <Grid item xs={8}>
          <Following />
        </Grid>
      </Grid>
      <PostCard feed={feed} mutate={mutate} />
      <Feeds feed={feed} mutate={mutate} />
      <Button
        className={classes.fab}
        color="primary"
        aria-label="add"
        variant="outlined"
      >
        Join Class
      </Button>
    </div>
  );
};

export default Posts;
