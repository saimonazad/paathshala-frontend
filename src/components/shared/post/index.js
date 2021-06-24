import { Button, makeStyles, Box, Avatar, TextField } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React from "react";

const useStyles = makeStyles((theme) => ({
  postInput: {
    height: 36,
    border: `1px solid ${theme.palette.text.mineShaft}`,
    "&::focus": {
      border: "none",
    },
  },
  btn: { textTransform: "none", fontWeight: 400 },
  avatar: {
    alignSelf: "center",
    
  },
  divider: {
    margin: theme.spacing(2, 0, 1, 0),
  },
}));

const Post = ({ submit, setText, post }) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <form noValidate autoComplete="off" onSubmit={submit}>
        <Box display="flex">
          <Box>
            <Avatar src="" className={classes.avatar} />
          </Box>
          <Box flexGrow={4} pl={1} pr={1}>
            <TextField
              value={post}
              onChange={(e) => setText(e.target.value)}
              name="post"
              variant="outlined"
              required
              fullWidth
              id="post"
              InputProps={{
                className: classes.postInput,
              }}
            />
          </Box>
          <Box flexGrow={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
              fullWidth
            >
              Post
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Post;
