import React, { useRef } from "react";
import { useForm } from "react-hook-form";

//import material ui components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { FormControl, NativeSelect, Select } from "@material-ui/core";
import { NotificationLoader } from "../../../@jumbo/components/ContentLoader";
import { useAuth } from "../../../authentication";

//css
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100%",
    },
    "& p": {
      margin: 0,
    },

    display: "flex",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",

    background: `url("/classroom.jpg")`,
    "&::before ,&::after": {
      background: `linear-gradient(180deg, #5D1049 0, #5D1049D6 100%)`,
      position: "fixed",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      zIndex: 1,
      opacity: 0.8,
    },
  },
  wrapper: {
    zIndex: 2,
    padding: theme.spacing(4, 2),
    maxWidth: 850,
  },
  container: {
    padding: theme.spacing(0, 1, 4),

    alignItems: "center",
    borderRadius: theme.spacing(1),
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)",
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2, 4, 4),
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
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
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
    [theme.breakpoints.up("sm")]: {
      fontSize: 28,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 34,
      marginBottom: 30,
    },
  },
  logo__text: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 500,
    display: "table",
    margin: "0 auto",
    padding: theme.spacing(1.2, 7),
    borderRadius: 34,
    marginBottom: 20,
    [theme.breakpoints.up("sm")]: {
      fontSize: 26,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 30,
      marginBottom: 30,
    },
  },
  logo: {
    backgroundColor: theme.palette.common.white,
  },
  grid: {
    "&>*": {
      padding: theme.spacing(0.75, 0.63),
    },
    [theme.breakpoints.up("sm")]: {
      "&>*": {
        padding: theme.spacing(2.25, 2.3),
      },
    },
    [theme.breakpoints.up("lg")]: {
      "&>*": {
        padding: theme.spacing(1.6, 2.5),
      },
    },
  },
  tos: {
    marginTop: theme.spacing(-1.8),
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
//main func
export default function SignUp() {
  const classes = useStyles();
  const { isLoading, error, userSignup } = useAuth();

  //use react hook flowFrom:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    userSignup(data);
  };

  const password = useRef({});
  password.current = watch("password", "");
  return (
    <div className={classes.root}>
      <Container className={classes.wrapper}>
        <Typography className={classes.logo__text} component="h2" variant="h5">
          Paathshala
        </Typography>

        <Typography className={classes.title} component="h2" variant="h5">
          Let's get started with creating an account
        </Typography>
        <Container component="main" className={classes.container}>
          <Box className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container className={classes.grid}>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    First Name
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="first_name"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    error={errors.first_name ? true : false}
                    {...register("first_name", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  {errors.first_name &&
                    errors.first_name.type === "required" && (
                      <p>First Name is required</p>
                    )}
                  {errors.first_name &&
                    errors.first_name.type === "maxLength" && (
                      <p>Max Length is 30</p>
                    )}
                </Grid>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Last Name
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="last_name"
                    variant="outlined"
                    fullWidth
                    id="last_name"
                    error={errors.last_name ? true : false}
                    {...register("last_name", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  {errors.last_name && errors.last_name.type === "required" && (
                    <p>Last Name is required</p>
                  )}
                  {errors.last_name &&
                    errors.last_name.type === "maxLength" && (
                      <p>Max Length is 30</p>
                    )}
                </Grid>

                {/* <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Email Address
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    fullWidth
                    type="email"
                    id="email"
                    autoComplete="email"
                    error={errors.email ? true : false}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <p>Email is required</p>
                  )}
                </Grid> */}
                <Grid item xs={6}>
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
                    error={
                      error == "A user with that username already exists."
                        ? true
                        : false
                    }
                    {...register("username", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p>Username is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Phone
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    fullWidth
                    id="phoneNo"
                    type="phone"
                    autoComplete="phoneNo"
                    error={errors.phoneNo ? true : false}
                    {...register("phoneNo", {
                      required: "Phone number is required",
                      minLength: {
                        value: 11,
                        message: "Phone number must have 11 digits",
                      },
                      maxLength: {
                        value: 11,
                        message: "Phone number can't exceed 11 digits",
                      },
                      pattern: {
                        value: /[0-9]/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
                </Grid>
                {/* <Grid item xs={6} className={classes.select}>
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
                </Grid> */}
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Password
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    fullWidth
                    type="password"
                    id="password"
                    autoComplete="password"
                    error={errors.password ? true : false}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Password needs minimum 8 characters with at least 1 uppercase letter, 1 lowerclass letter and 1 number",
                      },
                    })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </Grid>

                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Confirm Password
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    fullWidth
                    type="password"
                    id="password"
                    autoComplete="password"
                    error={errors.password_repeat ? true : false}
                    {...register("password_repeat", {
                      required: "Please type again the password",
                      validate: (value) =>
                        value === password.current || "Passwords do not match",
                    })}
                  />
                  {errors.password_repeat && (
                    <p>{errors.password_repeat.message}</p>
                  )}
                </Grid>
                {/* <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Referral Code
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="code"
                    variant="outlined"
                    fullWidth
                    id="referral_code"
                    autoFocus
                  />
                </Grid> */}
                <Grid item xs={12} className={classes.tos}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="toss"
                        color="primary"
                        {...register("toss", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                    }
                    label="Terms & Policy of the company"
                  />
                  {errors.toss && errors.toss.type === "required" && (
                    <p>Please accept tos!</p>
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
            <Divider className={classes.divider} />
            <Typography variant="body2" color="black">
              Already have an account?{" "}
              <Link
                href="/signin"
                color="secondary"
                style={{ fontWeight: 500 }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Container>
        <NotificationLoader loading={isLoading} error={error} />
      </Container>
    </div>
  );
}
