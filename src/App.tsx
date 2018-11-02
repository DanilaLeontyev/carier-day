import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';

interface IAppState {
  questionNumber: number;
}

const appHeader = (
  <header className="appHeader">
    <img className="appHeader--logo" src={logo} width="50%" />
    <button className="appHeader--button">Далее</button>
  </header>
);

class App extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 0
    };
  }

  render() {
    return (
      <div className="App">
        {appHeader}
        <button>Далее</button>
      </div>
    );
  }
}

export default App;
