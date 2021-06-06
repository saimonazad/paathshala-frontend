import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {  makeStyles, withStyles } from "@material-ui/core/styles";

import FormLabel from "@material-ui/core/FormLabel";

import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      height:  "100vh",
    },
    display: "flex",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(5),
    alignItems: "center",
    borderRadius: theme.spacing(1),
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)",
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
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container component="main" maxWidth="md" className={classes.container}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Divider className={classes.divider} variant="middle" />
          <form className={classes.form} noValidate>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="input" className={classes.input}>
                  Full Name
                </FormLabel>
                <TextField
                  autoComplete="fname"
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormLabel htmlFor="input" className={classes.input}>
                  Email Address
                </FormLabel>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  type="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="gender"
                  name="gender"
                  variant="outlined"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="code"
                  name="refCode"
                  variant="outlined"
                  required
                  fullWidth
                  id="refCode"
                  label="Referral Code"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
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
                  color="primary"
                  className={classes.submit}
                >
                  Create Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
  );
}
