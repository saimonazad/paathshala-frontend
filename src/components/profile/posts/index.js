import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../shared/feeds";
import Following from "./following";
import PostCard from "../../shared/postCard";
import { useAuth } from "../../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";

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

  const { data: basicInfo } = useSWR(`/users/profile/`, fetcher);
  const { data: workInfo } = useSWR(`/users/workinfo/`, fetcher);
  const { data: academicInfo } = useSWR(`/users/academic_info/`, fetcher);

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
