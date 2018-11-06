import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import './component/Greetings';
import Greetings from './component/Greetings';
import Algorithm from './component/Algorithm';
import EmailForm from './component/EmailForm';
import Testing from './component/Testing';
import Analitic from './component/Analitic';
import YouWant from './component/YouWant';
import Leave from './component/Leave';

interface IAppState {
  questionNumber: number;
}

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 3
    };
  }

  public nextPage = (e: any): void => {
    if (this.state.questionNumber < 6) {
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

  public mainPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return <Greetings />;
      }

      case 1: {
        return <EmailForm />;
      }

      case 2: {
        return <Algorithm />;
      }

      case 3: {
        return <Testing />;
      }

      case 4: {
        return <Analitic />;
      }

      case 5: {
        return <YouWant />;
      }

      case 6: {
        return <Leave />;
      }

      default: {
        return <span>Error</span>;
      }
    }
  };

  public footerPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return (
          <button className="button" onClick={this.nextPage}>
            Начать тестирование
          </button>
        );
      }
      case 1: {
        return (
          <div>
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }
      case 2: {
        return (
          <div>
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }
      case 3: {
        return (
          <div>
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }

      case 4: {
        return (
          <div>
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }

      case 5: {
        return (
          <div>
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }

      case 6: {
        return (
          <button className="button" onClick={this.prevPage}>
            Назад
          </button>
        );
      }

      default: {
        return <span>Error</span>;
      }
    }
  };

  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <img className="appHeader--logo" src={logo} />
        </header>
        <main className="appMain">{this.mainPage()}</main>
        <footer className="appFooter">{this.footerPage()}</footer>
      </div>
    );
  }
}

export default App;
