import React, { useEffect } from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import Info from "./info";
import Feeds from "./feeds";
import Following from "./following";
import PostCard from "./postCard";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../../authentication";
import RatingClass from "./rating";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
//feed action -redux
import {
  getBasicInfo,
  getWorkInfo,
  getAcademicInfo,
} from "../../../redux/actions/profileActions";
//redux store

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * > *": {
      margin: theme.spacing(2, 0),
    },
  },
  posts: {
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(-4) },
  },
}));

const Posts = ({ user, courseInfo }) => {
  const router = useRouter();
  const { authUser } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasicInfo());
    dispatch(getWorkInfo());
    dispatch(getAcademicInfo());
  }, [dispatch]);

  return (
    <Box container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <RatingClass courseInfo={courseInfo} />
        </Grid>
        <Grid item xs={8}>
          <Following />
        </Grid>
      </Grid>
      <PostCard />
      <Feeds />
    </Box>
  );
};

export default Posts;
