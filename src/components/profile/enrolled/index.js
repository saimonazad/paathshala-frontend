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
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { useAuth } from "../../../../authentication";
import CmtList from "../../../../@coremat/CmtList";
import ClassInfo from "./classInfo";
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

const Enrolled = () => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const { data: enrollInfo, error } = useSWR(
    `/course/enrollmentCheck/?username=${authUser}&type=all`,
    fetcher
  );

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Classes</Typography>
        <div>
          <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography>
        </div>
      </Box>
      <Box className={classes.class__list}>
        <CmtList
          data={enrollInfo}
          renderRow={(course) => {
            if (course.course != null) {
              return <ClassInfo courseId={course.course} />;
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Enrolled;
