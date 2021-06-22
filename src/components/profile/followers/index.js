import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(2),
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    "& h1": {
      fontSize: 25,
      fontWeight: 500,
      color: theme.palette.common.white,
    },
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const Followers = ({ type, lists }) => {
  const classes = useStyles();
  console.log(lists);
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box alignItems="center" className={classes.header}>
        <Typography component="h1">{type}</Typography>
      </Box>
      <Box className={classes.content}>
        <Grid container>
          {lists.length > 0 ? (
            lists.map((user) => {
              return (
                <Grid item xs={6} spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{user.followed}</Typography>
                      <Typography variant="subtitle2">
                        Bangla Teacher
                      </Typography>
                      <Typography variant="body2">
                        Dhaka Commerce College
                      </Typography>
                      <Button
                        style={{ marginTop: 10 }}
                        variant="contained"
                        color="secondary"
                      >
                        Unfollow
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Typography variant="h6">You have no followers!</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Followers;
