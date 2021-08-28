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
import { useAuth } from "../../../../authentication";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import { toast } from "react-toastify";
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
      backgroundColor: "white",
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
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
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
    fontSize: 13,
    lineHeight: 1.2,
    color: "black",
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },
  user__details: {
    textTransform: "none",
    fontSize: 12,
    lineHeight: 1.4,
    color: theme.palette.text.mineShaftLight,
    [theme.breakpoints.up("sm")]: {
      fontSize: 13,
    },
  },
  details__work: {
    textTransform: "none",
    fontSize: 12,
    lineHeight: 1.2,
    color: theme.palette.other.DoveGray,
    [theme.breakpoints.up("sm")]: {
      fontSize: 10,
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
  picture: {
    display: "block",
    position: "relative",
    "&:hover": {
      "& $changeProfilePicButton": {
        visibility: "visible",
      },
    },
    marginBottom: theme.spacing(10),
  },
  changeProfilePicButton: {
    visibility: "hidden",
    position: "absolute",

    // bottom: theme.spacing(4),
    right: "45%",
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.white,
    [theme.breakpoints.down("md")]: {
      top: theme.spacing(3),
      bottom: "auto",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

const Header = (props) => {
  const { className, ...rest } = props;
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const { pname } = router.query;
  const { authUser } = useAuth();

  const [coverFile, setcoverFile] = useState();
  const handleCoverPic = (e) => {
    httpClient
      .get(`/users/profile/`)
      .then((res) => {
        const formData = new FormData();
        formData.append("lives_in_char", res.data[0].lives_in_char);
        formData.append("bio", res.data[0].bio);
        formData.append("gender", res.data[0].gender);
        formData.append("phoneNo", res.data[0].phoneNo);
        formData.append("referral_code", "");
        formData.append("cover", e.target.files[0]);
        httpClient
          .post(`/users/profile/?cover_picture=yes`, formData)
          .then((res) => {
            toast.success("Cover uploaded successfully", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            props.mutateProfile();
          });
      })
      .catch((e) =>
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };
  const handleProfilePic = (e) => {
    httpClient
      .get(`/users/profile/`)
      .then((res) => {
        const formData = new FormData();
        formData.append("lives_in_char", res.data[0].lives_in_char);
        formData.append("bio", res.data[0].bio);
        formData.append("gender", res.data[0].gender);
        formData.append("phoneNo", res.data[0].phoneNo);
        formData.append("referral_code", "");
        formData.append("picture", e.target.files[0]);
        httpClient
          .post(`/users/profile/?profile_picture=yes`, formData)
          .then((res) => {
            toast.success("Profile picture uploaded successfully", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            props.mutateProfile();
          });
      })
      .catch((e) =>
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${props.user.cover})` }}
      >
        <input
          accept="image/*"
          type="file"
          name="file"
          style={{ display: "none" }}
          id="cover-upload"
          onChange={(e) => handleCoverPic(e)}
        />

        {authUser == pname && (
          <label htmlFor="cover-upload">
            <Button
              className={classes.changeButton}
              variant="contained"
              component="span"
            >
              <AddPhotoIcon className={classes.addPhotoIcon} />
              Change Cover
            </Button>
          </label>
        )}
      </div>
      <div className={classes.container}>
        <div className={classes.picture}>
          <Avatar
            alt="Person"
            className={classes.avatar}
            src={props.user.picture}
          />
          <input
            accept="image/*"
            type="file"
            name="file"
            style={{ display: "none" }}
            id="pic-upload"
            onChange={(e) => handleProfilePic(e)}
          />
          {authUser == pname && (
            <label htmlFor="pic-upload">
              <Button
                className={classes.changeProfilePicButton}
                variant="contained"
                component="span"
              >
                <AddPhotoIcon className={classes.addPhotoIcon} />
              </Button>
            </label>
          )}
        </div>
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
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            className={classes.user__details}
          >
            <strong>Username</strong> : {pname} <br />
            <strong>Followed By</strong> : {props.count} people
          </Typography>
        </div>
        <div className={classes.actions}>
          <SocialMediaButtons
            url={`${window.location}`}
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
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
