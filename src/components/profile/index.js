import { Grid } from '@material-ui/core'
import React from 'react'
import Header from './header'
import InfoContainer from './infoContainer'
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));
const Profile = () => {
      const classes = useStyles();

    return (
      <>
        <Header />
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
      </>
    );
}

export default Profile
