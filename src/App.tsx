import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import './component/Greetings';
import Greetings from './component/Greetings';
import BinarySearchQuestion from './component/BinarySearchQuestion';

interface IAppState {
  questionNumber: number;
}

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 0
    };
  }

  public nextPage = (e: any): void => {
    if (this.state.questionNumber < 5) {
      this.setState(state => {
        return {
          questionNumber: state.questionNumber + 1
        };
      });
    }
  };

  public prevPage = (e: any): void => {
    if (this.state.questionNumber > 0) {
      this.setState(state => {
        return {
          questionNumber: state.questionNumber - 1
        };
      });
    }
  };

  public choosePage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return <Greetings />;
      }

      case 1: {
        return <BinarySearchQuestion />;
      }

      case 2: {
        return <span>page2</span>;
      }

      case 3: {
        return <span>page3</span>;
      }

      case 4: {
        return <span>page4</span>;
      }

      case 5: {
        return <span>page5</span>;
      }

      default: {
        return <span>error</span>;
      }
    }
  };

  render() {
    const { questionNumber } = this.state;
    return (
      <div className="App">
        <header className="appHeader">
          <img className="appHeader--logo" src={logo} />
          <div className="appHeader--buttonContainer">
            <button
              className={`button ${questionNumber ? '' : 'hidden'}`}
              onClick={this.prevPage}
            >
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        </header>
        {this.choosePage()}
      </div>
    );
  }
}

export default App;
