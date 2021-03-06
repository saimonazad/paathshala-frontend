import React from "react";

import clsx from "clsx";

import { Box, Button, CircularProgress, fade } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  emptyListContainer: {
    flexDirection: "column",
    minHeight: 10,
    height: "100%",
    display: "flex",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${fade(theme.palette.common.black, 0.12)}`,
    borderRadius: 4,
    textAlign: "center",
    "& h1": {
      margin: 0,
      padding: 0,
    },
  },
  flexRow: {
    flexDirection: "row",
  },
}));

const ListEmptyResult = ({
  loader,
  placeholder,
  loading,
  title,
  actionTitle,
  content,
  onClick,
  children,
}) => {
  const classes = useStyles();
  if (loading || loader) {
    return (
      <React.Fragment>
        {placeholder ? (
          placeholder
        ) : (
          <div
            className={clsx(
              classes.emptyListContainer,
              classes.flexRow,
              "CmtList-EmptyResult"
            )}
          >
            <CircularProgress size={16} />
            <span className="ml-2">Loading...</span>
          </div>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <div className={clsx(classes.emptyListContainer, "CmtList-EmptyResult")}>
        {children ? (
          children
        ) : (
          <React.Fragment>
            {title && (
              <Box component="h1" fontSize={20} color="text.primary" p={0}>
                {title}
              </Box>
            )}
            <Box fontSize={18} component="p" color="text.secondary">
              {content}
            </Box>

            {actionTitle && (
              <Button
                color="primary"
                variant="contained"
                style={{
                  marginTop: 0,
                  height: 35,
                  minWidth: 120,
                  textTransform: "none",
                }}
                onClick={onClick}
              >
                {actionTitle}
              </Button>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
};

export default ListEmptyResult;
