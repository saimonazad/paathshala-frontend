import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import {
  Avatar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Snackbar,
  Tooltip,
  colors,
  Divider,
  Box,
  Tabs,
  Tab,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
//components
import ProfileTab from "../profileTab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.secondary.main}`,
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
}));

const Header = (props) => {
  const router = useRouter();
  const { className, ...rest } = props;
  const classes = useStyles();
  //course info
  const classInfoUrl = `/course/info?course_id=${router.query.id}`;
  const { data: classInfo, error } = useSWR(classInfoUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    refreshInterval: 0,
  });
  if (error) {
    return <h6>Error loadinh=g</h6>;
  }
  const user = {
    name: "Ashiqur Rahman",
    bio: "Lecturer | Bangla",
    work: "Dhaka Commerce College",
    avatar:
      "https://img.favpng.com/18/18/18/computer-icons-icon-design-avatar-png-favpng-X29r5WhWMXVYvNsYXkR4iBgwf.jpg",
    cover:
      "https://static-cse.canva.com/blob/129490/steve-roe-734236-unsplash.64603fa0.jpg",
    connectedStatus: "not_connected",
  };

  const [connectedStatus, setConnectedStatus] = useState(user.connectedStatus); // if rejected do not show the button
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (classInfo) {
    return (
      <div {...rest} className={clsx(classes.root, className)}>
        <Box
          className={classes.title}
          display="flex"
          alignContent="center"
          justifyContent="center"
        >
          {classInfo[0].user} | Bangla | Section 1
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
          <Typography className={classes.time}>4:30 PM - 5:30 PM</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography className={classes.divider} className={classes.tag}>
            <CalendarTodayIcon className={classes.icon} />
            Date
          </Typography>
          <Typography className={classes.time}>4:30 PM - 5:30 PM</Typography>
        </Box>
        <div className={classes.container}>
          <div className={classes.details}>
            <Typography
              component="h2"
              gutterBottom
              variant="overline"
              className={classes.details__work}
            >
              The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
              ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
              quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox
              nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
              Bright vixens jump; dozy fowl quack
            </Typography>
          </div>
        </div>
        <div className={classes.profileLinks}>
          <Divider />
          <ProfileTab
            tabvalue={props.tabvalue}
            setTabValue={props.changetab}
            follow={props.followHandler}
            user={props.user}
          />
        </div>
      </div>
    );
  }
  return <CircularProgress color="secondary" />;
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
