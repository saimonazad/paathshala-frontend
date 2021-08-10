import {
  Box,
  Button,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
  ImageIcon,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PlaceIcon from "@material-ui/icons/Place";
import PeopleIcon from "@material-ui/icons/People";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SchoolIcon from "@material-ui/icons/School";
import React, { useState } from "react";
import CmtList from "../../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../../@coremat/CmtList/ListEmptyResult";
import { useRouter } from "next/router";
import { useAuth } from "../../../../../authentication";
import AddUpdateModal from "./AddUpdateModal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useSWR, { mutate, trigger } from "swr";
import { deletion } from "../../../../services/fetcher";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
const useStyles = makeStyles((theme) => ({
  header: {
    alignItems: "center",
    backgroundColor: theme.palette.other.jacaranda,
    padding: theme.spacing(1.5),
    "& h2": {
      color: theme.palette.common.white,
      fontSize: 16,
    },
    "& button": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
      textTransform: "none",
      alignSelf: "center",
    },
  },
  list__icon: {
    fontSize: 30,

    color: theme.palette.secondary.main,
  },
  list_edit__icon: {
    fontSize: 20,
    cursor: "pointer",
  },
  list: {
    alignItems: "flex-start",
    "& .MuiListItemAvatar-root": { minWidth: 20 },
    padding: theme.spacing(0, 1.5),
    "& span": {
      paddingRight: theme.spacing(0.5),
    },
    "& p": {
      fontWeight: 400,
      margin: 0,
      fontSize: 12,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
    },
  },
}));
const Info = ({ title, data, updateData }) => {
  const router = useRouter();

  const { pname } = router.query;
  const { authUser } = useAuth();
  //add update modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState(0);
  const [method, setmethod] = useState("");
  const handleModalOpen = () => {
    setIsInfoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsInfoModalOpen(false);
  };

  const handleDeleteWork = (id) => {
    httpClient
      .delete(`/users/workinfo/?workinfo_id=${id}`)
      .then((res) => trigger("/users/workinfo/"))
      .catch((e) => console.log(e));
  };

  const classes = useStyles();
  return (
    <Box bgcolor="background.box" border={2} borderRadius={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.header}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        {authUser == pname ? (
          <>
            <Button
              variant="primary"
              onClick={() => {
                handleModalOpen();
                setmethod("add");
              }}
            >
              Add/Update
            </Button>
            <AddUpdateModal
              isInfoModalOpen={isInfoModalOpen}
              handleModalClose={handleModalClose}
              title={title}
              InfoData={data}
              id={selectedItem}
              method={method}
              updateData={updateData}
            />
          </>
        ) : (
          ""
        )}
      </Box>

      {title == "Basic Info" && (
        <CmtList
          data={data}
          renderRow={(info, index) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem className={classes.list}>
                <ListItemAvatar>
                  <ListItemIcon className={classes.list__icon}>
                    <PlaceIcon />
                  </ListItemIcon>
                </ListItemAvatar>
                <ListItemText>
                  Lives in: <span>{info.lives_in_char}</span>
                </ListItemText>
              </ListItem>
            </List>
          )}
          ListEmptyComponent={
            <ListEmptyResult loader={false} title="No Info Found" />
          }
        />
      )}
      {title == "Work Info" && (
        <CmtList
          data={data}
          renderRow={(info, index) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem className={classes.list}>
                <ListItemAvatar>
                  <ListItemIcon className={classes.list__icon}>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                </ListItemAvatar>
                <ListItemText>
                  <span>{info.position}</span>
                  <p>{info.dept}</p>
                  <p>{info.company}</p>
                </ListItemText>
                {authUser == pname ? (
                  <>
                    <ListItemIcon>
                      <EditIcon
                        onClick={() => {
                          handleModalOpen();
                          setmethod("edit");
                          setselectedItem(info.id);
                        }}
                        className={classes.list_edit__icon}
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <DeleteIcon
                        className={classes.list_edit__icon}
                        onClick={() => handleDeleteWork(info.id)}
                      />
                    </ListItemIcon>
                  </>
                ) : (
                  ""
                )}
              </ListItem>
            </List>
          )}
          ListEmptyComponent={
            <ListEmptyResult loader={false} title="No Info Found" />
          }
        />
      )}
      {title == "Academic Profile" && (
        <CmtList
          data={data}
          renderRow={(info, index) => (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem className={classes.list}>
                <ListItemAvatar>
                  <ListItemIcon className={classes.list__icon}>
                    <SchoolIcon />
                  </ListItemIcon>
                </ListItemAvatar>
                <ListItemText>
                  <span>{info.degree}</span>|<span>{info.result}</span>|
                  <span>{info.dept}</span>|<span>{info.institution}</span>
                </ListItemText>
              </ListItem>
            </List>
          )}
          ListEmptyComponent={
            <ListEmptyResult loader={false} title="No Info Found" />
          }
        />
      )}
    </Box>
  );
};

export default Info;
