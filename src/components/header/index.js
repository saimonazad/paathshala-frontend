import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

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
  Divider,Tabs,Tab
} from "@material-ui/core";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  cover: {
    position: "relative",
    height: 275,
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
    height: 175,
    width: 175,
    top: -16.5,
    left: "50%",
    position: "absolute",
    transform: "translate(-50%,-50%)",
  },
  details: {
    textAlign: "center",
    marginTop: 60,
  },
  actions: {
    position: "absolute",
    right: 10,
    bottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
    "& > * + *": {
      marginLeft: theme.spacing(1),
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
}));

const Header = (props) => {
  const { className, ...rest } = props;
  const { match, history } = props;

  const classes = useStyles();

  const user = {
    name: "Shen Zhi",
    bio: "Web Developer",
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

  //tabs
//   const { id, tab } = match.params;
const tab ="timeline"
  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: "timeline", label: "Timeline" },
    { value: "connections", label: "Connections" },
    { value: "projects", label: "Projects" },
    { value: "reviews", label: "Reviews" },
  ];

//   if (!tab) {
//     return <Redirect to={`/profile/${id}/timeline`} />;
//   }

//   if (!tabs.find((t) => t.value === tab)) {
//     return <Redirect to="/errors/error-404" />;
//   }

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
          <Typography component="h1" variant="h4">
            {user.name}
          </Typography>
          <Typography component="h2" gutterBottom variant="overline">
            {user.bio}
          </Typography>
          <Typography component="h2" gutterBottom variant="overline">
            {user.bio}
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.actions}>
            {connectedStatus === "not_connected" && (
              <Button
                color="primary"
                onClick={handleConnectToggle}
                variant="contained"
              >
                <PersonAddIcon className={classes.personAddIcon} />
                Add connection
              </Button>
            )}
            {connectedStatus === "pending" && (
              <Button
                className={classes.pendingButton}
                onClick={handleConnectToggle}
                variant="contained"
              >
                <PersonAddIcon className={classes.personAddIcon} />
                Pending connection
              </Button>
            )}
          </div>
        </Hidden>
      </div>
      <div>
        <div className={classes.inner}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {tab === "timeline" &&" <Timeline />"}
            {tab === "connections" && "<Connections />"}
            {tab === "projects" && "<Projects />"}
            {tab === "reviews" && "<Reviews />"}
          </div>
        </div>
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
