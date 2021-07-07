import {
  Box,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import CmtList from "../../../../@coremat/CmtList";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";

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
      fontWeight: 400,
    },
  },
}));
const Class = ({ course }) => {
  const classes = useStyles();

  // const getClassesofUser = `/course/info?type=user&username=${username}`;
  // const { data, error } = useSWR(getClassesofUser, fetcher, {
  //   revalidateOnFocus: false,
  //   shouldRetryOnError: false,
  //   refreshInterval: 0,
  // });
  // console.log(course)
  
  return (
    <>
      <CmtList
        data={course}
        renderRow={(course, index) => (
          <Box
            key={index}
            mb={1.5}
            borderRadius={4}
            display="flex"
            justifyContent="space-between"
            className={classes.class}
            alignItems="center"
          >
            <Typography>{course.coursename}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>{course.study_level}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>{course.days}</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>
              {course.start_time} - {course.end_time}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Button
              href={`/class/${course.id}`}
              variant="contained"
              color="primary"
            >
              View
            </Button>
          </Box>
        )}
      />
    </>
  );
};

export default Class;
