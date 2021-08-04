import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher, update } from "../../../../services/fetcher";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
export default function FormDialog({
  isInfoModalOpen,
  handleModalClose,
  title,
  data,
}) {
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
      </Dialog>
    </div>
  );
}
