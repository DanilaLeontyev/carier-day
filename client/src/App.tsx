import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import './component/Greetings';
import axios from 'axios';
import download from 'downloadjs';
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
  analiticAnswer: {
    prof: string;
    name: string;
  };
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
      questionNumber: 0,
      algorithmAnswer: [],
      testingAnswer: '',
      analiticAnswer: {
        prof: '',
        name: ''
      },
      data: {
        id: '',
        email: '',
        tel: '',
        choosenProf: '',
        tasks: {
          programmer: false,
          testing: false,
          analitic: false
        }
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.data.email,
        tel: this.state.data.tel,
        result: this.state.data.tasks,
        choosenProf: this.state.data.choosenProf,
        answers: {
          algorithm: this.state.algorithmAnswer,
          tester: this.state.testingAnswer,
          analitic: this.state.analiticAnswer
        }
      })
    });

    axios(`/api/people`, {
      method: 'GET',
      responseType: 'blob' //Force to receive data in a Blob Format
    })
      .then(response => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })

      .catch(error => {
        console.log(error);
      });

    this.nextPage();
  };

  downloadPDF = () => {
    fetch('/file', {
      method: 'get',
      headers: {
        'Content-Type': 'application/pdf'
      }
    })
      .then(res => res.blob())
      .then(blob => download(blob));
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

  saveAnaliticAnswer = (name: string, prof: string) => {
    this.setState(state => ({
      ...state,
      analiticAnswer: {
        name: name,
        prof: prof
      }
    }));
  };

  footerPage = (): JSX.Element => {
    switch (this.state.questionNumber) {
      case 0: {
        return (
          <div className="Footer--buttonContainer">
            <button className="button  button__last" onClick={this.nextPage}>
              Начать тестирование
            </button>
          </div>
        );
      }

      case 1:
      case 2:
      case 3:
      case 4: {
        return (
          <div className="Footer--buttonContainer">
            <button className="button" onClick={this.prevPage}>
              Назад
            </button>
            <button className="button button__last" onClick={this.nextPage}>
              Далее
            </button>
          </div>
        );
      }

      case 5: {
        return (
          <div className="Footer--buttonContainer">
            <button className="button  button__last" onClick={this.prevPage}>
              Назад
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
          <Algorithm
            onSubmitTask={this.algorithmTaskSubmit}
            items={this.state.algorithmAnswer}
            onSaveItems={this.saveDragItem}
          />
        );
      }

      case 2: {
        return (
          <Testing
            onSubmitTask={this.testingTaskSubmit}
            answer={this.state.testingAnswer}
            onSaveAnswer={this.saveTestingAnswer}
          />
        );
      }

      case 3: {
        return (
          <Analitic
            onSubmitTask={this.analiticTaskSubmit}
            answer={this.state.analiticAnswer}
            onSaveAnswer={this.saveAnaliticAnswer}
          />
        );
      }

      case 4: {
        return (
          <YouWant
            answer={this.state.data.choosenProf}
            onSubmitTask={this.chooseProf}
          />
        );
      }

      case 5: {
        return (
          <div>
            <Leave result={this.state.data.tasks} />
            <EmailForm
              email={this.state.data.email}
              tel={this.state.data.tel}
              onFormSubmit={this.SubmitEmailAndTel}
              onEmailChange={this.emailChange}
              onTelChange={this.telChange}
            />
          </div>
        );
      }

      case 6: {
        return (
          <div>
            Мы получили твои данные! Жди звонка) Ты решил {this.countTask()} из
            3 задач
            <button onClick={this.downloadPDF}>Скачать</button>
          </div>
        );
      }

      default: {
        return <span>Error</span>;
      }
    }
  };

  countTask = (): number => {
    let count = 0;
    if (this.state.data.tasks.analitic) count++;
    if (this.state.data.tasks.programmer) count++;
    if (this.state.data.tasks.testing) count++;

    return count;
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
