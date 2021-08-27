import React, { useState } from "react";
import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating from "@material-ui/lab/Rating";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.6),
    color: theme.palette.text.mineShaft,
  },
  follower: {
    "& .MuiAvatar-root": {
      marginRight: theme.spacing(0.5),
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
    },
    "& p": {
      marginLeft: theme.spacing(1),
    },
  },
  button: {
    textTransform: "none",
  },
}));
const RatingClass = () => {
  const classes = useStyles();
  const router = useRouter();
  let urlParam = router.query;
  let courseId = urlParam.slug[0];

  //rating modal
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  //rating value
  const [ratingValue, setratingValue] = useState(0);

  const handleRating = () => {
    httpClient
      .post(`/course/rating/`, { course_id: courseId, rating: ratingValue })
      .then((response) => {
        if (response.status == 201) {
          toast.success("Class rated successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleModalClose();
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          toast.warning("You have already rated the class!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Something went wrong!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  return (
    <Box
      bgcolor="background.box"
      boxShadow={2}
      borderRadius={4}
      className={classes.root}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      justifyItems="center"
    >
      <Box>
        <Typography>4.5/5 36 </Typography>
      </Box>
      <Box display="flex" alignItems="center" className={classes.follower}>
        <Button
          onClick={handleModalOpen}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Give Ratings
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Give your rating"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => {
                setratingValue(newValue);
              }}
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRating}
            disabled={ratingValue == 0}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RatingClass;
