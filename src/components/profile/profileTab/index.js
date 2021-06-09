import React, { useState } from "react";

import { Box, Tabs, Tab, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    padding: 0,
    margin: 0,
    minWidth: 0,
    padding: theme.spacing(0, 1),
    textTransform: "none",
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
    },
  },
  tabText: {
    color: theme.palette.other.DoveGray,
  },
  profileLinks__right: {
    alignSelf: "center",
    "& button": {
      marginLeft: theme.spacing(1),
      fontWeight: "normal",
      textTransform: "none",
    },
  },
}));

const ProfileTab = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("posts");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setTabValue(newValue);
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Tabs
        variant="standard"
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        className={classes.tabText}
      >
        <Tab className={classes.tabRoot} value="posts" label="Post" />
        <Tab className={classes.tabRoot} value="classes" label="Classes" />
        <Tab className={classes.tabRoot} value="about" label="About" />
        <Tab className={classes.tabRoot} value="followers" label="Followers" />
        <Tab className={classes.tabRoot} value="following" label="Following" />
        <Tab className={classes.tabRoot} value="enrolled" label="Enrolled In" />
      </Tabs>
      <div className={classes.profileLinks__right}>
        <Button color="primary" variant="contained">
          Send Message
        </Button>
        <Button color="primary" variant="contained">
          Follow
        </Button>
      </div>
    </Box>
  );
};

export default ProfileTab;
