import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Container,
  Box,
  Chip,
  Grid,
  Avatar,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  class__time: {
    borderRadius: "4px",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    margin: theme.spacing(1, 1, "auto", 0),
  },
  postInput: {
    height: 38,
  },
  avatar: {
    alignSelf: "center",
  },
}));

const Announcement = () => {
  const classes = useStyles();

  return (
    <Box border={1} boxShadow={2} bgcolor="background.box">
      <Typography variant="h6">Good Afternoon, Khalid</Typography>
      <Typography variant="body2">You have 2 class today</Typography>
      <Chip className={classes.class__time} label="Physics at 7:00 PM" />
      <Chip className={classes.class__time} label="Physics at 7:00 PM" />{" "}
    </Box>
  );
};

export default Announcement;
