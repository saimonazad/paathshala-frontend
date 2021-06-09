import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import ExploreIcon from "@material-ui/icons/Explore";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import { ClassRounded, VerticalAlignCenter } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import theme from "../../utils/theme";

const useStyles = makeStyles((theme) => ({
  test: {
    height: "4px",
    width: "100%",
    position: "absolute",
    top: "94%",
    backgroundColor: theme.palette.secondary.main,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  root: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  toolbar: {
    minHeight: theme.spacing(0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginRight: theme.spacing(4),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.other.grey,
    "&:hover": {
      backgroundColor: theme.palette.other.grey,
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
  button: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1.5, 0),
  },
  label: {
    // Aligns the content of the button vertically.
    flexDirection: "column",
  },
  divider: {
    backgroundColor: theme.palette.other.grey,
    margin: theme.spacing(1.7, 1),
  },
  nav__right: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    margin: theme.spacing(1),
  },
  appbar_rightIcon: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root} component="nav">
      <Toolbar className={classes.toolbar}>
        <div
          style={{
            display: "flex",
            flex: 1,
            minWidth: "-webkit-min-content",
          }}
        >
          <Typography className={classes.title} variant="h6" noWrap>
            Paathshala
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </div>
        <Box style={{}}>
          <Button
            size="small"
            classes={{ root: classes.button, label: classes.label }}
          >
            <HomeIcon />
            Home
            <div className={classes.test}></div>
          </Button>
          <Button
            size="small"
            classes={{ root: classes.button, label: classes.label }}
          >
            <NotificationsIcon />
            Notifications
          </Button>
          <Button
            size="small"
            classes={{ root: classes.button, label: classes.label }}
          >
            <ChatIcon />
            Inbox
          </Button>
          <Button
            size="small"
            classes={{ root: classes.button, label: classes.label }}
          >
            <ExploreIcon />
            Explore
          </Button>
        </Box>

        <Box
          style={{
            flex: 1,
            minWidth: "-webkit-min-content",
            justifyContent: "flex-end",
          }}
          className={classes.nav__right}
        >
          <IconButton color="secondary" className={classes.appbar_rightIcon}>
            <AddIcon />
          </IconButton>
          <IconButton color="secondary" className={classes.appbar_rightIcon}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="secondary" className={classes.appbar_rightIcon}>
            <MenuIcon />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src="https://avatars.githubusercontent.com/u/13957098?v=4"
          ></Avatar>
          <Typography
            style={{ fontWeight: 500, color: theme.palette.common.black }}
          >
            Khalid
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
