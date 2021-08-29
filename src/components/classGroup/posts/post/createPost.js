import React, { useState } from "react";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import Box from "@material-ui/core/Box";
import CmtAvatar from "../../../../../@coremat/CmtAvatar";
import AppTextInput from "../../../../../@jumbo/components/Common/formElements/AppTextInput";
import Button from "@material-ui/core/Button";
import CmtImage from "../../../../../@coremat/CmtImage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CmtList from "../../../../../@coremat/CmtList";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import { httpClient } from "../../../../../authentication/auth-methods/jwt-auth/config";
import CancelIcon from "@material-ui/icons/Cancel";
const useStyles = makeStyles(() => ({
  textFieldRoot: {
    "& .MuiInput-underline": {
      "&:before, &:after": {
        display: "none",
      },
    },
  },
  iconSm: {
    fontSize: 16,
  },
  gridThumb: {
    width: 60,
    height: 60,
    objectFit: "cover",
    borderRadius: 4,
  },
}));

const CreatePost = ({
  submit,
  setText,
  post,
  attachments,
  getRootProps,
  getInputProps,
  setAttachments,
}) => {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" onSubmit={submit}>
      <CmtCard>
        <Box width={1}>
          <CmtCardContent>
            <Box display="flex">
              <CmtAvatar
                size={40}
                src={"userDetail.profile_pic"}
                alt={"userDetail.name"}
              />
              <Box ml={4} flex={1}>
                <AppTextInput
                  placeholder="What's in your mind?"
                  multiline
                  rows={2}
                  fullWidth
                  value={post}
                  className={classes.textFieldRoot}
                  onChange={(e) => setText(e.target.value)}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <CmtList
                data={attachments}
                style={{ display: "flex", flexWrap: "wrap" }}
                renderRow={(item, index) => (
                  <Box p={1} key={index} style={{ position: "relative" }}>
                    <CmtImage
                      className={classes.gridThumb}
                      src={item.preview}
                    />
                    <CancelIcon
                      onClick={() => setAttachments([])}
                      color="text.primary"
                      style={{
                        position: "absolute",
                        right: -8,
                        top: -8,
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                )}
              />
            </Box>
            <Box mt={2} display="flex">
              <Box
                {...getRootProps()}
                mr={{ xs: 0, md: 5 }}
                display="flex"
                alignItems="center"
                color="text.disabled"
                fontSize={12}
                className="pointer"
              >
                <input
                  {...getInputProps()}
                  disabled={attachments.length != 0}
                />
                <CameraEnhanceIcon className={classes.iconSm} />{" "}
                <Box ml={3}>Add photo video</Box>
              </Box>
              <Box ml="auto">
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  disabled={!post.trim()}
                  type="submit"
                >
                  Post
                </Button>
              </Box>
            </Box>
          </CmtCardContent>
        </Box>
      </CmtCard>
    </form>
  );
};

export default CreatePost;
