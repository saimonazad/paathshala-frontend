import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import useSWR, { mutate, trigger } from "swr";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    padding: theme.spacing(2),
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
const Teacher = ({ user }) => {
  const classes = useStyles();

  const fetcher = (url) => httpClient.get(url).then((res) => res.data);

  const followCheckUrl = `${process.env.BACKEND_URL}/users/follow_check/?username=${user.username}`;
  const { data, error } = useSWR(followCheckUrl, fetcher);

  //follow a user
  async function followHandler(values) {
    mutate(followCheckUrl, values, false);
    await httpClient
      .post(`${process.env.BACKEND_URL}/users/follow/`, {
        followed: `${user.username}`,
      })
      .then((res) => res.data);
    trigger(followCheckUrl);
  }
  //delete follw
  async function unfollowHandler(values) {
    const deletefollowUrl = `${process.env.BACKEND_URL}/users/follow/${values.id}`;
    mutate(followCheckUrl, values, false);
    await httpClient.delete(deletefollowUrl).then((res) => res.data);
    trigger(followCheckUrl);
  }

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.header}
        alignItems="center"
      >
        <Box display="flex">
          <Avatar src="" className={classes.avatar} />
          <Box>
            <Typography component="h3">
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography component="p" variant="subtitle2">
              {user?.bio}
            </Typography>
          </Box>
          <div>
            <StarIcon className={classes.startIcon} />
            <Typography component="span">{user?.rating}</Typography>
            <Typography component="span">({user?.rating_count})</Typography>
          </div>
        </Box>
        {data?.follow == true ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => unfollowHandler({ follow: false, id: data.id })}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => followHandler({ follow: true, id: data?.id })}
          >
            Follow
          </Button>
        )}
        {/* {follow === true && user === user.username ? (
          <Button color="primary" variant="contained">
            Follow
          </Button>
        ) : (
          <Button color="primary" variant="contained">
            Un Follow
          </Button>
        )} */}
      </Box>
    </Box>
  );
};

export default Teacher;
