import React, { useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../shared/feeds";
import Following from "./following";
import PostCard from "../../shared/postCard";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../../authentication";

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

  const { basicInfo } = useSelector(({ basic }) => basic);
  const { workInfo } = useSelector(({ work }) => work);
  const { academicInfo } = useSelector(({ academic }) => academic);

  // const { basicInfo } = useSelector();
  // const { workInfo } = useSelector((state) => state.work);
  // const { academicInfo } = useSelector((state) => state.academic);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Info data={basicInfo} title="Basic Info" />
        <Info data={workInfo} title="Work Info" />
        <Info data={academicInfo} title="Academic Profile" />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.posts}>
        {authUser.username === user.username ? <Following /> : ""}
        {authUser.username === user.username ? <PostCard /> : ""}
        <Feeds />
      </Grid>
    </Grid>
  );
};

export default Posts;
