import React from "react";
import { Box, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.6),
    color: theme.palette.text.mineShaft,
  },
  follower: {
    "& .MuiAvatar-root": {
      marginRight: theme.spacing(0.5),
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    "& p": {
      marginLeft: theme.spacing(1),
    },
  },
  button: {
    textTransform: "none",
  },
}));
const Rating = () => {
  const classes = useStyles();

  return (
    <Box
      bgcolor="background.box"
      boxShadow={2}
      borderRadius={4}
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      justifyItems="center"
    >
      <Box>
        <Typography>4.5/5 36 </Typography>
      </Box>
      <Box display="flex" alignItems="center" className={classes.follower}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Give Ratings
        </Button>
      </Box>
    </Box>
  );
};

export default Rating;
