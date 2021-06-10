import React, { useState } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(2),
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    "& h1": {
      fontSize: 25,
      fontWeight: 500,
      color: theme.palette.common.white,
    },
  },
  content: {
    padding: theme.spacing(2),
  },
  btn: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(1.5, 2),
    fontWeight: 500,
    fontSize: 18,
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
  active: {
    position: "relative",
    color: theme.palette.other.jacaranda,
    backgroundColor: theme.palette.secondary.light,
    fontWeight: 600,
    "&:before": {
      position: "absolute",
      content: '""',
      padding: theme.spacing(3.2, 0.5),
      borderTopRightRadius: 4,
      left: 0,
      top: 0,
      borderBottomRightRadius: 4,
      background: theme.palette.other.jacaranda,
    },
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
  info: {
    color: theme.palette.text.mineShaft,
  },
}));

const About = () => {
  const classes = useStyles();
  const [activeBtn, setActiveBtn] = useState("basic");

  const handleChange = (newValue) => {
    setActiveBtn(newValue);
    console.log(newValue);
  };
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box alignItems="center" className={classes.header}>
        <Typography component="h1">About</Typography>
      </Box>
      <Box className={classes.content}>
        <Grid container>
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column">
              <Typography
                value="basic"
                onClick={(e) => handleChange(e.target.getAttribute("value"))}
                className={clsx(classes.btn, {
                  [classes.active]: activeBtn == "basic",
                })}
              >
                Basic Info
              </Typography>
              <Typography
                value="academic"
                onClick={(e) => handleChange(e.target.getAttribute("value"))}
                className={clsx(classes.btn, {
                  [classes.active]: activeBtn == "academic",
                })}
              >
                Academic Profile
              </Typography>
              <Typography
                value="work"
                onClick={(e) => handleChange(e.target.getAttribute("value"))}
                className={clsx(classes.btn, {
                  [classes.active]: activeBtn == "work",
                })}
              >
                Work Info
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={9} className={classes.info}>
            <Box pl={6} borderLeft={3} borderColor="secondary.main">
              <Box pb={3} display="flex" alignItems="center">
                <PersonIcon className={classes.icon} />
                <Box fontSize={16}>
                  User ID:
                  <Box pl={0.5} component="span" fontWeight={500}>
                    576452
                  </Box>
                </Box>
              </Box>
              <Box pb={3} display="flex" alignItems="center">
                <PlaceIcon className={classes.icon} />
                <Box fontSize={16}>
                  Lives in:
                  <Box pl={0.5} component="span" fontWeight={500}>
                    Mirpur, Dhaka
                  </Box>
                </Box>
              </Box>
              <Box pb={3} display="flex" alignItems="center">
                <PeopleIcon className={classes.icon} />
                <Box fontSize={16}>
                  Followed by:
                  <Box pl={0.5} component="span" fontWeight={500}>
                    1,982 people
                  </Box>
                </Box>
              </Box>
              <Box pb={3} display="flex" alignItems="center">
                <EmailIcon className={classes.icon} />
                <Box fontSize={16}>
                  Email address:
                  <Box pl={0.5} component="span" fontWeight={500}>
                    hanzohashashi@walla.com
                  </Box>
                </Box>
              </Box>
              <Box pb={3} display="flex" alignItems="center">
                <PhoneIcon className={classes.icon} />
                <Box fontSize={16}>
                  Phone number:
                  <Box pl={0.5} component="span" fontWeight={500}>
                    01511155511
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
