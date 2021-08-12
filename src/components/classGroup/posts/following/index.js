import React from "react";
import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import CmtAvatarGroup from "../../../../../@coremat/CmtAvatarGroup";
import CmtAvatar from "../../../../../@coremat/CmtAvatar";

import useSWR from "swr";
import { fetcher } from "../../../../services/fetcher";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.3),
    color: theme.palette.text.mineShaft,
  },
  follower: {
    "& .MuiAvatar-root": {
      marginRight: theme.spacing(0.5),
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    "& p": {
      marginLeft: theme.spacing(1),
    },
  },
  titleRoot: {
    color: theme.palette.common.white,
    fontSize: 14,
  },
  avatarRoot: {
    marginTop: 2,
    marginBottom: 2,
  },
  avatar: {
    "@media screen and (min-width: 1280px) and (max-width: 1368px)": {
      width: 30,
      height: 36,
    },
    [theme.breakpoints.up("md")]: {
      width: 40,
      height: 40,
    },
    [theme.breakpoints.down("md")]: {
      width: 38,
      height: 38,
    },
    [theme.breakpoints.up("xl")]: {
      width: 56,
      height: 56,
    },
    [theme.breakpoints.down("xs")]: {
      width: 40,
      height: 40,
    },
  },
}));
const Following = () => {
  const theme = useTheme();

  const classes = useStyles();
  const { data, error } = useSWR(`/course/controller?course_id=1`, fetcher);
  let students = data?.students;

  const moreItemsTooltip = (data) => (
    <CmtList
      data={data}
      renderRow={(item, index) => {
        return (
          <CmtObjectSummary
            key={index}
            avatar={
              <CmtAvatar
                className={classes.avatarRoot}
                size={20}
                // src={item.profilePic}
                alt={item.student}
              />
            }
            title={item.student}
            titleProps={{ className: classes.titleRoot }}
          />
        );
      }}
    />
  );
  return (
    <Box
      bgcolor="background.box"
      boxShadow={2}
      borderRadius={4}
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography>Enrolled Students</Typography>
      </Box>
      <CmtAvatarGroup
        classes={{ avatar: classes.avatar }}
        items={students}
        srcKey="profilePic"
        spacing={1}
        max={6}
        size="small"
        titleKey="name"
        renderItemSummary={(item) => (
          <React.Fragment>
            <Typography color="inherit">{item.student}</Typography>
            <p className={"pb-2"}>{"It's very engaging. Right?"}</p>
            <CmtAvatar
              // src={item.profilePic}
              alt={item.student}
              variant="rounded"
              size={125}
            />
          </React.Fragment>
        )}
        renderMore={(restItems) => moreItemsTooltip(restItems)}
      />
    </Box>
  );
};

export default Following;
