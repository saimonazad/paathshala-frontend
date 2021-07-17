import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
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
import { useSession } from "next-auth/client";
import SocialMediaButtons from "../../facebook-share";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.secondary.main}`,
    "&  > *": {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },

  cover: {
    position: "relative",
    height: 200,
    [theme.breakpoints.up("sm")]: { height: 275 },
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&:before": {
      position: "absolute",
      content: '" "',
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundImage:
        "linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)",
    },
    "&:hover": {
      "& $changeButton": {
        visibility: "visible",
      },
    },
  },
  changeButton: {
    visibility: "hidden",
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.white,
    [theme.breakpoints.down("md")]: {
      top: theme.spacing(3),
      bottom: "auto",
    },
    "&:hover": {
      backgroundColor: colors.blueGrey[900],
    },
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1),
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
  avatar: {
    border: `1px solid ${theme.palette.other.DoveGray}`,
    backgroundColor: "white",
    padding: "7px",
    height: 142,
    width: 142,
    top: -14.5,
    left: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
    [theme.breakpoints.up("sm")]: {
      height: 175,
      width: 175,
      top: -16.5,
    },
  },
  details: {
    textAlign: "center",
    marginTop: 60,
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
}));

const Header = (props) => {
  const { className, ...rest } = props;
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  console.log(`${process.env.BACKEND_URL}${router.asPath}`);
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

  useEffect(() => {
    if (connectedStatus === "pending") {
      setOpenSnackbar(true);
    }
  }, [connectedStatus]);

  const handleConnectToggle = () => {
    setConnectedStatus((connectedStatus) =>
      connectedStatus === "not_connected" ? "pending" : "not_connected"
    );
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${user.cover})` }}
      >
        <Button className={classes.changeButton} variant="contained">
          <AddPhotoIcon className={classes.addPhotoIcon} />
          Change Cover
        </Button>
      </div>
      <div className={classes.container}>
        <Avatar alt="Person" className={classes.avatar} src={user.avatar} />
        <div className={classes.details}>
          <Typography
            component="h1"
            variant="h4"
            className={classes.details__name}
            gutterBottom
          >
            <span style={{ marginRight: "6px" }}>{props.user.first_name}</span>
            <span>{props.user.last_name}</span>
          </Typography>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            className={classes.details__bio}
          >
            {props.user.bio}
          </Typography>
        </div>
        <div className={classes.actions}>
          <SocialMediaButtons
            url={`${process.env.BACKEND_URL}${router.asPath}`}
            text="Check out this profile at Paathshala!"
          />
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

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={6000}
        message={
          <Typography color="inherit" variant="h6">
            Sent connection request
          </Typography>
        }
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
