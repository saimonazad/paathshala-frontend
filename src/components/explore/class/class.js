import {
  Box,
  Typography,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserCourses } from "../../../redux/actions/courseActions";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";

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
const Class = ({ username }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserCourses(username));
  }, []);

  const { courseInfo } = useSelector(({ getCourse }) => getCourse);
  console.log(courseInfo);
  return (
    <>
      {courseInfo[0]?.user == username ? (
        <CmtList
          data={courseInfo}
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
          ListEmptyComponent={
            <ListEmptyResult loader={false} title="No Course Found" />
          }
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Class;
