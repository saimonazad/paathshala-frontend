import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../shared/feeds";
import Following from "./following";
import PostCard from "../../shared/postCard";
import { useAuth } from "../../../../authentication";
import useSWR, { mutate, trigger } from "swr";
import { fetcher } from "../../../services/fetcher";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * > *": {
      margin: theme.spacing(2, 0),
    },
  },
  posts: {
    [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(-4) },
  },
}));

const Posts = ({ user }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [mounted, setMounted] = useState(false);

  const { data: basicInfo } = useSWR(
    mounted ? `/users/profile/` : null,
    fetcher
  );
  const { data: workInfo } = useSWR(
    mounted ? `/users/workinfo/` : null,
    fetcher,
    {
      initialData: workInfo,
      revalidateOnMount: true,
    }
  );
  const { data: academicInfo } = useSWR(
    mounted ? `/users/academic_info/` : null,
    fetcher
  );
  const [shouldRender, setShouldRender] = useState(0);

  useEffect(() => {
    setMounted(true);
    mutate(`/users/workinfo/`);
    trigger(`/users/workinfo/`);
  }, [shouldRender]);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Info
          data={basicInfo}
          title="Basic Info"
          updateData={setShouldRender}
        />
        <Info data={workInfo} title="Work Info" updateData={setShouldRender} />
        <Info
          data={academicInfo}
          title="Academic Profile"
          updateData={setShouldRender}
        />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.posts}>
        {authUser === user.username ? <Following /> : ""}
        {authUser === user.username ? <PostCard /> : ""}
        <Feeds />
      </Grid>
    </Grid>
  );
};

export default Posts;
