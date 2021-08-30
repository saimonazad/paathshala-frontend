import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import StarIcon from "@material-ui/icons/Star";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { useAuth } from "../../../../authentication";
import CmtList from "../../../../@coremat/CmtList";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";
import { useRouter } from "next/router";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    boxShadow: "0px 3px 6px #00000029",
  },
  header: {
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(2),
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    "& h1": {
      fontSize: 25,
      fontWeight: 500,
      color: theme.palette.common.white,
    },
    "& span": {
      fontSize: 16,
      fontWeight: 300,
      color: theme.palette.common.white,
      margin: theme.spacing(0, 0.3),
    },
  },
  startIcon: {
    color: theme.palette.other.star,
    verticalAlign: "bottom",
    fontSize: 28,
  },
  class__list: {
    padding: theme.spacing(2, 2, 1),
    "& > *": {
      marginBottom: theme.spacing(1.5),
    },
  },
  class: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1.5, 2),
    "& p": {
      fontWeight: 500,
    },
    "& button": {
      textTransform: "none",
      boxShadow: "0px 3px 12px #00000029",
      padding: theme.spacing(0.6, 5),
      backgroundColor: theme.palette.common.white,
    },
  },
  divider: {
    margin: theme.spacing(0, 3),
  },
  btn: {
    marginLeft: theme.spacing(2),
    textTransform: "none",
  },
  dropzone: {
    flex: 1,
    border: "2px dashed rgba(0, 0, 0, 0.06)",
    display: "flex",
    outline: "none",
    padding: "40px 20px",
    transition: "border .24s ease-in-out",
    alignItems: "center",
    borderRadius: "2px",
    flexDirection: "column",
    backgroundColor: "#f4f4f7",
  },
}));

const Assignments = () => {
  const toastId = React.useRef(null);

  const router = useRouter();
  let urlParam = router.query;
  let courseId = urlParam.slug[0];

  const classes = useStyles();
  const [attachments, setAttachments] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        return {
          id: Math.floor(Math.random() * 10000),
          path: file.path,
          metaData: { type: file.type, size: file.size },
          preview: URL.createObjectURL(file),
          file: file,
        };
      });
      onAddAttachments(files);
    },
  });

  const onAddAttachments = (files) => {
    setAttachments([...attachments, ...files]);
  };
  const files = attachments.map((file) => (
    <ListItem key={file.path}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  const submitFileHandler = () => {
    const feedData = {
      post_text: "assignment",
      posted_on: `${courseId}-assignment`,
      post_type: "assignment",
    };
    httpClient
      .post(`/newsfeed/post/`, feedData)
      .then((res) => {
        if (attachments.length > 0) {
          const formData = new FormData();
          formData.append("post", res.data.id);
          formData.append("file", attachments[0].file);
          httpClient
            .request({
              method: "post",
              url: "/newsfeed/media/",
              data: formData,
              onUploadProgress: (p) => {
                const progress = p.loaded / p.total;

                // check if we already displayed a toast
                if (toastId.current === null) {
                  toastId.current = toast("Upload in Progress", {
                    progress: progress,
                  });
                } else {
                  toast.update(toastId.current, {
                    progress: progress,
                  });
                }
              },
            })
            .then((data) => {
              // Upload is done!
              // The remaining progress bar will be filled up
              // The toast will be closed when the transition end
              toast.done(toastId.current);
            })
            .catch((e) =>
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

          // httpClient
          //   .post(`/newsfeed/media/`, formData)
          //   .then((res) =>
          //     toast.success("Class rated successfully!", {
          //       position: "bottom-center",
          //       autoClose: 3000,
          //       hideProgressBar: false,
          //       closeOnClick: true,
          //       pauseOnHover: true,
          //       draggable: true,
          //       progress: undefined,
          //     })
          //   )
          // .catch((e) =>
          //   toast.error("Something went wrong!", {
          //     position: "bottom-center",
          //     autoClose: 3000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   })
          // );
        }
        // mutate();
      })
      .catch((e) =>
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
    setAttachments([]);
  };
  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Submit Assignment</Typography>
        <div>
          {/* <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography> */}
        </div>
      </Box>
      <Box className={classes.class__list}>
        <Box>
          <Box {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            <Typography>
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </Box>
          <aside>
            <Typography component="h4" variant="inherit">
              Files
            </Typography>
            <List>{files}</List>
          </aside>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={attachments.length == 0}
          onClick={submitFileHandler}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Assignments;
