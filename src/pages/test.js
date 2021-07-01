import React, { useState } from "react";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: 30,
    "& > button": {
      border: "2px solid #AF5698!important",
      borderRadius: "4px!important",
      background: "white",
      padding: 0,
    },
    "& * > button": {
      textTransform: "none",
    },
    "& .MuiToggleButton-root.Mui-selected": {
      padding: 0,
      background: theme.palette.primary.main,
      "& * > button": {
        color: "white",
        padding: theme.spacing(0, 0),
      },
    },
  },
  btnToggle: {
    "&.MuiButton-root": {
      padding: 0,
    },
  },
}));
export default function ToggleButtonsMultiple() {
  const classes = useStyles();
  const [Days, setDays] = useState(() => []);

  const handleDays = (event, newDays) => {
    setDays(newDays);
    console.log(newDays);
  };

  return (
    <ToggleButtonGroup
      value={Days}
      onChange={handleDays}
      aria-label="text formatting"
      className={classes.toggleContainer}
    >
      <ToggleButton className={classes.btnToggle} value="Sun" aria-label="Sun">
        <Button disableRipple={true} disableFocusRipple={true}>
          Sun
        </Button>
      </ToggleButton>
      <ToggleButton className={classes.btnToggle} value="Mon" aria-label="Mon">
        <Button>Mon</Button>
      </ToggleButton>
      <ToggleButton className={classes.btnToggle} value="Tue" aria-label="Tue">
        <Button>Tue</Button>
      </ToggleButton>
      <ToggleButton className={classes.btnToggle} value="Wed" aria-label="Wed">
        <Button>Wed</Button>
      </ToggleButton>
      <ToggleButton className={classes.btnToggle} value="Thu" aria-label="Thu">
        <Button>Thu</Button>
      </ToggleButton>
      <ToggleButton className={classes.btnToggle} value="Fri" aria-label="Fri">
        <Button>Fri</Button>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
