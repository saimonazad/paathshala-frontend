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
      fontSize: 20,
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
    verticalAlign: "bottom",
    color: theme.palette.secondary.main,
  },
  list: {
      padding: theme.spacing(0,1.5)
  }
}));
const Info = () => {
  const classes = useStyles();

  return (
    <Box bgcolor="background.box" border={2} borderRadius={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.header}
      >
        <Typography variant="h5" component="h2">
          Basic Info
        </Typography>
        <Button>See More</Button>
      </Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <ListItemIcon className={classes.list__icon}>
              <PersonIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <ListItemText primary="Work" />
        </ListItem>
        <ListItem className={classes.list}>
          <ListItemAvatar>
            <ListItemIcon className={classes.list__icon}>
              <PersonIcon />
            </ListItemIcon>
          </ListItemAvatar>
          <ListItemText primary="Work" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Info;
