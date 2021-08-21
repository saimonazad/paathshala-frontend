import React from "react";
import {
  Avatar,
  Box,
  makeStyles,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useSWR from "swr";
import { fetcher } from "../../services/fetcher";
import { CartProvider, useCart } from "react-use-cart";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
    borderRadius: 4,
    boxShadow: "0px 3px 6px #00000029",
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.mineShaft,
  },
  subtitle1: {
    fontSize: 14,
    color: theme.palette.text.mineShaftLight,
  },
  subtitle2: {
    fontSize: 14,
    color: theme.palette.other.DoveGray,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  days: {
    fontWeight: 600,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.other.DoveGray}`,
    borderRadius: 4,
    marginRight: theme.spacing(1),
  },
  className: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.text.mineShaft,
    marginBottom: theme.spacing(1),
  },
  removeBtn: {
    padding: 0,
    fontSize: "10rem",
  },
  cancelIcon: {
    fontSize: "1.5rem",
    backgroundColor: "red",
    color: theme.palette.common.white,
    borderRadius: 4,
  },
}));
const CartItem = ({ courseId, price }) => {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart();

  const classes = useStyles();
  const { data: course } = useSWR(
    `/course/info?course_id=${courseId}`,
    fetcher
  );
  let days;
  if (course) {
    days = course[0]?.days?.split(",");
    console.log(days);
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.root}
      >
        <Box display="flex">
          <Box>
            <Avatar className={classes.avatar} />
          </Box>
          <Box>
            {course?.length > 0 ? <User username={course[0]?.user} /> : ""}
            <Typography className={classes.subtitle1}>Lecturer</Typography>
            <Typography className={classes.subtitle2}>Dhaka College</Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box style={{ textAlign: "center" }}>
          <Typography variant="h6" className={classes.className}>
            {course ? course[0]?.subject : "Subject"}
          </Typography>
          {days &&
            days?.map((item) => <span className={classes.days}>{item}</span>)}
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box display="flex" alignSelf="center">
          <Typography variant="h6" className={classes.name}>
            ৳ {price}
          </Typography>
        </Box>
        <IconButton
          disableRipple
          disableFocusRipple
          className={classes.removeBtn}
          onClick={() => removeItem(courseId)}
        >
          <CloseIcon className={classes.cancelIcon} />
        </IconButton>
      </Box>
    </>
  );
};

function User({ username }) {
  const classes = useStyles();

  const { data: user } = useSWR(
    `/users/userinfo/?username=${username}`,
    fetcher
  );
  return (
    <>
      {user ? (
        <>
          <Typography className={classes.name}>
            {user[0]?.first_name} {user[0]?.last_name}
          </Typography>
        </>
      ) : (
        <Typography className={classes.name}>{user}</Typography>
      )}
    </>
  );
}

export default CartItem;
