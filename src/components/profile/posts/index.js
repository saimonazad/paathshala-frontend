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
    [theme.breakpoints.down("xs")]: { marginTop: theme.spacing(-4) },
  },
}));

const Posts = ({ user }) => {
  console.log(user);
  const { authUser } = useAuth();
  const classes = useStyles();
  const [mounted, setMounted] = useState(false);

  const { data: basicInfo, mutate: mutateBasic } = useSWR(
    mounted ? `/users/profile/?username=${user.username}` : null,
    fetcher
  );
  const { data: workInfo, mutate: mutateWork } = useSWR(
    mounted ? `/users/workinfo/?username=${user.username}` : null,
    fetcher,
    {
      initialData: workInfo,
      revalidateOnMount: true,
    }
  );
  const { data: academicInfo, mutate: mutateAcademic } = useSWR(
    mounted ? `/users/academic_info/?username=${user.username}` : null,
    fetcher
  );
  const [shouldRender, setShouldRender] = useState("");

  useEffect(() => {
    setMounted(true);
    if (shouldRender.charAt(0) == "A") {
      mutate(`/users/academic_info/?username=${user.username}`);
      trigger(`/users/academic_info/?username=${user.username}`);
    } else if (shouldRender.charAt(0) == "B") {
      mutate(`/users/profile/?username=${user.username}`);
      trigger(`/users/profile/?username=${user.username}`);
    } else if (shouldRender.charAt(0) == "W") {
      mutate(`/users/workinfo/?username=${user.username}`);
      trigger(`/users/workinfo/?username=${user.username}`);
    }
  }, [shouldRender]);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Info data={basicInfo} title="Basic Info" updateData={mutateBasic} />
        <Info data={workInfo} title="Work Info" updateData={mutateWork} />
        <Info
          data={academicInfo}
          title="Academic Info"
          updateData={mutateAcademic}
        />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.posts}>
        {/* {authUser === user.username ? <Following /> : ""} */}
        {authUser === user.username ? <PostCard /> : ""}
        <Feeds />
      </Grid>
    </Grid>
  );
};

export default Posts;
