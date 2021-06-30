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
import moment from "moment";
import React from "react";
import { useAuth } from "../../../../authentication";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.light,
    "& h1": {
      fontWeight: 500,
    },
    padding: theme.spacing(1, 2),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  class__time: {
    borderRadius: "4px",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  postInput: {
    height: 38,
  },
  avatar: {
    alignSelf: "center",
  },
  class__number: {
    padding: theme.spacing(1, 2),
    color: theme.palette.text.mineShaft,
  },
  class__box: {
    padding: theme.spacing(0, 2, 2),
  },
}));

const Announcement = () => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const greet = () => {
    let message;
    let hrs = moment().format("HH");
    if (hrs >= 6 && hrs < 12) message = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) message = "Good Afternoon";
    else message = "Good Evening";
    return message;
  };

  return (
    <Box border={2} boxShadow={2} bgcolor="background.box" borderRadius={4}>
      <Box className={classes.header}>
        <Typography variant="h5" component="h1">
          {greet()},{" "}
          {authUser
            ? JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name
            : ""}
        </Typography>
      </Box>
      <Typography variant="body2" className={classes.class__number}>
        You have 2 class today
      </Typography>

      <Box className={classes.class__box}>
        <Chip className={classes.class__time} label="Physics at 7:00 PM" />
        <Chip className={classes.class__time} label="Physics at 7:00 PM" />
      </Box>
    </Box>
  );
};

export default Announcement;
