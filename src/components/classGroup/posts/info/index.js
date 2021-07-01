import {
  Box,
  Button,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
  ImageIcon,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SchoolIcon from "@material-ui/icons/School";
import React from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: "center",
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(1.5),
    "& h2": {
      color: theme.palette.common.white,
      fontSize: 16,
    },
    "& button": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
      textTransform: "none",
      alignSelf: "center",
    },
  },
  list__icon: {
    fontSize: 30,

    color: theme.palette.secondary.main,
  },
  list: {
    alignItems: "flex-start",

    padding: theme.spacing(0, 1.5),
    "& span": {
      paddingRight: theme.spacing(0.5),
    },
    "& p": {
      fontWeight: 400,
      margin: 0,
      fontSize: 12,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
    },
  },
}));
const Info = ({ title, data }) => {
  const classes = useStyles();
  return (
    <Box bgcolor="background.box" border={2} borderRadius={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.header}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Button>See More</Button>
      </Box>
      {title == "Basic Info" && data && data.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {data.map((info) => {
            return (
              <>
                <ListItem className={classes.list}>
                  <ListItemAvatar>
                    <ListItemIcon className={classes.list__icon}>
                      <PlaceIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText>
                    Lives in: <span>{info.lives_in_char}</span>
                  </ListItemText>
                </ListItem>
              </>
            );
          })}
        </List>
      ) : (
        ""
      )}
      {title == "Work Info" && data && data.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {data.map((info) => {
            return (
              <>
                <ListItem className={classes.list}>
                  <ListItemAvatar>
                    <ListItemIcon className={classes.list__icon}>
                      <BusinessCenterIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText>
                    <span>{info.position}</span>
                    <p>{info.dept}</p>
                    <p>{info.company}</p>
                  </ListItemText>
                </ListItem>
              </>
            );
          })}
        </List>
      ) : (
        ""
      )}
      {title == "Academic Profile" && data && data.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {data.map((info) => {
            return (
              <>
                <ListItem className={classes.list}>
                  <ListItemAvatar>
                    <ListItemIcon className={classes.list__icon}>
                      <SchoolIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText>
                    <span>{info.degree}</span>|<span>{info.result}</span>|
                    <span>{info.dept}</span>|<span>{info.institution}</span>
                  </ListItemText>
                </ListItem>
              </>
            );
          })}
        </List>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Info;
