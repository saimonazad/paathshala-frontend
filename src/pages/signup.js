import React from "react";
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
//css
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100%",
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
}));
//main func
export default function SignUp() {
  const classes = useStyles();

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
            <form className={classes.form} noValidate>
              <Grid container className={classes.grid}>
                <Grid item xs={12}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Full Name
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="fname"
                    name="fullName"
                    variant="outlined"
                    required
                    fullWidth
                    id="fullName"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Email Address
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                  />
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
                    required
                    fullWidth
                    id="phone"
                    type="phone"
                    name="phone"
                    autoComplete="phone"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Gender
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="gender"
                    name="gender"
                    variant="outlined"
                    required
                    fullWidth
                    id="gender"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Password
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
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
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel htmlFor="input" className={classes.label}>
                    Referral Code
                  </FormLabel>
                  <TextField
                    className={classes.textField}
                    color="secondary"
                    placeholder="Type here..."
                    autoComplete="code"
                    name="refCode"
                    variant="outlined"
                    required
                    fullWidth
                    id="refCode"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} className={classes.tos}>
                  <FormControlLabel
                    control={<Checkbox value="toss" color="primary" />}
                    label="Terms & Policy of the company"
                  />
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
              <Link href="#" color="secondary" style={{ fontWeight: 500 }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Container>
      </Container>
    </div>
  );
}
