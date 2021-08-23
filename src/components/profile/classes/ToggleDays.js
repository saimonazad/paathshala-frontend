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
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    "&$selected": {
      color: "white",
      background: theme.palette.primary.main,
    },
    "&:hover": {
      color: "white",
      borderColor: "white",
      background: theme.palette.primary.main,
    },
    "&:hover$selected": {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main,
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
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
