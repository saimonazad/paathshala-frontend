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
  Link,
} from "@material-ui/core/";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  profile__name: {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.common.black,
  },
  post__time: {
    fontSize: 14,
    color: theme.palette.text.gray,
  },
  profile__img: {
    marginRight: theme.spacing(2),
  },
  bg: {
    backgroundColor: theme.palette.other.gallery,
    padding: theme.spacing(1),
    borderRadius: 4,
  },
  viewMoreComments: {
    fontWeight: 500,
    fontSize: 16,
    marginTop: theme.spacing(2),
  },
}));
const Comments = ({ comment }) => {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="space-between" m={1}>
        <Box display="flex">
          <Box>
            <Avatar src="" className={classes.profile__img} />
          </Box>
          <Box className={classes.bg}>
            <Typography component="h2" className={classes.profile__name}>
              {comment.user}
            </Typography>
            <Typography component="h3" className={classes.post__time}>
              {comment.comment_text}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography component="h3" className={classes.post__time}>
            {moment(comment.timestamp).fromNow()}
          </Typography>
        </Box>
      </Box>
      {/* <Typography className={classes.viewMoreComments}>
        <Link
          href="#"
          onClick={preventDefault}
          underline="always"
          color="secondary"
        >
          View more comments
        </Link>
        (56)
      </Typography> */}
    </>
  );
};

export default Comments;
