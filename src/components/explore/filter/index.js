import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  MenuItem,
  Button,
  NativeSelect,
  withStyles,
  InputBase,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";

const BootstrapInput = withStyles((theme) => ({
  root: {
    // "label + &": {
    //   marginTop: theme.spacing(3),
    // },
    width: "100%",
    minWidth: theme.spacing(16),
  },
  input: {
    borderRadius: 8,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.secondary.main}`,
    fontSize: 16,
    padding: theme.spacing(1.2, 3, 1.2, 1),
    fontWeight: 500,
    boxShadow: "0px 3px 6px #00000029",

    "&:focus": {
      borderRadius: 8,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  filterBtn: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 16,
    textTransform: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
    boxShadow: "0px 3px 6px #00000029",
  },
  select: {
    marginRight: theme.spacing(2),
  },
}));

const Filter = ({ setstudyFilter, studyFilter }) => {
  const classes = useStyles();
  const [subject, setSubject] = useState("");

  const handleStudyLevel = (event) => {
    setstudyFilter(event.target.value);
    console.log(event.target.value);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <>
      <FormControl className={classes.select}>
        {/* <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel> */}
        <NativeSelect
          id="demo-customized-select-native"
          value={studyFilter}
          onChange={handleStudyLevel}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value={""}>
            - Study Level
          </option>
          <option value={"SSC"}>SSC</option>
          <option value={"HSC"}>HSC</option>
          <option value={"BSC"}>BSC</option>
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.select}>
        {/* <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel> */}
        <NativeSelect
          id="demo-customized-select-native"
          value={subject}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="">
            - Group
          </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.select}>
        {/* <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel> */}
        <NativeSelect
          id="demo-customized-select-native"
          value={subject}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="">
            - Subjects
          </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      <Button
        className={classes.filterBtn}
        variant="outlined"
        color="secondary"
        startIcon={<TuneIcon className={classes.btnIcon} />}
      >
        Filter
      </Button>
    </>
  );
};

export default Filter;
