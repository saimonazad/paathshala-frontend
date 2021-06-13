import React from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    padding: theme.spacing(2, 2, 0),
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    color: theme.palette.text.mineShaft,

    "& h3": {
      fontSize: 20,
      fontWeight: 500,
      marginRight: theme.spacing(2),
    },
    "& span": {
      fontSize: 14,
      fontWeight: 300,
      margin: theme.spacing(0, 0.3),
    },
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  startIcon: {
    color: theme.palette.other.star,
    verticalAlign: "bottom",
    fontSize: 22,
  },
  class__list: {
    padding: theme.spacing(2, 2, 1),
    "& > *": {
      marginBottom: theme.spacing(1.5),
    },
  },
  class: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1.5, 2),
    "& p": {
      fontWeight: 500,
    },
    "& button": {
      textTransform: "none",
      boxShadow: "0px 3px 12px #00000029",
      padding: theme.spacing(0.6, 5),
      fontWeight: 400,
    },
  },
}));

const Class = () => {
  const classes = useStyles();

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box display="flex" alignItems="center" className={classes.header}>
        <Avatar src="" className={classes.avatar} />
        <Typography component="h3">Ashiqur Rahman</Typography>
        <div>
          <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography>
        </div>
      </Box>
      <Box className={classes.class__list}>
        <Box
          borderRadius={4}
          display="flex"
          justifyContent="space-between"
          className={classes.class}
          alignItems="center"
        >
          <Typography>Chemistry</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>Section 1</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>Mon & Wed</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>07:30 PM - 08:30 PM</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>35(50)</Typography>
          <Divider orientation="vertical" flexItem />
          <Button variant="contained" color="primary">
            View
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Class;
