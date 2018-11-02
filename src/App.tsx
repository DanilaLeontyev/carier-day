import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';

interface IAppState {
  questionNumber: number;
}

const appHeader = (
  <header className="appHeader">
    <img className="appHeader--logo" src={logo} />
    <button className="button">Далее</button>
  </header>
);

const appFooter = (
  <footer className="appFooter">
    <button className="appFooter button">Предыдущее</button>
    <button className="appFooter button">Далее</button>
  </footer>
);
class App extends Component<any, IAppState> {
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
        {appFooter}
      </div>
    );
  }
}

export default App;
