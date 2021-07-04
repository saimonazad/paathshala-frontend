import { Typography } from "@material-ui/core";
import {
  Box,
  makeStyles,
  InputBase,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "./filter";
import Classes from "./class";
import Teachers from "./teachers";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../redux/actions/explore";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
  search: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: theme.palette.other.silverChalice,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 8,
    fontSize: 16,
  },
  inputInput: {
    padding: theme.spacing(1.2, 3, 1.2, 3),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
  },

  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  test: {},
}));
const Explore = () => {
  const classes = useStyles();

  //
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  //tab handling
  const [activeTab, setActiveTab] = useState("teachers");
  function handleTab(newValue) {
    setActiveTab(newValue);
    console.log(activeTab);
  }
  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            value="teachers"
            onClick={(e) => handleTab(e.currentTarget.value)}
            className={
              activeTab == "teachers" ? classes.activeTab : classes.test
            }
          >
            Teachers
          </Button>
          <Button
            value="classes"
            onClick={(e) => handleTab(e.currentTarget.value)}
            className={
              activeTab == "classes" ? classes.activeTab : classes.test
            }
          >
            Classes
          </Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title}>Enrolled Classes</Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            color="secondary"
          />
        </div>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>5 class found</Typography>
        <Box display="flex" alignItems="center">
          <Filter />
        </Box>
      </Box>
      {activeTab == "teachers" && <Teachers />}
      {activeTab == "classes" && <Classes />}
    </Box>
  );
};

export default Explore;