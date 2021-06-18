import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../newsFeed/feeds";
import Following from "./following";
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

const Posts = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Info />
        <Info />
        <Info />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.posts}>
        <Following />
        <Feeds />
      </Grid>
    </Grid>
  );
};

export default Posts;
