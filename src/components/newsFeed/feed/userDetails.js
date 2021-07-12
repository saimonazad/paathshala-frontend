import React from "react";
import { Typography, makeStyles, Box } from "@material-ui/core/";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import Link from "next/dist/client/link";
const useStyles = makeStyles((theme) => ({
  profile__name: {
    fontWeight: 600,
    fontSize: theme.spacing(2),
    color: theme.palette.common.black,
  },
}));
const UserDetails = ({ username, courseId }) => {
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
    <Box display="flex">
      <Link href={`/u/${username}`}>
        <Typography component="h2" className={classes.profile__name}>
          {user ? user[0]?.first_name : ""} {user ? user[0]?.last_name : ""}
        </Typography>
      </Link>
      {course && (
        <Link href={`/class/${course[0]?.id}`}>
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
  );
};

export default UserDetails;
