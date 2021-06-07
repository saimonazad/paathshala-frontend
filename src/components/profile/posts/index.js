import React from "react";
import { Container, makeStyles,Grid } from "@material-ui/core";
import InfoContainer from "../infoContainer";

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
    <Grid container className={classes.root}>
      <Grid item xs={4}>
        <InfoContainer />
        <InfoContainer />
        <InfoContainer />
      </Grid>
      <Grid item xs={8}>
        2
      </Grid>
    </Grid>
  );
};

export default Posts;
