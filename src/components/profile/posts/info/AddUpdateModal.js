import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  makeStyles,
  withStyles,
  Grid,
  Box,
} from "@material-ui/core";
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
  date: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
      "& .MuiFormControl-root": {
        width: "100%",
      },
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
    marginTop: 15,
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
    color: "red",
  },
  time: {},
}));
const dialogTitleStyle = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
//custom dialog title
const DialogTitle = withStyles(dialogTitleStyle)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
//main func
export default function FormDialog({
  isInfoModalOpen,
  handleModalClose,
  title,
  InfoData,
  id,
  method,
  updateData,
}) {
  const classes = useStyles();
  const [render, setrender] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmitBasicInfo = (data) => {
    httpClient.post("/users/profile/", data);
  };
  const basic = (
    <>
      <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
        Modal title
      </DialogTitle>
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

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={isInfoModalOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        {title == "Basic Info" && basic}
        {title == "Work Info" && method == "edit" && (
          <WorkAddUpdate
            handleModalClose={handleModalClose}
            method={method}
            InfoData={InfoData}
            id={id}
            updateData={updateData}
          />
        )}
        {title == "Work Info" && method == "add" && (
          <WorkAddUpdate
            handleModalClose={handleModalClose}
            method={method}
            InfoData={InfoData}
            id={id}
            updateData={updateData}
          />
        )}
      </Dialog>
    </div>
  );
}

const WorkAddUpdate = ({
  handleModalClose,
  updateData,
  InfoData,
  id,
  method,
}) => {
  let formValues = InfoData?.filter((p) => p.id == id);
  const {
    register: registerWork,
    handleSubmit: handleSubmitWork,
    formState: { errors },
    reset: resetWork,
    control,
  } = useForm();
  const classes = useStyles();

  //update handler func
  const handleFormEditWorkInfo = (data) => {
    httpClient.put(`/users/workinfo/?workinfo_id=${id}`, data);
    updateData(Math.random());
    resetWork();
  };
  //add handler func
  const handleFormAddWorkInfo = (data) => {
    httpClient.post(`/users/workinfo/`, data);
    updateData(Math.random());
    resetWork();
  };

  return (
    <>
      <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
        Work Info
      </DialogTitle>
      <form
        onSubmit={
          method == "edit"
            ? handleSubmitWork(handleFormEditWorkInfo)
            : handleSubmitWork(handleFormAddWorkInfo)
        }
      >
        <DialogContent>
          <FormLabel htmlFor="input" className={classes.label}>
            Position
          </FormLabel>
          <TextField
            // value={formValues ? formValues[0].position : ""}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            error={errors.position ? true : false}
            {...registerWork("position", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.position && errors.position.type === "required" && (
            <p className={classes.errorText}>Position is required</p>
          )}
          {/* <Controller
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                {...field}
              />
            )}
            control={control}
            name="position"
            defaultValue={formValues[0].position}
          /> */}
          <FormLabel htmlFor="input" className={classes.label}>
            Department
          </FormLabel>
          <TextField
            // value={formValues ? formValues[0].dept : ""}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            error={errors.dept ? true : false}
            {...registerWork("dept", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.dept && errors.dept.type === "required" && (
            <p className={classes.errorText}>Department is required</p>
          )}
          <FormLabel htmlFor="input" className={classes.label}>
            Company
          </FormLabel>
          <TextField
            // value={formValues ? formValues[0].company : ""}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            error={errors.company ? true : false}
            {...registerWork("company", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.company && errors.company.type === "required" && (
            <p className={classes.errorText}>Company is required</p>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            className={classes.date}
          >
            <Box>
              <FormLabel htmlFor="input" className={classes.label}>
                Start Date
              </FormLabel>
              <FormControl variant="filled" className={classes.select}>
                <TextField
                  // value={formValues ? formValues[0].starting_date : ""}
                  id="date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={errors.starting_date ? true : false}
                  {...registerWork("starting_date", {
                    required: true,
                  })}
                />
              </FormControl>
              {errors.starting_date &&
                errors.starting_date.type === "required" && (
                  <p className={classes.errorText}>Starting date is required</p>
                )}
            </Box>
            <Box>
              <FormLabel htmlFor="input" className={classes.label}>
                End Date
              </FormLabel>
              <FormControl variant="filled" className={classes.select}>
                <TextField
                  // value={formValues ? formValues[0].ending_date : ""}
                  id="date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  error={errors.ending_date ? true : false}
                  {...registerWork("ending_date", {
                    required: true,
                  })}
                />
              </FormControl>
              {errors.ending_date && errors.ending_date.type === "required" && (
                <p className={classes.errorText}>Ending date is required</p>
              )}
            </Box>
          </Box>
          <FormLabel htmlFor="input" className={classes.label}>
            address
          </FormLabel>
          <TextField
            // value={formValues ? formValues[0].address : ""}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            error={errors.address ? true : false}
            {...registerWork("address", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.address && errors.address.type === "required" && (
            <p className={classes.errorText}>Address is required</p>
          )}
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
};
