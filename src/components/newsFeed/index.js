import React from 'react'
import Announcement from './announcement'
import PostCard from './postCard'
import Feeds from './feeds'

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(2),
    },
  },
}));

const NewsFeed = () => {
      const classes = useStyles();

    return (
        <div className={classes.root}>
        <Announcement/>
        <PostCard/>
        <Feeds/>
        </div>
    )
}

export default NewsFeed
