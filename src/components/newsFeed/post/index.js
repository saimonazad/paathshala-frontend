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
    height: 36,
    
    textTransform: 'none',
    fontWeight: 400
  },
  avatar: {
    alignSelf: "center",
  },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

const Post = (props) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex">
        <Box pr={1}>
          <Avatar src="" className={classes.avatar} />
        </Box>
        <Box flexGrow={4} pl={1} pr={1}>
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
        </Box>
        <Box flexGrow={1} pl={1}>
          <Button
            variant="contained"
            color="primary"
            className={classes.postInput}
            fullWidth
          >
            Post
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Post;
