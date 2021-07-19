import {
  Button,
  Paper,
  Typography,
  makeStyles,
  Container,
  Box,
  Chip,
  Grid,
  Avatar,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.light,
    "& h1": {
      fontWeight: 500,
    },
    padding: theme.spacing(1, 2),
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  class__time: {
    borderRadius: "4px",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
  },
  postInput: {
    height: 38,
  },
  avatar: {
    alignSelf: "center",
  },
  class__number: {
    padding: theme.spacing(1, 2),
    color: theme.palette.text.mineShaft,
  },
  class__box: {
    padding: theme.spacing(0, 2, 2),
  },
}));
let temp = [];

const Announcement = () => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [loading, setloading] = useState(true);
  const [todaysClass, settodaysClass] = useState([]);

  function courseSchedule() {
    httpClient
      .get(
        `/course/enrollmentCheck/?username=${
          JSON.parse(localStorage.getItem("user")).username
        }&type=all`
      )
      .then((res1) => {
        res1.data.map((course) => {
          if (course.course != null) {
            httpClient
              .get(`/course/info?course_id=${course.course}`)
              .then((res) => {
                settodaysClass((prevState) => [
                  ...prevState,
                  {
                    coursename: res.data[0].coursename,
                    start_time: res.data[0].start_time,
                  },
                ]);
              })
              .catch((e) => console.log(e));
          }
        });
        // console.log(todaysClass);

        // setloading(false);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    courseSchedule();
  }, []);

  const greet = () => {
    let message;
    let hrs = moment().format("HH");
    if (hrs >= 6 && hrs < 12) message = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) message = "Good Afternoon";
    else message = "Good Evening";
    return message;
  };

  // if (loading) {
  //   return <div className="App">Loading...</div>;
  // }

  return (
    <Box border={2} boxShadow={2} bgcolor="background.box" borderRadius={4}>
      <Box className={classes.header}>
        <Typography variant="h5" component="h1">
          {greet()},{" "}
          {authUser
            ? JSON.parse(localStorage.getItem("user")).first_name +
              " " +
              JSON.parse(localStorage.getItem("user")).last_name
            : ""}
        </Typography>
      </Box>
      <Typography variant="body2" className={classes.class__number}>
        You have {todaysClass ? todaysClass.length : "no"} class today
      </Typography>

      <Box className={classes.class__box}>
        <CmtList
          data={todaysClass}
          renderRow={(course, index) => (
            <Chip
              key={index}
              className={classes.class__time}
              label={`${course.coursename} at ${course.start_time}`}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default Announcement;
