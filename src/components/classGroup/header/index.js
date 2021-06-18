import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
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
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
//components
import ProfileTab from "../profileTab";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.secondary.main}`,
    "&  > *": {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },

  container: {
    padding: theme.spacing(2, 3),
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

  profileLinks: {
    padding: theme.spacing(0, 1),
  },
}));

const Header = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.container}>
        <div className={classes.details}>
          <Typography
            component="h2"
            variant="h4"
            className={classes.details__name}
            gutterBottom
          >
            Ashiqur Rahman
          </Typography>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            className={classes.details__bio}
          >
            Lecturer | Bangla
          </Typography>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            className={classes.details__work}
          >
            Dhaka Commerce College
          </Typography>
        </div>
      </div>
      <div className={classes.profileLinks}>
        <Divider />
        <ProfileTab tabvalue={props.tabvalue} setTabValue={props.changetab} />
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
