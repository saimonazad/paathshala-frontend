import { Box, Typography, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
  search: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    color: theme.palette.primary.main,
  },
  inputRoot: {
    color: theme.palette.other.silverChalice,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 8,
    fontSize: 16,
  },
  inputInput: {
    padding: theme.spacing(1.2, 3, 1.2, 3),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
  },

  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  test: {},
}));
const Earnings = () => {
  const classes = useStyles();
  const [earningData, setearningData] = useState([]);

  function getTransactions() {
    httpClient.get(`/course/info?type=own`).then((res) => {
      if (res.data.length > 0) {
        res.data.map((course) => {
          httpClient
            .get(`/payment/transaction?course_id=${course.id}`)
            .then((res1) => {
              if (res1.data.length > 0) {
                setearningData((prevState) => [
                  ...prevState,
                  {
                    date: moment(res1.data[0]?.timestamp).format("MMM Do YY"),
                    user: res1.data[0]?.user,
                    courseName: course?.coursename,
                    amount: res1.data[0]?.total_payment,
                    courseId: course?.id,
                  },
                ]);
              }
            });
        });
      }
    });
  }
  useEffect(() => {
    getTransactions();
  }, []);

  //table column
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
    },
    {
      field: "user",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "courseName",
      headerName: "Class name",
      width: 150,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      editable: false,
    },
  ];
  //calculate total collected
  let total_collected = 0;
  let op_charge = 0;
  total_collected =
    earningData.length > 0
      ? earningData.map((c) => total_collected + c.amount)
      : 0;

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Typography>Earnings</Typography>
      </Box>
      <Box style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={earningData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Box>Total Collected : {total_collected}</Box>
        <Box>Operational charges(25%) : {(total_collected * 25) / 100}</Box>
        <Box>
          Your earnings : {total_collected - (total_collected * 25) / 100}
        </Box>
      </Box>
    </Box>
  );
};

export default Earnings;
