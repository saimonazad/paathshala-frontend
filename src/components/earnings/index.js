import {
  Box,
  Typography,
  makeStyles,
  FormControl,
  Select,
} from "@material-ui/core";
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
  subtitle: {
    marginRight: 15,
  },
  test: {},
  formControl: {
    backgroundColor: theme.palette.other.bonJour,
  },
  select: {
    alignSelf: "center",
    "& .MuiInputBase-input": {
      padding: "12px 26px 12px 12px",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 4,
      color: theme.palette.other.DoveGray,
      backgroundColor: theme.palette.other.bonJour,
    },
    "& .MuiInput-underline:before": {
      borderBottom: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottom: 0,
    },
    "& .MuiInput-underline:hover": {
      borderBottom: 0,
    },
  },
}));
const Earnings = () => {
  const classes = useStyles();
  const [earningData, setearningData] = useState([]);
  const [month, setmonth] = useState(new Date().getMonth());

  function getTransactions() {
    httpClient.get(`/course/info?type=own`).then((res) => {
      if (res.data.length > 0) {
        res.data.map((course) => {
          httpClient
            .get(
              `/payment/transaction?course_id=${course.id}&type=student&month=${month}`
            )
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
        <Typography className={classes.title}>Earnings</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography className={classes.subtitle}>Select Month</Typography>
        <FormControl
          variant="filled"
          className={classes.formControl}
          onChange={(e) => {
            setmonth(e.target.value);
          }}
        >
          <Select native className={classes.select} value={month}>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </Select>
        </FormControl>
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
        <Box>Operational charges : {(total_collected * 25) / 100}</Box>
        <Box>
          Your earnings : {total_collected - (total_collected * 25) / 100}
        </Box>
      </Box>
    </Box>
  );
};

export default Earnings;
