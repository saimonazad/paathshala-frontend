import React from "react";
import Navbar from "./Navbar";
import BottomNavBar from "./BottomNavbar";
import { Container, Hidden, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuth } from "../../authentication";
import PageLoader from "../../@jumbo/components/PageComponents/PageLoader";
import { CartProvider } from "react-use-cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles((theme) => ({
  container__width: {
    maxWidth: 750,
    marginBottom: 80,
  },
}));

const Layout1 = ({ children }) => {
  const classes = useStyles();
  const { authUser, isLoadingUser } = useAuth();
  const router = useRouter();

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (
    !authUser &&
    (router.pathname === "/signin" ||
      router.pathname === "/signup" ||
      router.pathname === "/")
  ) {
    return <>{children}</>;
  }
  return (
    <CartProvider id={authUser}>
      <Navbar />
      <Container className={classes.container__width}>
        <div className={classes.root}>{children}</div>
      </Container>
      <Hidden smUp>
        <BottomNavBar />
      </Hidden>
      <ToastContainer />
    </CartProvider>
  );
};

export default Layout1;
