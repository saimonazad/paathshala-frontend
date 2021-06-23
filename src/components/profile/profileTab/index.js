import React, { useEffect, useState } from "react";
import useSWR, { mutate, trigger } from "swr";

import {
  Box,
  Tabs,
  Tab,
  Button,
  makeStyles,
  FormControl,
  Select,
} from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { NativeSelect } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
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
    margin: theme.spacing(0.7, 0),
    alignSelf: "center",
    "& button": {
      marginLeft: theme.spacing(1),
      fontWeight: "normal",
      textTransform: "none",
      fontSize: 12,
      [theme.breakpoints.up("sm")]: {
        fontSize: 14,
      },
    },
  },
  formControl: {
    justifyContent: "flex-end",
  },
  select: {
    paddingBottom: 3,
    color: theme.palette.secondary.main,
    fontWeight: 600,
    "& :focus": { backgroundColor: theme.palette.common.white },
  },
}));

const ProfileTab = ({ tabvalue, setTabValue, user, follow }) => {
  const [session] = useSession();
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeMobile = (event, newValue) => {
    setTabValue(event.target.value);
  };

  //useswr
  const router = useRouter();
  const { pname } = router.query;

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      })
      .then((res) => res.data);

  const followCheckUrl = `https://paathshala.staging.baeinnovations.com/users/follow_check/?username=${pname}`;
  const { data, error } = useSWR(followCheckUrl, fetcher);
  console.log(data);

  //follow a user
  async function followHandler(values) {
    mutate(followCheckUrl, values, false);
    await axios
      .post(
        "https://paathshala.staging.baeinnovations.com/users/follow/",
        {
          followed: `${pname}`,
        },
        {
          headers: {
            Authorization: `token ${session.user.token}`,
          },
        }
      )
      .then((res) => res.data);
    trigger(followCheckUrl);
  }
  //delete follw
  async function unfollowHandler(values) {
    const deletefollowUrl = `https://paathshala.staging.baeinnovations.com/users/follow/${values.id}`;
    mutate(followCheckUrl, values, false);
    await axios
      .delete(deletefollowUrl, {
        headers: {
          Authorization: `token ${session.user.token}`,
        },
      })
      .then((res) => res.data);
    trigger(followCheckUrl);
  }

  return (
    <Box display="flex" justifyContent="space-between">
      {user.username == session.user.name && (
        <>
          <Hidden xsDown>
            <Tabs
              variant="standard"
              value={tabvalue}
              onChange={handleChange}
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className={classes.tabText}
            >
              <Tab className={classes.tabRoot} value="posts" label="Post" />
              <Tab
                className={classes.tabRoot}
                value="classes"
                label="Classes"
              />
              <Tab className={classes.tabRoot} value="about" label="About" />
              <Tab
                className={classes.tabRoot}
                value="followers"
                label="Followers"
              />
              <Tab
                className={classes.tabRoot}
                value="following"
                label="Following"
              />
              <Tab
                className={classes.tabRoot}
                value="enrolled"
                label="Enrolled In"
              />
            </Tabs>
          </Hidden>
          <Hidden smUp>
            <FormControl className={classes.formControl}>
              <NativeSelect
                className={classes.select}
                value={tabvalue}
                onChange={handleChangeMobile}
              >
                <option value="posts">Posts</option>
                <option value="followers">Followers</option>
                <option value="classes">Classes</option>
              </NativeSelect>
            </FormControl>
          </Hidden>
        </>
      )}
      {user.username != session.user.name && (
        <div className={classes.profileLinks__right}>
          <Button color="primary" variant="contained">
            Send Message
          </Button>
          {data?.follow == true ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => unfollowHandler({ follow: false, id: data.id })}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => followHandler({ follow: true, id: data?.id })}
            >
              Follow
            </Button>
          )}
        </div>
      )}
    </Box>
  );
};

export default ProfileTab;
