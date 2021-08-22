import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import CreateClass from "./createClass";
import { useDispatch, useSelector } from "react-redux";
import { getAllPersonalCourses } from "../../../redux/actions/courseActions";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";
import { Link } from "@material-ui/icons";
import moment from "moment";
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
    "& span": {
      fontSize: 16,
      fontWeight: 300,
      color: theme.palette.common.white,
      margin: theme.spacing(0, 0.3),
    },
  },
  startIcon: {
    color: theme.palette.other.star,
    verticalAlign: "bottom",
    fontSize: 28,
  },
  class__list: {
    padding: theme.spacing(2, 2, 1),
    "& > *": {
      marginBottom: theme.spacing(1.5),
    },
  },
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

const Classes = () => {
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSUbmitted] = useState(false);
  function formSubmissionCheck(newValue) {
    setIsFormSUbmitted(newValue);
  }
  useEffect(() => {
    dispatch(getAllPersonalCourses());
  }, [dispatch, isFormSubmitted]);

  const { personalCourses } = useSelector(
    ({ personalCourses }) => personalCourses
  );

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleModal(newValue) {
    setOpen(newValue);
  }
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <div>
          <Typography component="h1" style={{ display: "inline-block" }}>
            Classes
          </Typography>
          <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography>
        </div>
        <Button
          onClick={() => setOpen(!open)}
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: "#AF5698",
            fontSize: 16,
            textTransform: "none",
          }}
        >
          + Add Class
        </Button>
        <CreateClass
          isOpen={open}
          handleModal={handleModal}
          formSubmissionCheck={formSubmissionCheck}
        />
      </Box>
      <Box className={classes.class__list}>
        <CmtList
          data={personalCourses}
          renderRow={(course, index) => (
            <Box
              key={index}
              borderRadius={4}
              display="flex"
              justifyContent="space-between"
              className={classes.class}
              alignItems="center"
              mb={2}
            >
              <Typography>{course.study_level}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>{course.coursename}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>{course.days}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography>
                {moment(course?.start_time, "HH:mm").format("hh:mm A")} -{" "}
                {moment(course?.end_time, "HH:mm").format("hh:mm A")}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Button
                variant="outlined"
                color="secondary"
                href={`/c/${course.id}`}
              >
                View
              </Button>
            </Box>
          )}
          ListEmptyComponent={
            <ListEmptyResult
              title="No Class Found"
              content="Create a class first!"
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Classes;
