import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import {FormControl,FormLabel,makeStyles} from "@material-ui/core"
import useSWR from "swr";
import { fetcher, update } from "../../../../services/fetcher";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
    [theme.breakpoints.up("md")]: {
      width: 600,
    },
  },

  submit: {
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(1.5, 3),
    textTransform: "none",
    fontWeight: 400,
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },
  divider: {
    margin: theme.spacing(1, 0, 2),
    width: "10%",
  },
  textField: {
    marginTop: theme.spacing(0.5),
    "& .MuiOutlinedInput-input": {
      padding: theme.spacing(1.5, 1.5),
      backgroundColor: theme.palette.other.bonJour,
      color: theme.palette.other.DoveGray,
    },
    "& label.Mui-focused": {
      color: theme.palette.common.black,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.common.black,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.common.black,
      },
    },
  },
  label: {
    display: "block",
    fontSize: 12,
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },

  grid: {
    "&>*": {
      padding: theme.spacing(0.75, 0.63),
    },

    [theme.breakpoints.up("lg")]: {
      "&>*": {
        padding: theme.spacing(1.6, 2.5),
      },
    },
  },
  formControl: {
    width: "100%",
    backgroundColor: theme.palette.other.bonJour,
  },
  select: {
    alignSelf: "center",
    "& .MuiInputBase-input": {
      padding: "12px",
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
  toggleContainer: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      marginBottom: 40,
    },
    display: "flex",
    justifyContent: "space-between",
    height: 30,
    "& > button": {
      border: "2px solid #AF5698!important",
      borderRadius: "4px!important",
      background: "white",
      padding: 0,
    },
    "& * > button": {
      textTransform: "none",
    },
    "& .MuiToggleButton-root.Mui-selected": {
      padding: 0,
      background: theme.palette.primary.main,
      "& * > button": {
        color: "white",
        padding: theme.spacing(0, 0),
      },
    },
  },
  btnToggle: {
    "&.MuiButton-root": {
      padding: 0,
    },
  },
  errorText: {
    margin: 0,
  },
  time: {},
}));
export default function FormDialog({
  isInfoModalOpen,
  handleModalClose,
  title,
  data,
  id,
  method,
}) {

    const classes = useStyles();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleFormSubmitBasicInfo = (data) => {
    httpClient.post("/users/profile/", data);
  };

  const basic = (
    <>
      <DialogTitle id="form-dialog-title">Basic Info</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmitBasicInfo)}>
        <DialogContent>
          {/* <DialogContentText>{title}</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lives In"
            type="text"
            fullWidth
            {...register("lives_in_char")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
  const workEdit = (
    <>
      <DialogTitle id="form-dialog-title">Work Info</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmitBasicInfo)}>
        <DialogContent>
          <FormLabel htmlFor="input" className={classes.label}>
            End Date
          </FormLabel>
          <FormControl
            variant="filled"
            className={classes.select}
            error={errors.gender ? true : false}
          >
            <TextField
              id="date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: false,
              }}
              error={errors.end_date ? true : false}
              {...register("end_date", {
                required: true,
              })}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={isInfoModalOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        {title == "Basic Info" && basic}
        {title == "Work Info" && method == "edit" && workEdit}
        {title == "Work Info" && method == "add" && <h1>add</h1>}
      </Dialog>
    </div>
  );
}
