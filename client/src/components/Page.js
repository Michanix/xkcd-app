import React from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

async function getData(url) {
  let data;

  try {
    const response = await instance.get(url);
    data = await response.data;
  } catch (err) {
    console.error(err);
  }

  return data;
}

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      lastNum: 0,
      currentNum: 0,
    };

    this.handleCurrentClick = this.handleCurrentClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackwardClick = this.handleBackwardClick.bind(this);
  }

  componentDidMount() {
    const response = getData('/comics');
    response.then((data) => {
      this.setState({
        data: data,
        lastNum: data.num,
        currentNum: data.num,
      });
    });
  }

  handleCurrentClick(event) {
    event.preventDefault();
    const response = getData('/comics');
    response.then((data) => {
      this.setState({
        data: data,
        currentNum: data.num,
      });
    });
  }

  handleRandomClick(event) {
    event.preventDefault();
    const getRndNum = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const rndNum = getRndNum(1, this.state.lastNum);
    const url = `/comics/${rndNum}`;
    const response = getData(url);
    response.then((data) => {
      this.setState({
        data: data,
        currentNum: data.num,
      });
    });
  }

  handleForwardClick(event) {
    event.preventDefault();
    const num = this.state.currentNum + 1;
    const url = `/comics/${num}`;
    const response = getData(url);
    response.then((data) => {
      this.setState({
        data: data,
        currentNum: data.num,
      });
    });
  }

  handleBackwardClick(event) {
    event.preventDefault();
    const num = this.state.currentNum - 1;
    const url = `/comics/${num}`;
    const response = getData(url);
    response.then((data) => {
      this.setState({
        data: data,
        currentNum: data.num,
      });
    });
  }

  render() {
    const {img, alt, title} = this.state.data;
    return (
      <div>
        <Grid container
          direction="column"
          justify="flex-end"
          alignItems="center">
          <Grid item>
            <Typography style={{title: {flexGrow: 1}}} variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            {
            img !== undefined ? <img src={img} alt={alt}/> :
            <Typography variant="h6">
              Oof, seems like your reached the end :s
            </Typography>
            }
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              aria-label="back"
              onClick={this.handleBackwardClick}>
              <ArrowBackIosIcon />
            </Button>
            &nbsp;
            &nbsp;
            <Button
              size="large"
              variant="contained"
              color="secondary"
              aria-label="current"
              onClick={this.handleCurrentClick}>
              Current
            </Button>
            &nbsp;
            &nbsp;
            <Button
              size="large"
              variant="contained"
              color="secondary"
              aria-label="random"
              onClick={this.handleRandomClick}>
              Random
            </Button>
            &nbsp;
            &nbsp;
            <Button
              size="large"
              variant="contained"
              color="primary"
              aria-label="forward"
              onClick={this.handleForwardClick}>
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
