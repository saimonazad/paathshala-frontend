import React from "react";
import Navbar from "./Navbar";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container__width: {
    maxWidth: 1100,

  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container className={classes.container__width}>
        <div className={classes.root}>{children}</div>
      </Container>
    </div>
  );
};

export default Layout;
