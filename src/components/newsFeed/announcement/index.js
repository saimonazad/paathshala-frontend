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
  header: {
    backgroundColor: theme.palette.secondary.light,
    "& h1": {
      fontWeight: 500,
    },
    padding: theme.spacing(1, 2),
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
  const classes = useStyles();

  return (
    <Box border={2} boxShadow={2} bgcolor="background.box">
      <Box className={classes.header}>
        <Typography variant="h5" component="h1">
          Good Afternoon, Khalid
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
