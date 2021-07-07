import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  Avatar,
  Link,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import Class from "./class";

import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { useParams } from "react-router-dom";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";

import TeacherInfo from "./teacherInfo";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
    padding: theme.spacing(2, 2, 1),
    "& > *": {
      marginBottom: theme.spacing(1.5),
    },
  },
  header: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    color: theme.palette.text.mineShaft,

    "& h3": {
      fontSize: 20,
      fontWeight: 500,
      marginRight: theme.spacing(2),
    },
    "& span": {
      fontSize: 14,
      fontWeight: 300,
      margin: theme.spacing(0, 0.3),
    },
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
  startIcon: {
    color: theme.palette.other.star,
    verticalAlign: "bottom",
    fontSize: 22,
  },
  class__list: {
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
      fontWeight: 400,
    },
  },
}));

const Classes = ({ users, search, classFilterData }) => {
  const classes = useStyles();
  //get all course/class
  const getClassesofUser = `/course/info`;
  const { data: course, error } = useSWR(getClassesofUser, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    refreshInterval: 0,
  });
  //group course data by username
  const groupdata = _.chain(course)
    .groupBy("user")
    .map((value, key) => value)
    .value();

  const groupFilteredData = _.chain(classFilterData)
    .groupBy("user")
    .map((value, key) => value)
    .value();

  const [searchData, setsearchData] = useState(true);

  const searchdata =
    searchData && search != ""
      ? course.filter((user) => user.coursename.toLowerCase().includes(search))
      : course;

  const filteredResult =
    classFilterData && classFilterData != undefined
      ? groupFilteredData
      : groupdata;
  console.log(filteredResult);
  return (
    <>
      <CmtList
        data={filteredResult}
        renderRow={(course, index) => (
          <Box
            key={index}
            bgcolor="background.box"
            borderRadius={4}
            className={classes.root}
          >
            <TeacherInfo username={course[0]?.user} />
            <Box className={classes.class__list}>
              <Class course={course} />
            </Box>
          </Box>
        )}
      />
    </>
  );
};

export default Classes;
