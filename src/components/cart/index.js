import React, { useContext } from "react";
import { CartProvider, useCart } from "react-use-cart";
import CartItem from "./cartItem";
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
  divider: {
    backgroundColor: theme.palette.other.DoveGray,
    height: 2,
    margin: theme.spacing(3, 0, 1),
  },
  totalText: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.mineShaft,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: theme.palette.text.mineShaft,
  },
  checkoutBtn: {
    float: "right",
    padding: theme.spacing(1.5, 3),
  },
}));
const Cart = () => {
  const classes = useStyles();
  const { items, cartTotal } = useCart();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Billing Section</Typography>
      {items.map((item) => (
        <CartItem courseId={item.id} price={item.price} />
      ))}
      <Divider className={classes.divider} />
      <Box display="flex" justifyContent="space-between">
        <Typography className={classes.totalText}>Grand Total </Typography>
        <Typography className={classes.totalText}>৳ {cartTotal}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.checkoutBtn}
      >
        Check Out
      </Button>
    </Box>
  );
};

export default Cart;
