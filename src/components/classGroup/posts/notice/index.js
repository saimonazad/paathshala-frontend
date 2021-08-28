import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useAuth } from "../../../../../authentication";
import useSWR from "swr";
import { fetcher } from "../../../../services/fetcher";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.6),
    color: theme.palette.text.mineShaft,
    border: `2px solid ${theme.palette.primary.main}`,
  },

  button: {
    textTransform: "none",
    margin: 0,
  },
  title: {
    fontSize: "1rem",
    fontWeight: 600,
    margin: 0,
  },
  notice__text: {
    fontSize: "0.95rem",
    margin: 0,
  },
  add__btn: { verticalAlign: "bottom", color: theme.palette.primary.main },
  input: {
    width: "100%",
  },
}));
const Notice = ({ courseInfo }) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const [addNotice, setaddNotice] = useState(false);
  //get notice
  const {
    data: notice,
    error,
    mutate,
  } = useSWR(
    courseInfo ? `/course/notice?course_id=${courseInfo[0]?.id}` : null,
    fetcher
  );
  //set notice
  const [noticeText, setnoticeText] = useState("");
  const handleNotice = () => {
    httpClient
      .post(`/course/notice/`, {
        course_id: courseInfo[0]?.id,
        notice: noticeText,
      })
      .then((res) => {
        toast.success("Notice added successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        mutate();
        setaddNotice(false);
      })
      .catch((err) =>
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };
  return (
    <Box
      bgcolor="background.box"
      boxShadow={2}
      borderRadius={4}
      className={classes.root}
    >
      <Typography className={classes.title}>
        Notice Board{" "}
        {courseInfo && authUser == courseInfo[0]?.user && (
          <Button
            startIcon={<AddBoxIcon />}
            onClick={(e) => setaddNotice(!addNotice)}
          ></Button>
        )}
      </Typography>

      {addNotice ? (
        <>
          <TextField
            id="standard-textarea"
            placeholder="Type a notice!"
            multiline
            className={classes.input}
            value={noticeText}
            onChange={(e) => setnoticeText(e.target.value)}
          />
          <Button
            onClick={(e) => handleNotice()}
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={noticeText == ""}
          >
            Save
          </Button>
        </>
      ) : (
        <Typography className={classes.notice__text}>
          {notice && notice[notice.length - 1]?.notice}
        </Typography>
      )}
    </Box>
  );
};

export default Notice;
