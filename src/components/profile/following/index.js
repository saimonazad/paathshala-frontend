import React, { useState, useReducer } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Link,
} from "@material-ui/core";
import {
  followHandler,
  followCheckUrl,
  unfollowHandler,
  fetchFollowingUrl,
} from "../../../services/follow";
import { fetcher } from "../../../services/fetcher";
import useSWR from "swr";
import CmtList from "../../../../@coremat/CmtList";
import CmtGridView from "../../../../@coremat/CmtGridView";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(2),
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    "& h1": {
      fontSize: 25,
      fontWeight: 500,
      color: theme.palette.common.white,
    },
  },
  content: {
    padding: theme.spacing(4),
  },
}));

const Following = ({ type, lists }) => {
  const classes = useStyles();

  const { data, error } = useSWR(fetchFollowingUrl, fetcher);

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box alignItems="center" className={classes.header}>
        <Typography component="h1">{type}</Typography>
      </Box>
      <Box className={classes.content}>
        <CmtGridView
          data={data}
          renderRow={(user, index) => (
            <Box display="flex">
              <Avatar />
              <Box ml={2}>
                <Link href={`/u/${user.followed}`} color="secondary">
                  <Typography
                    variant="h4"
                    style={{ fontSize: 20, fontWeight: 500 }}
                  >
                    {user.followed}
                  </Typography>
                </Link>
                <Button
                  style={{ marginTop: 10 }}
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    unfollowHandler(
                      { follow: false, id: user.id },
                      fetchFollowingUrl
                    )
                  }
                >
                  Unfollow
                </Button>
              </Box>
            </Box>
          )}
          itemPadding={10}
          responsive={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
          onEndReached={() => console.log("You have reached end of list")}
          ListEmptyComponent={
            <GridEmptyResult
              loader={false}
              title="No Data Found"
              content="Empty result description"
              actionTitle="Add Content"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Following;
