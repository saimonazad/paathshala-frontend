import React from "react";
import { Typography, makeStyles, Box, Avatar } from "@material-ui/core/";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import Link from "next/dist/client/link";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  profile__name: {
    fontWeight: 600,
    fontSize: theme.spacing(2),
    color: theme.palette.common.black,
  },
  post__time: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.gray,
  },
  profile__img: {
    marginRight: theme.spacing(1),
  },
}));
const UserDetails = ({ username, courseId, time }) => {
  const classes = useStyles();
  //get user details
  const { data: user } = useSWR(
    `/users/userinfo/?username=${username}`,
    fetcher
  );
  //get course name
  const { data: course } = useSWR(
    courseId != "dashboard" ? `/course/info?course_id=${courseId}` : null,
    fetcher
  );
  return (
    <>
      <Avatar
        src={user ? user[0]?.picture : ""}
        className={classes.profile__img}
      />
      <Box>
        <Box display="flex">
          <Link href={`/u/${username}`}>
            <Typography component="h2" className={classes.profile__name}>
              {user ? user[0]?.first_name : ""} {user ? user[0]?.last_name : ""}
            </Typography>
          </Link>

          {course && (
            <Link href={`/c/${course[0]?.id}`}>
              <Typography component="h2" className={classes.profile__name}>
                {courseId != "dashboard" ? (
                  <>
                    <PlayArrowIcon style={{ verticalAlign: "bottom" }} />
                    {course[0]?.coursename}
                  </>
                ) : (
                  ""
                )}
              </Typography>
            </Link>
          )}
        </Box>
        <Typography component="h3" className={classes.post__time}>
          {moment(time).fromNow()}
        </Typography>
      </Box>
    </>
  );
};

export default UserDetails;
