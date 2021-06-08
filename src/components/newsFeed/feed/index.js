import React from "react";
import {
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  Grid,
  Divider,
  Button,
  label,
} from "@material-ui/core/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles((theme) => ({
  
  profile__name: {
    fontWeight: 600,
    fontSize: theme.spacing(2),
    color: theme.palette.common.black,
  },
  post__time: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.gray,
  },
  profile__img: {
    marginRight: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  btn__like: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: theme.spacing(3.75),
    width: theme.spacing(3.75),
    marginRight: theme.spacing(1.2),
  },
  btn__group: {
    marginRight: theme.spacing(2),
  },
}));

const Feed = () => {
  const classes = useStyles();

  return (
    <Box bgcolor="background.box" boxShadow={2} borderRadius={4} >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box>
            <Avatar src="" inline className={classes.profile__img} />
          </Box>
          <Box>
            <Typography component="h2" className={classes.profile__name}>
              Majharul Islam
            </Typography>
            <Typography component="h3" className={classes.post__time}>
              4 hour ago
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton color="secondary" className={classes.appbar_rightIcon}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <label htmlFor="icon-button-file" className={classes.btn__group}>
            <IconButton
              className={classes.btn__like}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ThumbUpIcon style={{ fontSize: "18px" }} />
            </IconButton>
            15
          </label>
          <label htmlFor="icon-button-file">
            <IconButton
              className={classes.btn__like}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ChatBubbleIcon style={{ fontSize: "18px" }} />
            </IconButton>
            15
          </label>
        </Box>
        <Box>
          <IconButton
            className={classes.btn__like}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FontAwesomeIcon icon={faShare} style={{ fontSize: "18px" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
