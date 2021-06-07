import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Container,
  Box,
  Chip,
  Grid,
  Avatar,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React from "react";

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
}));

const Post = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} sm={1} lg={"auto"}>
        <Avatar src="" className={classes.avatar} />
      </Grid>
      <Grid item xs={7} sm={9} lg={9}>
        <TextField
          autoComplete="fname"
          name="fullName"
          variant="outlined"
          required
          fullWidth
          id="fullName"
          autoFocus
          InputProps={{
            className: classes.postInput,
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} lg={2}>
        <Button
          variant="contained"
          color="primary"
          className={classes.postInput}
          fullWidth
        >
          Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default Post;
