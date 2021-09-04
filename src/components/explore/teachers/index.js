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
import { useAuth } from "../../../../authentication";

import Teacher from "./teacher";

const Teachers = ({ users, search }) => {
  const { authUser } = useAuth();
  const [searchData, setsearchData] = useState(true);
  const filteredResult =
    searchData && search != ""
      ? users.filter((user) =>
          (
            user.first_name.toLowerCase() + user.last_name.toLowerCase()
          ).includes(search)
        )
      : users;
  return (
    <>
      <CmtList
        data={filteredResult}
        renderRow={(user, index) =>
          authUser != user.username ? (
            <Teacher user={user} key={index} />
          ) : undefined
        }
      />
    </>
  );
};

export default Teachers;
