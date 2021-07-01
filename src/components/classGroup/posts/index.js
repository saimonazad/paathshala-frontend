import React, { useEffect } from "react";
import { makeStyles, Grid, Box } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../shared/feeds";
import Following from "./following";
import PostCard from "../../shared/postCard";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../../authentication";
import Rating from "./rating";
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

const Posts = ({ user }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasicInfo());
    dispatch(getWorkInfo());
    dispatch(getAcademicInfo());
  }, [dispatch]);

  return (
    <Box container className={classes.root} >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Rating />
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
