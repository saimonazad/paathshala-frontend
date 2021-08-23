import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const DAYS = [
  {
    key: "Sat",
    label: "S",
  },
  {
    key: "Sun",
    label: "S",
  },
  {
    key: "Mon",
    label: "M",
  },
  {
    key: "Tue",
    label: "T",
  },
  {
    key: "Wed",
    label: "W",
  },
  {
    key: "Thu",
    label: "T",
  },
  {
    key: "Fri",
    label: "F",
  },
];

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(0.5),
    },
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles((theme) => ({
  root: {
    color: theme.palette.other.DoveGray,
    "&$selected": {
      color: "white",
      background: theme.palette.secondary.main,
    },
    "&:hover": {
      color: "white",
      borderColor: "white",
      background: theme.palette.secondary.main,
    },
    "&:hover$selected": {
      borderColor: theme.palette.secondary.main,
      background: theme.palette.secondary.main,
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.85rem",
  },
  selected: {},
}))(ToggleButton);

const ToggleDays = ({ days, setDays }) => {
  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        arial-label="Days of the week"
        value={days}
        onChange={(event, value) => setDays(value)}
      >
        {DAYS.map((day, index) => (
          <StyledToggle key={day.key} value={day.key} aria-label={day.key}>
            {day.label}
          </StyledToggle>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

export default ToggleDays;
