import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import CmtList from "../../../../@coremat/CmtList";
import ListEmptyResult from "../../../../@coremat/CmtList/ListEmptyResult";

import Teacher from "./teacher";

const Teachers = () => {
  
  const { users } = useSelector(({ getAllUsers }) => getAllUsers);

  return (
    <>
      {users.map((user, index) => (
        <Teacher user={user} key={index} />
      ))}
    </>
  );
};

export default Teachers;
