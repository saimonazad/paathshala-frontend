import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import { Button, Menu, MenuItem, Badge } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import ExploreIcon from "@material-ui/icons/Explore";
import AddIcon from "@material-ui/icons/Add";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";
import theme from "../../utils/theme";
import Link from "next/dist/client/link";
import { useAuth } from "../../../authentication";
import { useRouter } from "next/router";
import CreateClass from "../../components/profile/classes/createClass";
import { useCart } from "react-use-cart";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import Router from "next/router";
const useStyles = makeStyles((theme) => ({
  empty: {},
  active: {
    "&::after": {
      content: "''",
      height: "4px",
      width: "100%",
      position: "absolute",
      top: "94%",
      backgroundColor: theme.palette.secondary.main,
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    textTransform: "none",
    textDecoration: "none",
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
  menu: {
    "& .MuiMenu-paper": {
      top: "60px!important",
    },
  },
}));

export default function SearchAppBar() {
  const { totalUniqueItems } = useCart();

  const classes = useStyles();
  const router = useRouter();
  const { asPath } = useRouter();

  const { authUser, userSignOut } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuModal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuModalClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    userSignOut(() => {
      router.push("/signin").then((r) => r);
    });
  };
  //create class modal
  const [open, setOpen] = useState(false);

  function handleModal(newValue) {
    setOpen(newValue);
  }
  const [isFormSubmitted, setIsFormSUbmitted] = useState(false);
  function formSubmissionCheck(newValue) {
    setIsFormSUbmitted(newValue);
  }

  //search users
  const [searchTerm, setsearchTerm] = useState("");
  function changeSearchTerm(e) {
    setsearchTerm(e.target.value);
    console.log(searchTerm);
  }
  function handleSearchUsers(e) {
    e.preventDefault();
    Router.push({
      pathname: "/search",
      query: { q: searchTerm },
    });
    setsearchTerm("");
  }

  return (
    <AppBar position="static" className={classes.root} component="nav">
      <Toolbar className={classes.toolbar}>
        <Box
          style={{
            display: "flex",
            flex: 1,
            minWidth: "-webkit-min-content",
          }}
        >
          <Link href="/" className={classes.title}>
            <Typography variant="h6" noWrap>
              Paathshala
            </Typography>
          </Link>
          <Hidden xsDown>
            <form onSubmit={(e) => handleSearchUsers(e)}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={searchTerm}
                  onChange={(e) => changeSearchTerm(e)}
                  placeholder="Search???"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </form>
          </Hidden>
        </Box>
        <Hidden smDown>
          <Box style={{}}>
            <Button
              href={"/"}
              size="small"
              className={asPath === "/" ? classes.active : classes.empty}
              classes={{ root: classes.button, label: classes.label }}
            >
              <HomeIcon />
              Home
            </Button>
            <Button
              href={"/notifications"}
              size="small"
              className={
                asPath === "/notifications" ? classes.active : classes.empty
              }
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
              href={"/explore"}
              size="small"
              className={asPath === "/explore" ? classes.active : classes.empty}
              classes={{ root: classes.button, label: classes.label }}
            >
              <ExploreIcon />
              Explore
            </Button>
          </Box>
        </Hidden>
        <Box
          style={{
            flex: 1,
            minWidth: "-webkit-min-content",
            justifyContent: "flex-end",
          }}
          className={classes.nav__right}
        >
          <Hidden smUp>
            <IconButton color="secondary" className={classes.appbar_rightIcon}>
              <SearchIcon />
            </IconButton>
          </Hidden>
          <IconButton
            onClick={() => setOpen(!open)}
            color="secondary"
            className={classes.appbar_rightIcon}
          >
            <AddIcon />
          </IconButton>
          <CreateClass
            isOpen={open}
            handleModal={handleModal}
            formSubmissionCheck={formSubmissionCheck}
          />
          <Link href="/cart">
            <IconButton color="secondary" className={classes.appbar_rightIcon}>
              <Badge badgeContent={totalUniqueItems} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Hidden xsDown>
            <IconButton
              color="secondary"
              className={classes.appbar_rightIcon}
              onClick={handleMenuModal}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            style={{ textTransform: "none" }}
            href={"/u/" + authUser}
          >
            <Avatar className={classes.avatar} alt="Remy Sharp" src=""></Avatar>
            {/* <Hidden smDown>
              <Typography
                style={{ fontWeight: 500, color: theme.palette.common.black }}
              >
                {authUser
                  ? JSON.parse(localStorage.getItem("user")).username
                  : ""}
              </Typography>
            </Hidden> */}
          </Button>
          {authUser && (
            <Menu
              className={classes.menu}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuModalClose}
            >
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
              <Link href={`/earnings`}>
                <MenuItem>Earnings</MenuItem>
              </Link>
            </Menu>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
