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
  algorithmAnswer: dragItem[];
  testingAnswer: string;
}

interface IPesonData {
  id: string;
  email: string;
  tel: string;
  tasks: ITask;
  choosenProf: string;
}

interface ITask {
  programmer: boolean;
  testing: boolean;
  analitic: boolean;
}

interface dragItem {
  id: string;
  content: string;
}

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      questionNumber: 3,
      algorithmAnswer: [],
      testingAnswer: '',
      data: {
        id: '',
        email: '',
        tel: '',
        tasks: {
          programmer: false,
          testing: false,
          analitic: false
        },
        choosenProf: ''
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

  SubmitEmailAndTel = () => {
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

  algorithmTaskSubmit = (result: boolean) => {
    // TODO: дописать отправку решения на сервер

    this.setState(state => ({
      data: {
        ...state.data,
        tasks: {
          ...state.data.tasks,
          programmer: result
        }
      }
    }));
  };

  testingTaskSubmit = (result: boolean) => {
    // TODO: дописать отправку решения на сервер

    this.setState(state => ({
      data: {
        ...state.data,
        tasks: {
          ...state.data.tasks,
          testing: result
        }
      }
    }));
  };

  analiticTaskSubmit = (result: boolean) => {
    // TODO: дописать отправку решения на сервер

    this.setState(state => ({
      data: {
        ...state.data,
        tasks: {
          ...state.data.tasks,
          analitic: result
        }
      }
    }));
  };

  chooseProf = (result: string) => {
    // TODO: дописать отправку решения на сервер

    this.setState(state => ({
      data: {
        ...state.data,
        choosenProf: result
      }
    }));
  };

  footerPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return (
          <div>
            <button className="button" onClick={this.nextPage}>
              Начать тестирование
            </button>
          </div>
        );
      }

      case 6:
      case 1:
      case 2:
      case 3:
      case 4:
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

      default: {
        return <></>;
      }
    }
  };

  saveDragItem = (items: dragItem[]) => {
    this.setState(state => ({
      ...state,
      algorithmAnswer: items
    }));
  };

  saveTestingAnswer = (value: string) => {
    this.setState(state => ({
      ...state,
      testingAnswer: value
    }));
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
            onFormSubmit={this.SubmitEmailAndTel}
            onEmailChange={this.emailChange}
            onTelChange={this.telChange}
          />
        );
      }

      case 2: {
        return (
          <Algorithm
            onSubmitTask={this.algorithmTaskSubmit}
            items={this.state.algorithmAnswer}
            onSaveItems={this.saveDragItem}
          />
        );
      }

      case 3: {
        return (
          <Testing
            onSubmitTask={this.testingTaskSubmit}
            answer={this.state.testingAnswer}
            onSaveAnswer={this.saveTestingAnswer}
          />
        );
      }

      case 4: {
        return <Analitic onSubmitTask={this.analiticTaskSubmit} />;
      }

      case 5: {
        return <YouWant onSubmitTask={this.chooseProf} />;
      }

      case 6: {
        return <Leave result={this.state.data.tasks} />;
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
