import React from "react";
import Navbar from "./Navbar";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container__width: {
    maxWidth: 1100,
  },
}));

const Layout2 = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container__width}>
        <div className={classes.root}>{children}</div>
      </Container>
    </div>
  );
};

export default Layout2;
