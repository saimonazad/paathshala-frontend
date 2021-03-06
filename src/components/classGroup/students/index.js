import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import useSWR, { mutate, trigger } from "swr";
import { fetcher } from "../../../services/fetcher";
import { useAuth } from "../../../../authentication";
import CmtList from "../../../../@coremat/CmtList";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";
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
  divider: {
    margin: theme.spacing(0, 3),
  },
  btn: {
    marginLeft: theme.spacing(2),
    textTransform: "none",
  },
}));

const Students = ({ data, courseInfo, mutateStudent }) => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const handleStudentDelete = (id) => {
    httpClient
      .delete(`/course/controller/${id}/`)
      .then((res) => {
        mutateStudent(); // trigger(`/course/controller?course_id=${courseInfo.id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Enrolled Student</Typography>
        <div>
          {/* <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography> */}
        </div>
      </Box>
      <Box className={classes.class__list}>
        <CmtList
          data={data.students}
          renderRow={(student) => (
            <Box
              mb={2}
              borderRadius={4}
              display="flex"
              justifyContent="space-between"
              className={classes.class}
              alignItems="center"
            >
              <Box display="flex">
                <Typography>{student.id}</Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.divider}
                />
                <Typography>{student.student}</Typography>
              </Box>
              <Box display="flex">
                {courseInfo[0]?.user == authUser ? (
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleStudentDelete(student.id)}
                  >
                    Remove
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  href={`/u/${student.student}`}
                >
                  View Profile
                </Button>
              </Box>
            </Box>
          )}
          ListEmptyComponent={
            <GridEmptyResult loader={false} title="No Student Enrolled" />
          }
        />
      </Box>
    </Box>
  );
};

export default Students;
