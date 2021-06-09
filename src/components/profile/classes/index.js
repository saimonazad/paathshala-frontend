import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    //   padding: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(2),
    "& h1": {
      fontSize: 25,
      fontWeight: 500,
      color: theme.palette.common.white,
    },
    "& span": {
      fontSize: 18,
      fontWeight: 400,
      color: theme.palette.common.white,
      margin: theme.spacing(0,0.3)
    },
  },
  startIcon: {
    color: theme.palette.other.star,
    verticalAlign: "bottom",
  },
}));

const Classes = () => {
  const classes = useStyles();

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Classes</Typography>
        <div>
          <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Classes;
