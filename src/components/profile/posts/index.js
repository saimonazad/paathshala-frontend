import React from "react";
import { Container, makeStyles,Grid } from "@material-ui/core";
import Info from "../info";
import Feeds from "../../newsFeed/feeds"
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

const Posts = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={4}>
        <Info />
        <Info />
        <Info />
      </Grid>
      <Grid item xs={8}>
        <Feeds/>
      </Grid>
    </Grid>
  );
};

export default Posts;
