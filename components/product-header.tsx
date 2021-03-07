import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    backgroundColor : "#eeeeee",
    height : "100px",
    justifyContent : "center",
    marginBottom : "inherit"
  },
});

export default function Header() {
  const classes = useStyles();
  return (
        <AppBar position="static" className={classes.root}>
          <Typography display="inline" align="center" color="textPrimary">
            <Typography variant="h5">
                My awesome shopping site
            </Typography>
            <Typography variant="subtitle2">
                Men`s t-shirt, Sweatshirt
            </Typography>
          </Typography>
        </AppBar>
  );
};
