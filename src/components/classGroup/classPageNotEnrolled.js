import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import {
  Avatar,
  Typography,
  Button,
  colors,
  Divider,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import { Star } from "@material-ui/icons";
import { getUserDetail } from "../../redux/actions/ProfileApp";
import { enrollCourse } from "../../redux/actions/courseActions";

//components

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderLeft: `2px solid ${theme.palette.secondary.main}`,
    borderRight: `2px solid ${theme.palette.secondary.main}`,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,

    "&  > *": {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },

  title: {
    backgroundColor: theme.palette.secondary.light,
    fontSize: 22,
    fontWeight: 500,
    color: theme.palette.secondary.main,
    padding: theme.spacing(1.5, 0),
  },

  container: {
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    padding: theme.spacing(2, 3),
    margin: "0 auto",
    position: "relative",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  details: {
    textAlign: "center",
  },
  details__name: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.text.mineShaft,
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
  },
  details__bio: {
    textTransform: "none",
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.text.mineShaftLight,
    [theme.breakpoints.up("sm")]: {
      fontSize: 15,
    },
  },
  details__work: {
    textTransform: "none",
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.other.DoveGray,
    [theme.breakpoints.up("sm")]: {
      fontSize: 15,
    },
    marginBottom: 20,
  },
  actions: {
    position: "absolute",
    right: 10,
    bottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
      position: "relative",
      textAlign: "center",
      right: 0,
      bottom: 0,
    },
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
    "& button": {
      fontWeight: "normal",
      textTransform: "none",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
      },
    },
  },
  pendingButton: {
    color: theme.palette.white,
    backgroundColor: colors.red[600],
    "&:hover": {
      backgroundColor: colors.red[900],
    },
  },
  personAddIcon: {
    marginRight: theme.spacing(1),
  },
  mailIcon: {
    marginRight: theme.spacing(1),
  },

  profileLinks: {
    padding: theme.spacing(0, 1),
  },
  tag: {
    backgroundColor: "#00DFBD",
    fontSize: 14,
    color: "#222222",
    padding: theme.spacing(0.6, 1.7),
    borderRadius: 4,
    marginRight: 5,
  },
  icon: {
    width: 16,
    height: 16,
    verticalAlign: "middle",
    marginRight: 3,
  },
  class__info: {
    padding: "20px 0px",
    "& hr": {
      margin: theme.spacing(0, 2),
    },
    "& p": {
      fontWeight: 600,
    },
  },
  btn: {
    fontSize: 16,
    textTransform: "none",
  },
  divider: {
    margin: theme.spacing(3, 0, 1),
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.mineShaft,
  },
  subtitle1: {
    fontSize: 14,
    color: theme.palette.text.mineShaftLight,
  },
  subtitle2: {
    fontSize: 14,
    color: theme.palette.other.DoveGray,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  rating: {
    fontSize: 16,
    color: theme.palette.text.mineShaft,
  },
}));

const ClassPageNotEnrolled = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { className, ...rest } = props;
  const classes = useStyles();
  const { courseInfo } = useSelector(({ getCourse }) => getCourse);

  useEffect(() => {
    courseInfo[0]?.user != undefined &&
      dispatch(getUserDetail(courseInfo[0]?.user));
  }, [courseInfo]);
  const { userDetail } = useSelector(({ profileApp }) => profileApp);
  console.log(userDetail);
  console.log(courseInfo);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Box
        className={classes.title}
        display="flex"
        alignContent="center"
        justifyContent="center"
      >
        {courseInfo[0]?.coursename} | {courseInfo[0]?.study_level} |{" "}
        {courseInfo[0]?.company}
      </Box>
      <Box
        className={classes.class__info}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography className={classes.tag}>
          <AccessTimeIcon className={classes.icon} />
          Time
        </Typography>
        <Typography className={classes.time}>
          {moment(courseInfo[0]?.start_time, "HH:mm").format("hh:mm A")} -{" "}
          {moment(courseInfo[0]?.end_time, "HH:mm").format("hh:mm A")}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography className={classes.divider} className={classes.tag}>
          <CalendarTodayIcon className={classes.icon} />
          Days
        </Typography>
        <Typography className={classes.time}>{courseInfo[0]?.days}</Typography>
      </Box>
      <div className={classes.container}>
        <div className={classes.details}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            className={classes.details__work}
          >
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
            quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
            quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs
            grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright
            vixens jump; dozy fowl quack
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => {
              try {
                dispatch(enrollCourse(courseInfo[0]?.id));
                router.reload(window.location.pathname);
              } catch (error) {}
            }}
          >
            100Tk to Enroll
          </Button>
        </div>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Avatar className={classes.avatar} />
            <Box>
              <Typography className={classes.name} component="h2">
                {userDetail?.first_name} {userDetail?.last_name}
              </Typography>
              <Typography className={classes.subtitle1} component="p">
                Lecturer | Bangla
              </Typography>
              <Typography className={classes.subtitle2} component="p">
                Dhaka Commerce College
              </Typography>
            </Box>
            <Box className={classes.rating}>
              <Star style={{ verticalAlign: "middle", color: "orange" }} />
              <Typography component="span">4.5/5</Typography>
            </Box>
          </Box>
          <Button
            className={classes.btn}
            variant="outlined"
            color="secondary"
            href={`/u/${userDetail?.username}`}
          >
            View Profile
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ClassPageNotEnrolled;
