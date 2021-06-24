import {
  Button,
  makeStyles,
  Grid,
 
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React from "react";
import Post from "../post";

const useStyles = makeStyles((theme) => ({
  postInput: {
    height: 38,
  },
  avatar: {
    alignSelf: "center",
  },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  label:{
    textTransform: 'none',
    fontWeight: 400
  }
}));

const PostMediaUpload = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          size="small"
          color="secondary"
          classes={{ root: classes.button, label: classes.label }}
          startIcon={<ImageIcon />}
        >
          Upload Photos
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="small"
          color="secondary"
          classes={{ root: classes.button, label: classes.label }}
          startIcon={<ImageIcon />}
        >
          Upload Videos
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostMediaUpload;
