import React, { useContext, useState, useEffect } from "react";
import CorematContext from "../../../@jumbo/components/contextProvider/CorematContext";
import CmtMediaObject from "../../../@coremat/CmtMediaObject";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import {
  Box,
  Button,
  fade,
  IconButton,
  Link,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CmtList from "../../../@coremat/CmtList";
import CmtNotificationItem from "../../../@coremat/CmtNotifications/CmtNotificationItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CmtAvatar from "../../../@coremat/CmtAvatar";
import clsx from "clsx";
import CmtCard from "../../../@coremat/CmtCard";
import { httpClient } from "../../../authentication/auth-methods/jwt-auth/config";

const useStyles = makeStyles((theme) => ({
  headingRoot: {
    padding: "10px 24px",
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  notificationRoot: {
    padding: "5px 24px",
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.08),
    },
    "& .MuiSvgIcon-root": {
      fontSize: 18,
    },
  },
  notificationRead: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
  },
  textSm: {
    fontSize: 12,
  },
}));

const RenderRow = ({ notification, onReadUnread }) => {
  const classes = useStyles();
  const { name, avatar, message, timestamp, media, status } = notification;

  // var temp = message.split(" ");
  // temp.shift(); // parts is modified to remove first word
  // var messageText;
  // if (temp instanceof Array) {
  //   messageText = temp.join(" ");
  // } else {
  //   messageText = temp;
  // }
  // console.log(messageText);

  var strslit = message.split(" ");
  let postCourseFind = strslit.filter(
    (s) => s.includes("post_id") || s.includes("course_id")
  );
  let extractMessage = strslit.filter(
    (s) => s.includes("post_id") == false && s.includes("course_id") == false
  );
  let cid = postCourseFind.toString().split(":");

  let link =
    cid == ""
      ? null
      : cid[0] == "post_id"
      ? `/?post=${cid[1]}`
      : cid[0] == "course_id"
      ? `/c/${cid[1]}`
      : null;

  return (
    <CmtNotificationItem
      className={clsx(classes.notificationRoot, {
        [classes.notificationRead]: status === "read",
      })}
      content={
        <Link href={link}>
          <CmtMediaObject
            style={{
              alignItems: "center",
            }}
            avatar={avatar}
            avatarPos="center"
            avatarProps={{
              style: { height: 48, width: 48, marginRight: 16 },
            }}
            title={
              <Typography component="h5" variant="body2">
                <Typography component="span" variant="body2">
                  {extractMessage.join(" ")}
                </Typography>
                {/* <Link href={`/u/${name}`}>
                <Typography
                  className="pointer"
                  component="span"
                  color="primary"
                  variant="body2"
                >
                  {name}
                </Typography>
              </Link> */}
              </Typography>
            }
            subTitle={
              <Box display="flex" alignItems="center" mt={1}>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                  className={classes.textSm}
                >
                  {moment(timestamp).fromNow()}
                </Typography>
              </Box>
            }
          />
        </Link>
      }
      readState={status === "read"}
      onReadUnread={() => onReadUnread(notification)}
      actionMenu={
        <Tooltip title="More Options">
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      }
    />
  );
};

const Notification = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    httpClient
      .get(`/users/notification`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);
  const markAllAsRead = () => {
    setData(
      data.map((item) => {
        item.status = "read";
        return item;
      })
    );
  };

  const handleReadUnread = (notification) => {
    notification.status = notification.status === "read" ? "unread" : "read";

    setData(
      data.map((item) => {
        if (item.id === notification.id) {
          return notification;
        }

        return item;
      })
    );
  };

  return (
    <CmtCard>
      <Box className={classes.headingRoot}>
        <Box component="h3" color="text.primary" my={0}>
          Notification
        </Box>
        <Box ml="auto">
          {/* <Button color="primary" size="small" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <Button color="primary" size="small" style={{ marginLeft: 4 }}>
            Settings
          </Button> */}
        </Box>
      </Box>

      <CmtList
        data={data}
        renderRow={(item, index) => (
          <RenderRow
            notification={item}
            key={index}
            onReadUnread={handleReadUnread}
          />
        )}
        onEndReached={() => {}}
      />
    </CmtCard>
  );
};

export default Notification;
