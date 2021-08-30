import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  Link,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";

import StarIcon from "@material-ui/icons/Star";
import useSWR from "swr";
import { fetcher } from "../../../services/fetcher";
import { useAuth } from "../../../../authentication";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";
import GridEmptyResult from "../../../../@coremat/CmtGridView/GridEmptyResult";
import { useRouter } from "next/router";
import { httpClient } from "../../../../authentication/auth-methods/jwt-auth/config";
import { toast } from "react-toastify";
import CmtCard from "../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../@coremat/CmtCard/CmtCardContent";

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

const AssignmentFiles = () => {
  const router = useRouter();
  let urlParam = router.query;
  let courseId = urlParam.slug[0];
  const classes = useStyles();

  const [files, setfiles] = useState([]);

  function findFiles() {
    httpClient
      .get(`/newsfeed/post/?posted_on=${courseId}-assignment`)
      .then((res1) => {
        res1.data.map((feed) => {
          httpClient
            .get(`/newsfeed/media/?post=${feed.id}`)
            .then((res) => {
              if (res.data.length > 0) {
                setfiles((prevState) => [
                  ...prevState,
                  {
                    user: res.data[0]?.user,
                    file: res.data[0]?.file,
                  },
                ]);
              }
            })
            .catch((e) => console.log(e));
        });
        // console.log(todaysClass);

        // setloading(false);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    findFiles();
  }, []);
  //   //get feed data by assignment
  //   const { data: feed, error } = useSWR(
  //     `/newsfeed/post/?posted_on=${courseId}-assignment`,
  //     fetcher
  //   );
  //   console.log(feed);
  //   let fileData = [];
  //   let abc = "";
  //   if (feed) {
  //     feed.map((item) => {
  //       httpClient
  //         .get(`/newsfeed/media/?post=${item.id}`)
  //         .then((res) => {
  //           if (res.data.length > 0) {
  //             setfiles((prevState) => [
  //               ...prevState,
  //               {
  //                 user: res.data[0]?.user,
  //                 file: res.data[0]?.file,
  //               },
  //             ]);
  //           }
  //         })
  //         .catch((e) => console.log(e));
  //     });
  //   }

  return (
    <Box bgcolor="background.box" borderRadius={4} className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography component="h1">Submitted Assignment</Typography>
        <div>
          {/* <StarIcon className={classes.startIcon} />
          <Typography component="span">4.5/5</Typography>
          <Typography component="span">(36)</Typography> */}
        </div>
      </Box>
      <Box className={classes.class__list}>
        <CmtList
          data={files}
          renderRow={renderRow}
          onEndReached={() => console.log("You have reached end of list")}
          ListEmptyComponent={
            <ListEmptyResult
              loader={false}
              title="No Data Found"
              content="Empty result description"
              actionTitle="Add Content"
            />
          }
        />
      </Box>
    </Box>
  );
};
const renderRow = (item, index) => {
  let fileUrlArray = item.file.split("/");
  let filename = fileUrlArray[fileUrlArray.length - 1].toString();
  console.log(filename);
  return (
    <Box mb={2} key={index}>
      <CmtCard>
        <Box p={1} display="flex">
          <Typography style={{ marginRight: 10 }}>{item.user}</Typography>
          <Link href={`${item.file}`} target="_blank" download>
            <Typography style={{ fontWeight: 600 }}>{filename}</Typography>
          </Link>
        </Box>
      </CmtCard>
    </Box>
  );
};

export default AssignmentFiles;
