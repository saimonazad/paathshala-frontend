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
  },
  palette: {
    type: "light",
    primary: {
      main: "#af5698",
    },
    secondary: {
      main: "#5d1049",
      light: "#fbdef3",
    },
    other: {
      grey: "#DADADA",
      DoveGray: "#707070",
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
