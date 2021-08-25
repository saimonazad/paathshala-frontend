import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
var _ = require("lodash");
import {
  Grid,
  FormLabel,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Box,
  Typography,
  Divider,
  Select,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { faWindowClose } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createCourse } from "../../../redux/actions/courseActions";
import ToggleDays from "./ToggleDays";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },

  submit: {
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(1.5, 3),
    textTransform: "none",
    fontWeight: 400,
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },
  divider: {
    margin: theme.spacing(1, 0, 2),
    width: "10%",
  },
  textField: {
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5, 1.5),
      backgroundColor: theme.palette.other.bonJour,
      color: theme.palette.other.DoveGray,
    },
    "& label.Mui-focused": {
      color: theme.palette.common.black,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.common.black,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.common.black,
      },
    },
  },
  label: {
    display: "block",
    fontSize: 12,
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
    marginBottom: theme.spacing(0.5),
  },

  grid: {
    "&>*": {
      padding: theme.spacing(0.75, 0.63),
    },

    [theme.breakpoints.up("lg")]: {
      "&>*": {
        padding: theme.spacing(1.6, 2.5),
      },
    },
  },
  formControl: {
    width: "100%",
    backgroundColor: theme.palette.other.bonJour,
  },
  select: {
    alignSelf: "center",
    "& .MuiInputBase-input": {
      padding: "12px",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 4,
      color: theme.palette.other.DoveGray,
      backgroundColor: theme.palette.other.bonJour,
    },
    "& .MuiInput-underline:before": {
      borderBottom: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottom: 0,
    },
    "& .MuiInput-underline:hover": {
      borderBottom: 0,
    },
  },
  toggleContainer: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      marginBottom: 40,
    },
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
  errorText: {
    margin: 0,
  },
  time: {},
  toggleRecurring: {
    height: 40,

    border: `2px solid ${theme.palette.secondary.main}!important`,
    borderRadius: "6px!important",
    background: "white",

    "& * > .MuiToggleButton-label": {
      textTransform: "none",
      padding: 15,
    },
    "& .MuiToggleButton-root.Mui-selected": {
      padding: 0,
      color: "white",

      background: theme.palette.secondary.main,
      "& * > button": {
        color: "white",
        padding: theme.spacing(0, 0),
      },
    },
  },
}));

export default function CreateClass({
  isOpen,
  handleModal,
  formSubmissionCheck,
}) {
  const dispatch = useDispatch();
  //use react hook flowFrom:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm();

  const classes = useStyles();
  const [Days, setDays] = useState(() => ["Sun", "Mon"]);

  const handleOpen = () => {
    handleModal(true);
  };

  const handleClose = () => {
    handleModal(false);
  };
  const onSubmit = (data) => {
    let classData = {
      ...data,
      days: Days.toString() == "" ? "nodata" : Days.toString(),
      recurring: isRecurring.toString() == "recurring",
    };
    const temp = _.mapValues(classData, (val) =>
      val === undefined ? (val = "nodata") : val
    );
    if (
      (temp.recurring == true && Days.length != 0) ||
      (temp.recurring == false && classData.date != "")
    ) {
      try {
        dispatch(createCourse(temp));
        formSubmissionCheck(true);
        reset();
        handleClose();
      } catch (error) {}
    }
  };
  //show, hide subject box
  const [StudyLevel, setStudyLevel] = useState("");
  //recurring class
  const [isRecurring, setisRecurring] = useState("recurring");
  const handleRecurring = (event, newValue) => {
    if (isRecurring !== null) {
      setisRecurring(newValue);
      setDays([]);
    }
  };

  // function onChange(time, timeString) {
  //   console.log(moment("2021-08-24T13:04:00+06:00").format());
  // }
  const [startTime, setstartTime] = useState("");

  const body = (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Create Class</Typography>
        <FontAwesomeIcon
          onClick={handleClose}
          icon={faWindowClose}
          style={{ fontSize: "25px", cursor: "pointer" }}
        />
      </Box>
      <Divider />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <FormLabel htmlFor="input" className={classes.label}>
              Class Name
            </FormLabel>
            <TextField
              className={classes.textField}
              color="secondary"
              placeholder="Type here..."
              variant="outlined"
              fullWidth
              id="coursename"
              error={errors.coursename ? true : false}
              {...register("coursename", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.coursename && errors.coursename.type === "required" && (
              <p className={coursename.errorText}>Class name is required</p>
            )}
          </Grid>
          <Grid item xs={4} className={classes.select}>
            <FormLabel htmlFor="input" className={classes.label}>
              Study Level
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.gender ? true : false}
              onChange={(e) => {
                setStudyLevel(e.target.value);
              }}
            >
              <Select
                native
                className={classes.selectEmpty}
                name="study_level"
                {...register("study_level", {
                  required: true,
                })}
              >
                <option value="">Select Level</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="Others">Others</option>
              </Select>
            </FormControl>
            {errors.study_level && errors.study_level.type === "required" && (
              <p className={classes.errorText}>Study level is required</p>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            className={classes.select}
            style={StudyLevel == "Others" ? { display: "none" } : null}
          >
            <FormLabel htmlFor="input" className={classes.label}>
              Subject
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.subject ? true : false}
            >
              <NativeSelect
                className={classes.selectEmpty}
                name="subject"
                {...register("subject", {
                  required: false,
                })}
              >
                <option value="">Select Subject</option>
                <option value="Bangla 1st">Bangla 1st</option>
                <option value="Bangla 2nd">Bangla 2nd</option>
                <option value="ICT">ICT</option>
              </NativeSelect>
            </FormControl>
            {errors.subject && errors.subject.type === "required" && (
              <p className={classes.errorText}>Subject is required</p>
            )}
          </Grid>
          <Grid item xs={4}>
            <FormLabel htmlFor="input" className={classes.label}>
              Fee
            </FormLabel>
            <TextField
              type="number"
              className={classes.textField}
              color="secondary"
              placeholder="Type here..."
              autoComplete="fname"
              variant="outlined"
              fullWidth
              id="monthly_fee"
              error={errors.monthly_fee ? true : false}
              {...register("monthly_fee", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.monthly_fee && errors.monthly_fee.type === "required" && (
              <p className={classes.errorText}>Monthly fees is required</p>
            )}
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <ToggleButtonGroup
              value={isRecurring}
              exclusive
              onChange={handleRecurring}
              aria-label="Recurring / One day class selector"
              size="small"
              className={classes.toggleRecurring}
            >
              <ToggleButton
                value="recurring"
                className={classes.btnToggle}
                aria-label="recurring"
              >
                Recurring Class
              </ToggleButton>
              <ToggleButton
                value="oneDay"
                className={classes.btnToggle}
                aria-label="oneDay"
              >
                One Day Class
              </ToggleButton>
            </ToggleButtonGroup>
            {isRecurring == "" && (
              <p className={classes.errorText}>Please select atleast one</p>
            )}
          </Grid>
          {isRecurring == "recurring" ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <ToggleDays days={Days} setDays={setDays} />
              {Days && Days.length == 0 && (
                <p className={classes.errorText}>Days is required</p>
              )}
            </Grid>
          ) : (
            <Grid item xs={12}>
              <FormLabel htmlFor="input" className={classes.label}>
                Date
              </FormLabel>
              <FormControl variant="filled" className={classes.select}>
                <TextField
                  id="date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={errors.date ? true : false}
                  {...register("date", {
                    required: true,
                  })}
                />
              </FormControl>
              {errors.date && errors.date.type === "required" && (
                <p className={classes.errorText}>Date is required</p>
              )}
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormLabel htmlFor="input" className={classes.label}>
              Start Time
            </FormLabel>
            <FormControl variant="filled" className={classes.select}>
              {/* <TextField
                className={classes.time}
                id="time"
                type="time"
                onChange={(e) => console.log(e.target.value)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                error={errors.start_time ? true : false}
                {...register("start_time", {
                  required: true,
                  maxLength: 30,
                })}
              /> */}

              <Controller
                control={control}
                name="start_time"
                render={({ value, onChange }) => (
                  <TimePicker
                    value={value}
                    use12Hours
                    format="h:mm a"
                    onChange={onChange}
                    getPopupContainer={(node) => node.parentNode}
                  />
                )}
              />
            </FormControl>
            {errors.start_time && errors.start_time.type === "required" && (
              <p className={classes.errorText}>Start time is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel htmlFor="input" className={classes.label}>
              End Time
            </FormLabel>
            <Controller
              control={control}
              name="end_time"
              value={startTime}
              render={({ value, onChange }) => (
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  onChange={(timeString) => setstartTime(timeString)}
                  getPopupContainer={(node) => node.parentNode}
                />
              )}
            />
            {errors.end_time && errors.end_time.type === "required" && (
              <p className={classes.errorText}>End time is required</p>
            )}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormLabel htmlFor="input" className={classes.label}>
              End Date
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.select}
              error={errors.gender ? true : false}
            >
              <TextField
                id="date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: false,
                }}
                error={errors.end_date ? true : false}
                {...register("end_date", {
                  required: true,
                })}
              />
            </FormControl>
            {errors.end_date && errors.end_date.type === "required" && (
              <p className={classes.errorText}>End date is required</p>
            )}
          </Grid>*/}
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Create Class
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <div>
      {/* <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> */}
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.paper}>{body}</DialogContent>
      </Dialog>
    </div>
  );
}
