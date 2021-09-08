import React from "react";
import {
  Box,
  Avatar,
  Link,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

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
const TeacherInfo = ({ username }) => {
  const classes = useStyles();

  const userProfileUrl = `/users/userinfo/?username=${username}`;
  const { data: user, error } = useSWR(userProfileUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    refreshInterval: 0,
  });
  if (error) {
    return <h6>Error loadinh=g</h6>;
  }
  if (user) {
    return (
      <Box display="flex" alignItems="center" className={classes.header}>
        <Avatar src="" className={classes.avatar} />
        <Link href={`/u/${user[0]?.username}`}>
          <Typography component="h3">
            {user[0]?.first_name} {user[0]?.last_name}
            {user && user[0]?.is_verified && (
              <CheckCircleRoundedIcon
                style={{
                  verticalAlign: "middle",
                  fontSize: "18px",
                  color: "#3578E5",
                }}
              />
            )}
          </Typography>
        </Link>
        <div>
          <StarIcon className={classes.startIcon} />
          <Typography component="span">{user?.rating || 0}</Typography>
          <Typography component="span">({user?.rating_count || 0})</Typography>
        </div>
      </Box>
    );
  }
  return <CircularProgress color="secondary" />;
};

export default TeacherInfo;
