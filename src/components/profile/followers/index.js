import React from "react";
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
import CmtGridView from "../../../../@coremat/CmtGridView";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";
import { useAuth } from "../../../../authentication";
import { fetcher } from "../../../services/fetcher";
import useSWR, { mutate, trigger } from "swr";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
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

const Following = ({ type, lists, user }) => {
  const classes = useStyles();
  console.log(lists);
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box alignItems="center" className={classes.header}>
        <Typography component="h1">{type}</Typography>
      </Box>
      <Box className={classes.content}>
        <CmtGridView
          data={lists}
          renderRow={(users, index) => (
            <User
              username={user.username}
              followed={users.follower}
              id={users.id}
            />
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

function User({ username, followed, id }) {
  const classes = useStyles();
  const { authUser } = useAuth();
  const { data: user } = useSWR(
    `/users/userinfo/?username=${followed}`,
    fetcher
  );
  const { data: workInfo } = useSWR(
    `/users/workinfo/?username=${followed}`,
    fetcher
  );
  const { data: academicInfo } = useSWR(
    `/users/academic_info/?username=${followed}`,
    fetcher
  );
  const followCheckUrl = `/users/follow_check/?username=${followed}`;
  const { data: isFollowed } = useSWR(followCheckUrl, fetcher);

  //follow a user
  async function followHandler(values) {
    mutate(followCheckUrl, values, false);
    await httpClient
      .post(`/users/follow/`, {
        followed: `${followed}`,
      })
      .then((res) => res.data);
    trigger(followCheckUrl);
  }
  //delete follw
  async function unfollowHandler(values) {
    const deletefollowUrl = `/users/follow/${values.id}`;
    mutate(followCheckUrl, values, false);
    await httpClient.delete(deletefollowUrl).then((res) => res.data);
    trigger(followCheckUrl);
  }

  return (
    <>
      {user ? (
        <Box display="flex">
          <Avatar src={user[0].picture} />
          <Box ml={2}>
            <Link href={`/u/${followed}`} color="secondary">
              <Typography
                variant="h4"
                style={{ fontSize: 20, fontWeight: 500 }}
              >
                {user[0].first_name} {user[0].last_name}
              </Typography>
              {workInfo?.length > 0 ? (
                <>
                  <Typography variant="subtitle2">
                    {workInfo[0].position}
                  </Typography>
                  <Typography variant="body2">{workInfo[0].company}</Typography>
                </>
              ) : academicInfo?.length > 0 ? (
                <>
                  <Typography variant="subtitle2">
                    {academicInfo[0].degree}
                  </Typography>
                  <Typography variant="body2">
                    {academicInfo[0].institution}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </Link>
            {authUser == username && (
              <>
                {isFollowed?.follow == true ? (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      unfollowHandler({ follow: false, id: isFollowed.id })
                    }
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      followHandler({ follow: true, id: isFollowed?.id })
                    }
                  >
                    Follow
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      ) : (
        <Typography className={classes.name}>{user}</Typography>
      )}
    </>
  );
}

export default Following;
