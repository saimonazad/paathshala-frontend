import React from "react";
import { makeStyles, IconButton } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import ExploreIcon from "@material-ui/icons/Explore";
import MenuIcon from "@material-ui/icons/Menu";
import theme from "../../utils/theme";
import { useRouter } from "next/dist/client/router";
const useStyles = makeStyles({
  root: {
    position: "fixed",
    width: "100%",
    top: "auto",
    bottom: 0,
    boxShadow: "0px -3px 6px #00000029",
    padding: theme.spacing(1, 0),

    "& .MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly": {
      paddingTop: "6px!important",
    },
    "& .MuiBottomNavigationAction-root": {
      minWidth: "auto",
      backgroundColor: theme.palette.secondary.light,
      margin: theme.spacing(0, 1.5),
      borderRadius: 4,
      color: theme.palette.secondary.main,
    },
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
});

export default function BottomNavBar() {
  const classes = useStyles();
  const router = useRouter();

  const [value, setValue] = React.useState(router.asPath);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction value="/" icon={<HomeIcon />} href={"/"} />
      <BottomNavigationAction
        value="/explore"
        icon={<ExploreIcon />}
        href={"/explore"}
      />
      <BottomNavigationAction value="nearby" icon={<ChatIcon />} />
      <BottomNavigationAction value="folder" icon={<NotificationsIcon />} />
      <BottomNavigationAction value="menu" icon={<MenuIcon />} />
    </BottomNavigation>
  );
}
