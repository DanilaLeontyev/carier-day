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
  data: IPesonData;
}

interface IPesonData {
  id: string;
  email: string;
  tel: string;
  tasks: ITask;
  choosen: string;
}

interface ITask {
  programmer: boolean;
  testing: boolean;
  analitic: boolean;
}

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 0,
      data: {
        id: '',
        email: '',
        tel: '',
        tasks: {
          programmer: false,
          testing: false,
          analitic: false
        },
        choosen: ''
      }
    };
  }

  nextPage = (): void => {
    if (this.state.questionNumber < 6) {
      this.setState(state => {
        return {
          questionNumber: state.questionNumber + 1
        };
      });
    }
  };

  prevPage = (): void => {
    if (this.state.questionNumber > 0) {
      this.setState(state => {
        return {
          questionNumber: state.questionNumber - 1
        };
      });
    }
  };

  handleSubmitEmailAndTel = () => {
    fetch('/api/people', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.data.email,
        tel: this.state.data.tel
      })
    })
      .then(res => res.json())
      .then(id => {
        this.setState(state => ({
          data: {
            ...state.data,
            id: id
          }
        }));
      })
      .then(() => this.nextPage());
  };

  emailChange = (email: string) => {
    this.setState(state => ({
      data: {
        ...state.data,
        email: email
      }
    }));
  };

  telChange = (tel: string) => {
    this.setState(state => ({
      data: {
        ...state.data,
        tel: tel
      }
    }));
  };

  footerPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return (
          <div>
            <button className="button" onClick={this.nextPage}>
              {' '}
              Начать тестирование
            </button>
          </div>
        );
      }

      default: {
        return <></>;
      }
    }
  };

  mainPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return <Greetings />;
      }

      case 1: {
        return (
          <EmailForm
            email={this.state.data.email}
            tel={this.state.data.tel}
            onFormSubmit={this.handleSubmitEmailAndTel}
            onEmailChange={this.emailChange}
            onTelChange={this.telChange}
          />
        );
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

  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <img className="appHeader--logo" src={logo} />
        </header>
        <main className="appMain">{this.mainPage()}</main>
        <footer>{this.footerPage()}</footer>
      </div>
    );
  }
}

export default App;
