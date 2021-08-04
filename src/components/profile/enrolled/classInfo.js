import React from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  class: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1.5, 2),
    "& p": {
      fontWeight: 500,
    },
    "& button": {
      textTransform: "none",
      boxShadow: "0px 3px 12px #00000029",
      padding: theme.spacing(0.6, 5),
      backgroundColor: theme.palette.common.white,
    },
  },
}));
const ClassInfo = ({ courseId }) => {
  const classes = useStyles();

  const { data: classDetails, error } = useSWR(
    `/course/info?course_id=${courseId}`,
    fetcher
  );
  console.log(classDetails);
  return (
    <>
      {classDetails ? (
        <Box
          mb={2}
          borderRadius={4}
          display="flex"
          justifyContent="space-between"
          className={classes.class}
          alignItems="center"
        >
          <Typography>{classDetails[0]?.subject}</Typography>
          <Divider orientation="vertical" flexItem />
          <User username={classDetails[0]?.user} />
          <Divider orientation="vertical" flexItem />
          <Typography>{classDetails[0]?.study_level}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>{classDetails[0]?.days}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>
            {moment(classDetails[0]?.start_time, "HH:mm").format("hh:mm A")} -{" "}
            {moment(classDetails[0]?.end_time, "HH:mm").format("hh:mm A")}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Button
            variant="outlined"
            color="secondary"
            href={`/c/${classDetails[0]?.id}`}
          >
            View
          </Button>
        </Box>
      ) : (
        "No class found!"
      )}
    </>
  );
};

function User({ username }) {
  const { data: user } = useSWR(
    `/users/userinfo/?username=${username}`,
    fetcher
  );
  console.log(user);
  return (
    <>
      {user ? (
        <Typography>
          {user[0]?.first_name} {user[0]?.last_name}
        </Typography>
      ) : (
        <Typography>{user}</Typography>
      )}
    </>
  );
}

export default ClassInfo;
