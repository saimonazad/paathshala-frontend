import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Info from "./info";
import Feeds from "../../shared/feeds";
import Following from "./following";
import PostCard from "../../shared/postCard"
import { useSelector, connect } from "react-redux";

//feed action -redux
import {
  getBasicInfo,
  getWorkInfo,
  getAcademicInfo,
} from "../../../redux/actions/profileActions";
//redux store
import { wrapper } from "../../../redux/store";

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

const Posts = () => {
  const classes = useStyles();
  const { basicInfo } = useSelector((state) => state.basic);
  const { workInfo } = useSelector((state) => state.work);
  const { academicInfo } = useSelector((state) => state.academic);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={4}>
        <Info data={basicInfo} title="Basic Info" />
        <Info data={workInfo} title="Work Info" />
        <Info data={academicInfo} title="Academic Profile" />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.posts}>
        <Following />
        <PostCard/>
        <Feeds />
      </Grid>
    </Grid>
  );
};
//server side fetch redux
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    store.dispatch(getBasicInfo(req));
    store.dispatch(getWorkInfo(req));
    store.dispatch(getAcademicInfo(req));
  }
);
//map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    basic: dispatch(getBasicInfo()),
    work: dispatch(getWorkInfo()),
    academic: dispatch(getAcademicInfo()),
  };
};
//connect HOC with mapDispatchToProps
export default connect(null, mapDispatchToProps)(Posts);
