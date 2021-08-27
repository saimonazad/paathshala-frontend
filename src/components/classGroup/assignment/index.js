import React from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import StarIcon from "@material-ui/icons/Star";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { useAuth } from "../../../../authentication";
import CmtList from "../../../../@coremat/CmtList";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";

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
  dropzone: {
    flex: 1,
    border: "2px dashed rgba(0, 0, 0, 0.06)",
    display: "flex",
    outline: "none",
    padding: "40px 20px",
    transition: "border .24s ease-in-out",
    alignItems: "center",
    borderRadius: "2px",
    flexDirection: "column",
    backgroundColor: "#f4f4f7",
  },
}));

const Assignments = () => {
  const classes = useStyles();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <ListItem key={file.path}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  const submitFileHandler = () => {
      console.log(files)
  }
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Submit Assignment</Typography>
        <div>
          {/* <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography> */}
        </div>
      </Box>
      <Box className={classes.class__list}>
        <Box>
          <Box {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            <Typography>
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </Box>
          <aside>
            <Typography component="h4" variant="inherit">
              Files
            </Typography>
            <List>{files}</List>
          </aside>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={acceptedFiles.length == 0}
          onClick={submitFileHandler}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Assignments;
