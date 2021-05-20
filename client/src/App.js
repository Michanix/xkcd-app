import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Page from './components/Page';
import {
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  Switch,
} from '@material-ui/core';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };

    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  handleDarkMode() {
    const mode = !this.state.darkMode;
    this.setState({darkMode: mode});
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#0288d1',
        },
        secondary: {
          main: '#ffc400',
        },
        type: this.state.darkMode ? 'dark' : 'light',
      },
    });

    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar>
            <Switch
              checked={this.state.darkMode}
              onChange={this.handleDarkMode}/>
          </NavBar>
          <Page />
        </ThemeProvider>
      </div>
    );
  }
}
