import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  Grid,
  FormLabel,
  TextField,
  FormControl,
  NativeSelect,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
}));

export default function CreateClass({ isOpen, handleModal }) {
  //use react hook flowFrom:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    handleModal(true);
  };

  const handleClose = () => {
    handleModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex">
        <Typography variant="h6">Create Class</Typography>
      </Box>
      <Divider />
      <form className={classes.form}>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <FormLabel htmlFor="input" className={classes.label}>
              Username
            </FormLabel>
            <TextField
              className={classes.textField}
              color="secondary"
              placeholder="Type here..."
              autoComplete="fname"
              variant="outlined"
              fullWidth
              id="username"
              autoFocus
              error={errors.username ? true : false}
              {...register("username", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.username && errors.username.type === "required" && (
              <p>Username is required</p>
            )}
          </Grid>
          <Grid item xs={12} className={classes.select}>
            <FormLabel htmlFor="input" className={classes.label}>
              Gender
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.gender ? true : false}
            >
              <NativeSelect
                className={classes.selectEmpty}
                name="gender"
                {...register("gender", {
                  required: true,
                  maxLength: 30,
                })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </NativeSelect>
            </FormControl>
            {errors.gender && errors.gender.type === "required" && (
              <p>Gender is required</p>
            )}
          </Grid>

          <Grid item xs={12} className={classes.select}>
            <FormLabel htmlFor="input" className={classes.label}>
              Gender
            </FormLabel>
            <FormControl
              variant="filled"
              className={classes.formControl}
              error={errors.gender ? true : false}
            >
              <NativeSelect
                className={classes.selectEmpty}
                name="gender"
                {...register("gender", {
                  required: true,
                  maxLength: 30,
                })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </NativeSelect>
            </FormControl>
            {errors.gender && errors.gender.type === "required" && (
              <p>Gender is required</p>
            )}
            {/* <FormLabel htmlFor="input" className={classes.label}>
                    Gender
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="gender"
                    variant="outlined"
                    fullWidth
                    id="gender"
                    autoFocus
                    error={errors.gender ? true : false}
                    {...register("gender", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  {errors.gender && errors.gender.type === "required" && (
                    <p>Gender is required</p>
                  )} */}
          </Grid>
          <Grid item xs={12}>
            <FormLabel htmlFor="input" className={classes.label}>
              Username
            </FormLabel>
            <TextField
              className={classes.textField}
              color="secondary"
              placeholder="Type here..."
              autoComplete="fname"
              variant="outlined"
              fullWidth
              id="username"
              autoFocus
              error={errors.username ? true : false}
              {...register("username", {
                required: true,
                maxLength: 30,
              })}
            />
            {errors.username && errors.username.type === "required" && (
              <p>Username is required</p>
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
              Create Profile
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
