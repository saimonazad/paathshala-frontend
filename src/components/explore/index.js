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
import useSWR, { mutate, trigger } from "swr";
import { fetcher } from "../../services/fetcher";
import CmtSearch from "../../../@coremat/CmtSearch";
var _ = require("lodash");

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
  const [searchTerm, setSearchTerm] = useState("");
  //filter
  const [studyFilter, setstudyFilter] = useState(null);
  const [subjectFilter, setsubjectFilter] = useState(null);
  //fetch course with  filter
  const { data: classFilterData } = useSWR(
    () =>
      studyFilter
        ? `/course/info/?type=explore&study_level=${studyFilter}`
        : subjectFilter
        ? `/course/info/?type=explore&subject=${subjectFilter}`
        : subjectFilter && studyFilter
        ? `/course/info/?type=explore&subject=${subjectFilter}&study_level=${studyFilter}`
        : null,
    fetcher
  );

  //tab handling
  const [activeTab, setActiveTab] = useState("Users");
  function handleTab(newValue) {
    setActiveTab(newValue);
    console.log(activeTab);
  }
  //fetch users
  const getUsersUrl = `/users/userinfo`;
  const { data: users, error } = useSWR(getUsersUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // console.log(_.filter(users, { last_name: "User" }));

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            value="Users"
            onClick={(e) => handleTab(e.currentTarget.value)}
            className={activeTab == "Users" ? classes.activeTab : classes.test}
          >
            Users
          </Button>
          <Button
            value="Classes"
            onClick={(e) => handleTab(e.currentTarget.value)}
            className={
              activeTab == "Classes" ? classes.activeTab : classes.test
            }
          >
            Classes
          </Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title}>{activeTab}</Typography>
        {activeTab == "Users" && (
          <CmtSearch
            border={true}
            onlyIcon={false}
            iconPosition="right"
            align="right"
            placeholder="Search Keywords"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </Box>

      {activeTab == "Users" && <Teachers users={users} search={searchTerm} />}
      {activeTab == "Classes" && (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography></Typography>
            <Box display="flex" alignItems="center">
              <Filter
                setstudyFilter={setstudyFilter}
                studyFilter={studyFilter}
                subjectFilter={subjectFilter}
                setsubjectFilter={setsubjectFilter}
              />
            </Box>
          </Box>
          <Classes
            users={users}
            search={searchTerm}
            classFilterData={classFilterData}
          />
        </>
      )}
    </Box>
  );
};

export default Explore;
