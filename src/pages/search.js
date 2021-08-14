import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../services/fetcher";
import DefaultErrorPage from "next/error";
import CmtGridView from "../../@coremat/CmtGridView";
import GridEmptyResult from "../../@coremat/CmtGridView/GridEmptyResult";
import CmtCard from "../../@coremat/CmtCard";
import CmtCardContent from "../../@coremat/CmtCard/CmtCardContent";
import CmtMediaObject from "../../@coremat/CmtMediaObject";
import { Box, Typography } from "@material-ui/core";
import { ThemeProvider, useTheme, makeStyles } from "@material-ui/styles";
import theme from "../utils/theme";
import Link from "next/Link";
const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
    "& .Cmt-media-header .MuiTypography-h2": {
      fontSize: 20,
      fontWeight: 500,
    },
    "& .Cmt-media-image": {
      marginTop: 0,
    },
  },
}));
const Search = () => {
  const classes = useStyles();

  const router = useRouter();
  const { q } = router.query;
  const { data: results, error } = useSWR(
    q
      ? `http://paathshala.staging.baeinnovations.com/users/userinfo?first_name=${q}`
      : ``,
    fetcher
  );

  if (error) {
    return <DefaultErrorPage statusCode={500} />;
  }

  const renderRow = (item, index) => {
    return (
      <Box key={index} className={classes.itemRoot}>
        <Link href={`/u/${item.username}`}>
          <CmtCard className={classes.card}>
            <CmtCardContent>
              <CmtMediaObject
                avatar={item.picture}
                title={item.first_name + " " + item.last_name}
                titleProps={{ className: "pointer titleRoot" }}
                actionsComponent={
                  <Box className={classes.badgePrice} component="span">
                    {item.price}
                  </Box>
                }
              >
                <Box display="flex" alignItems="center">
                  <Typography className={classes.typoList} variant="body2">
                    {item.sold}
                    <Box ml={1} component="span" color="text.secondary">
                      {"Rating : " + item.rating}
                    </Box>
                  </Typography>
                </Box>
              </CmtMediaObject>
            </CmtCardContent>
          </CmtCard>
        </Link>
      </Box>
    );
  };
  return (
    <Box mt={2}>
      <CmtGridView
        data={results}
        renderRow={renderRow}
        itemPadding={10}
        responsive={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
        }}
        onEndReached={() => console.log("You have reached end of list")}
        ListEmptyComponent={
          <GridEmptyResult
            loader={results ? false : true}
            title="No Result Found"
            content="Please type in search field and try!"
          />
        }
      />
    </Box>
  );
};

export default Search;
