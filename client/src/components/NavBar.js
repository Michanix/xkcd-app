/* eslint-disable react/prop-types */
import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
              xkcd
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
