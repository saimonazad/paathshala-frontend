import React from "react";
import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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
}));
const Following = () => {
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
    >
      <Box>
        <Typography>Following</Typography>
      </Box>
      <Box display="flex" alignItems="center" className={classes.follower}>
        <Avatar src="https://i.pravatar.cc/50?img=1" />
        <Avatar src="https://i.pravatar.cc/50?img=2" />
        <Avatar src="https://i.pravatar.cc/50?img=3" />
        <Avatar src="https://i.pravatar.cc/50?img=4" />
        <Typography>+7</Typography>
      </Box>
    </Box>
  );
};

export default Following;
