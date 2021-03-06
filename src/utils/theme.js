import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        height: 6,
        borderRadius: "4px 4px 0 0",
        width: 20,
      },
    },
    MuiButton: {
      root: {
        "&:hover": {
          color: "#5d1049",
        },
      },
    },
    MuiLink: {
      underlineHover: {
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#5d1049",
    },
    secondary: {
      main: "#5d1049",
      light: "#c2c2c2",
    },
    other: {
      grey: "#DADADA",
      DoveGray: "#707070",
      gallery: "#EEEEEE",
      jacaranda: "#220219",
      star: "#ffb400",
      silverChalice: "#AFAFAF",
      bonJour: "#DCD8DB",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#5d1049",
      secondary: "#000000",
      gray: "#91959D",
      mineShaft: "#222222",
      mineShaftLight: "#3F3E3E",
    },
    background: {
      default: "#e8ecef",
      box: "#fff",
    },
  },
});

export default theme;
