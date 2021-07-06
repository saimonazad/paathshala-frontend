import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
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
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../../redux/actions/Common";
import { createCourse } from "../../../redux/actions/courseActions";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
    [theme.breakpoints.up("md")]: {
      width: 600,
    },
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
    marginTop: theme.spacing(0.5),
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
  } = useForm();

  const classes = useStyles();
  const [Days, setDays] = useState(() => ["Sun", "Mon"]);

  const handleDays = (event, newDays) => {
    setDays(newDays);
  };
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    handleModal(true);
  };

  const handleClose = () => {
    handleModal(false);
  };
  const onSubmit = (data) => {
    let classData = { ...data, days: Days.toString() };
    try {
      dispatch(createCourse(classData));
      formSubmissionCheck(true);
      handleClose();
    } catch (error) {}
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex">
        <Typography variant="h6">Create Class</Typography>
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
          <Grid item xs={12} className={classes.select}>
            <FormLabel htmlFor="input" className={classes.label}>
              Study Level
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.gender ? true : false}
            >
              <NativeSelect
                className={classes.selectEmpty}
                name="study_level"
                {...register("study_level", {
                  required: true,
                })}
              >
                <option value="">Select Level</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="BSC">BSC</option>
              </NativeSelect>
            </FormControl>
            {errors.study_level && errors.study_level.type === "required" && (
              <p className={classes.errorText}>Study level is required</p>
            )}
          </Grid>

          <Grid item xs={12} className={classes.select}>
            <FormLabel htmlFor="input" className={classes.label}>
              Subject
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.company ? true : false}
            >
              <NativeSelect
                className={classes.selectEmpty}
                name="company"
                {...register("company", {
                  required: true,
                })}
              >
                <option value="">Select Subject</option>
                <option value="Bangla 1st">Bangla 1st</option>
                <option value="Bangla 2nd">Bangla 2nd</option>
                <option value="ICT">ICT</option>
              </NativeSelect>
            </FormControl>
            {errors.company && errors.company.type === "required" && (
              <p className={classes.errorText}>Subject is required</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormLabel htmlFor="input" className={classes.label}>
              Monthly Fees
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
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={Days}
              onChange={handleDays}
              aria-label="text formatting"
              className={classes.toggleContainer}
            >
              <ToggleButton
                className={classes.btnToggle}
                value="Sun"
                aria-label="Sun"
              >
                <Button disableRipple={true} disableFocusRipple={true}>
                  Sun
                </Button>
              </ToggleButton>
              <ToggleButton
                className={classes.btnToggle}
                value="Mon"
                aria-label="Mon"
              >
                <Button>Mon</Button>
              </ToggleButton>
              <ToggleButton
                className={classes.btnToggle}
                value="Tue"
                aria-label="Tue"
              >
                <Button>Tue</Button>
              </ToggleButton>
              <ToggleButton
                className={classes.btnToggle}
                value="Wed"
                aria-label="Wed"
              >
                <Button>Wed</Button>
              </ToggleButton>
              <ToggleButton
                className={classes.btnToggle}
                value="Thu"
                aria-label="Thu"
              >
                <Button>Thu</Button>
              </ToggleButton>
              <ToggleButton
                className={classes.btnToggle}
                value="Fri"
                aria-label="Fri"
              >
                <Button>Fri</Button>
              </ToggleButton>
            </ToggleButtonGroup>
            {Days.length == 0 && (
              <p className={classes.errorText}>Days is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel htmlFor="input" className={classes.label}>
              Start Time
            </FormLabel>
            <FormControl variant="filled" className={classes.select}>
              <TextField
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
            <FormControl
              variant="filled"
              className={classes.select}
              error={errors.gender ? true : false}
            >
              <TextField
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
                error={errors.end_time ? true : false}
                {...register("end_time", {
                  required: true,
                  maxLength: 30,
                })}
              />
            </FormControl>
            {errors.end_time && errors.end_time.type === "required" && (
              <p className={classes.errorText}>End time is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel htmlFor="input" className={classes.label}>
              Start Date
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.select}
              error={errors.gender ? true : false}
            >
              <TextField
                onChange={(e) => console.log(e.target.value)}
                id="date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.start_date ? true : false}
                {...register("start_date", {
                  required: true,
                  maxLength: 30,
                })}
              />
            </FormControl>
            {errors.start_date && errors.start_date.type === "required" && (
              <p className={classes.errorText}>Start date is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
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
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
