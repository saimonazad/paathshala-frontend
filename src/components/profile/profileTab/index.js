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

const ProfileTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Tab className={classes.tabRoot} value="one" label="Post" />
        <Tab className={classes.tabRoot} value="two" label="Classes" />
        <Tab className={classes.tabRoot} value="three" label="About" />
        <Tab className={classes.tabRoot} value="four" label="Followers" />
        <Tab className={classes.tabRoot} value="five" label="Following" />
        <Tab className={classes.tabRoot} value="six" label="Enrolled In" />
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
