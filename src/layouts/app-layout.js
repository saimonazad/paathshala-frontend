import React from "react";
import Navbar from "./Navbar";
import BottomNavBar from "./BottomNavbar";
import { Container, Hidden, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container__width: {
    maxWidth: 900,
    marginBottom: 80,
  },
}));

const Layout1 = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container className={classes.container__width}>
        <div className={classes.root}>{children}</div>
      </Container>
      <Hidden smUp>
        <BottomNavBar />
      </Hidden>
    </div>
  );
};

export default Layout1;
