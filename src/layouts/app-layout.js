import React from "react";
import Navbar from "./Navbar";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // "& > * > *": {
    //   margin: theme.spacing(2, 0),
    //   padding: theme.spacing(2),
    // },
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <div className={classes.root}>{children}</div>
      </Container>
    </div>
  );
};

export default Layout;
