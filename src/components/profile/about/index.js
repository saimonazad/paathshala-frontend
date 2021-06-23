import React, { useState } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import PlaceIcon from "@material-ui/icons/Place";
import clsx from "clsx";
import { useSelector } from "react-redux";
import moment from "moment";
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRange";
import WorkIcon from "@material-ui/icons/Work";

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
    minHeight: 270,
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
  //redux data
  const { basicInfo } = useSelector((state) => state.basic);
  const { workInfo } = useSelector((state) => state.work);
  const { academicInfo } = useSelector((state) => state.academic);

  console.log(academicInfo);
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box alignItems="center" className={classes.header}>
        <Typography component="h1">About</Typography>
      </Box>
      <Box className={classes.content}>
        <Grid container>
          <Grid
            item
            xs={3}
            style={{ borderRight: "3px solid", minHeight: 250 }}
          >
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
            {activeBtn == "basic" && (
              <Box pl={6} borderColor="secondary.main">
                <Box pb={3} display="flex" alignItems="center">
                  <PlaceIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Lives in:
                    <Box pl={0.5} component="span" fontWeight={500}>
                      {basicInfo[0].lives_in_char}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {activeBtn == "work" &&
              workInfo.map((work) => {
                return (
                  <Box pl={6} borderColor="secondary.main">
                    <Box pb={3} display="flex" alignItems="center">
                      <WorkIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Position:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {work.position}
                        </Box>
                      </Box>
                    </Box>

                    <Box pb={3} display="flex" alignItems="center">
                      <SchoolIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Dept.:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {work.dept}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <WorkIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Company:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {work.company}
                        </Box>
                      </Box>
                    </Box>

                    <Box pb={3} display="flex" alignItems="center">
                      <DateRangeIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Starting Date:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {moment(work.starting_date).format("MMM Do YYYY")}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <DateRangeIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Ending Date:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {moment(work.ending_date).format("MMM Do YYYY")}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <PlaceIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Address:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {work.address}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            {activeBtn == "work" && workInfo.length === 0 && (
              <Box pl={6} borderColor="secondary.main">
                <Box pb={3} display="flex" alignItems="center">
                  <WorkIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Position:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>

                <Box pb={3} display="flex" alignItems="center">
                  <SchoolIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Dept.:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <WorkIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Company:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>

                <Box pb={3} display="flex" alignItems="center">
                  <DateRangeIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Starting Date:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <DateRangeIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Ending Date:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <PlaceIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Address:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
              </Box>
            )}
            {activeBtn == "academic" &&
              academicInfo.map((level) => {
                return (
                  <Box pl={6} borderColor="secondary.main">
                    <Box pb={3} display="flex" alignItems="center">
                      <SchoolIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Dept.:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {level.dept}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <SchoolIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Degree:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {level.degree}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <SchoolIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Result:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {level.result}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <DateRangeIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Starting Date:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {moment(level.starting_date).format("MMM Do YYYY")}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <DateRangeIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Ending Date:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {moment(level.ending_date).format("MMM Do YYYY")}
                        </Box>
                      </Box>
                    </Box>
                    <Box pb={3} display="flex" alignItems="center">
                      <SchoolIcon className={classes.icon} />
                      <Box fontSize={16}>
                        Institution:
                        <Box pl={0.5} component="span" fontWeight={500}>
                          {level.institution}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}

            {activeBtn == "academic" && academicInfo.length === 0 && (
              <Box pl={6} borderColor="secondary.main">
                <Box pb={3} display="flex" alignItems="center">
                  <SchoolIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Dept.:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <SchoolIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Degree:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <SchoolIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Result:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <DateRangeIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Starting Date:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <DateRangeIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Ending Date:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
                <Box pb={3} display="flex" alignItems="center">
                  <SchoolIcon className={classes.icon} />
                  <Box fontSize={16}>
                    Institution:
                    <Box pl={0.5} component="span" fontWeight={500}></Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
