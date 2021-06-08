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
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Post from "../post";
import Comments from "../comments";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
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
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
    marginRight: theme.spacing(1.2),
  },
  btn__group: {
    marginRight: theme.spacing(2),
  },
  divider: {},
  status: {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.mineShaft,
  },
  appbar_rightIcon: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  iconMiddle: { verticalAlign: "top" },
}));

const Feed = (props) => {
  const classes = useStyles();

  return (
    <Box
      bgcolor="background.box"
      boxShadow={2}
      borderRadius={4}
      className={classes.root}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Box>
            <Avatar src="" inline className={classes.profile__img} />
          </Box>
          <Box>
            <Typography component="h2" className={classes.profile__name}>
              Majharul Islam
              {props.group && (
                <>
                  <PlayArrowIcon className={classes.iconMiddle} />
                  Bangla Tution
                </>
              )}
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
      <Typography className={classes.status}>
        Who's the best physics teacher for HSC? Any suggestions? Who's the best
        physics teacher for HSC? Any suggestions? Who's the best physics teacher
        for HSC? Any suggestions?
      </Typography>
      <Divider className={classes.divider} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        ml={1}
        mr={1}
        p={1}
      >
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
          <label htmlFor="icon-button-file">
            <IconButton
              className={classes.btn__like}
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <FontAwesomeIcon icon={faShare} style={{ fontSize: "18px" }} />
            </IconButton>
            2 Shares
          </label>
        </Box>
      </Box>
      <Divider className={classes.divider} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        ml={1}
        mr={1}
      >
        <Button
          size="small"
          color="secondary"
          classes={{ root: classes.button, label: classes.label }}
          startIcon={
            <ThumbUpIcon
              style={{ fontSize: "27px", verticalAlign: "middle" }}
            />
          }
        >
          Like
        </Button>
        <Button
          size="small"
          color="secondary"
          classes={{ root: classes.button, label: classes.label }}
          startIcon={<ChatBubbleIcon style={{ fontSize: "27px" }} />}
        >
          Comment
        </Button>
        <Button
          size="small"
          color="secondary"
          classes={{ root: classes.button, label: classes.label }}
          startIcon={
            <FontAwesomeIcon icon={faShare} style={{ fontSize: "27px" }} />
          }
        >
          Share
        </Button>
      </Box>

      <Divider className={classes.divider} />
      <Box p={1}>
        <Post />
      </Box>
      <Divider className={classes.divider} />
      <Box p={1}>
        <Comments />
      </Box>
    </Box>
  );
};

export default Feed;
