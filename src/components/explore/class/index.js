import React from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  Avatar,
  Link,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import Class from "./class";

import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
    padding: theme.spacing(2, 2, 1),
    "& > *": {
      marginBottom: theme.spacing(1.5),
    },
  },
  header: {
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

const Classes = () => {
  const classes = useStyles();
  const { users } = useSelector(({ getAllUsers }) => getAllUsers);

  return (
    <>
      <CmtList
        data={users}
        renderRow={(user, index) => (
          <Box
            bgcolor="background.box"
            borderRadius={4}
            className={classes.root}
          >
            <Box display="flex" alignItems="center" className={classes.header}>
              <Avatar src="" className={classes.avatar} />
              <Link href={`/u/${user.username}`}>
                <Typography component="h3">
                  {user?.first_name} {user?.last_name}
                </Typography>
              </Link>
              <div>
                <StarIcon className={classes.startIcon} />
                <Typography component="span">{user?.rating}</Typography>
                <Typography component="span">({user?.rating_count})</Typography>
              </div>
            </Box>
            <Box className={classes.class__list}>
              <Class username={user.username} />
            </Box>
          </Box>
        )}
      />
    </>
  );
};

export default Classes;
