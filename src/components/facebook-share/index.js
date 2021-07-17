import React from "react";
import { Button } from "@material-ui/core";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FacebookShareButton } from "react-share";

const SocialMediaButtons = (props) => (
  <FacebookShareButton url={props.url} quote={props.text}>
    <Button
      variant="contained"
      color="primary"
      style={{ padding: "6px 18px" }}
      startIcon={
        <FontAwesomeIcon icon={faShare} style={{ fontSize: "18px" }} />
      }
    >
      Share Profile
    </Button>
  </FacebookShareButton>
);

export default SocialMediaButtons;
