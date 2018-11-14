import * as React from 'react';
import { Component } from 'react';
import chain from '../assets/chain.png';
import './Analitic.css';
import { object } from 'prop-types';

interface IAnaliticState {
  choosenName: string;
  choosenProf: string;
}

interface IAnaliticProps {
  onSubmitTask(result: boolean): void;
  answer: {
    name: string;
    prof: string;
  };
  onSaveAnswer(prof: string, name: string): void;
}

class Analitic extends Component<IAnaliticProps, IAnaliticState> {
  constructor(props: IAnaliticProps) {
    super(props);
    this.state = {
      choosenName: '',
      choosenProf: ''
    };
  }

  checkResult = (): boolean => {
    if (
      this.state.choosenName === 'Андрей' &&
      this.state.choosenProf === 'Продавец'
    ) {
      return true;
    } else return false;
  };

  chooseName = (value: string) => (e: any) => {
    this.setState({
      choosenName: value
    });

    const buttons = this.getAllButton();
    const nameButtons = buttons[1];
    for (let i = 0; i < nameButtons.length; i++) {
      if (nameButtons[i].classList.contains('button__selected')) {
        nameButtons[i].classList.remove('button__selected');
      }
    }
    e.target.className += ' button__selected';
  };

  chooseProf = (value: string) => (e: any) => {
    this.setState({
      choosenProf: value
    });

    const buttons = this.getAllButton();
    const profButtons = buttons[0];
    for (let i = 0; i < profButtons.length; i++) {
      if (profButtons[i].classList.contains('button__selected')) {
        profButtons[i].classList.remove('button__selected');
      }
    }
    e.target.className += ' button__selected';
  };

  getAllButton = () => {
    const profButtons: HTMLCollection = document.getElementsByClassName(
      'profButton'
    );
    const nameButtons: HTMLCollection = document.getElementsByClassName(
      'nameButton'
    );
    const buttons: [HTMLCollection, HTMLCollection] = [
      profButtons,
      nameButtons
    ];
    return buttons;
  };

  render() {
    return (
      <div className="Analitic">
        <div className="Analitic--task">
          <p className="task--title">Отгадай загадку</p>
          <img src={chain} alt="chain" className="task--pic" />
          <div className="task--text">
            По подозрению в убийстве Кости задержали Олега, Павла и Андрея.{' '}
            <br /> Из них один врач, другой продавец, третий бухгалтер. <br />В
            ходе следствия выяснили, что продавец всегда лжет, бухгалтер всегда
            говорит правду, а врач лжет через раз. Их утверждения: <br />
            Олег: "Я убил Костю, Павлик не виноват!" <br />
            Павел: "Олег никого не убивал. Убийца Андрей!" <br />
            Андрей "Я не виновен. Преступник - Олег!" <br />
            Кто убил Костю и какая у него профессия?
          </div>
        </div>

        <div className="Analitic--buttonContainer__landscape">
          <div className="buttonContainer--column__label">
            <div className="column--label">Имя:</div>
            <div className="column--label">Профессия:</div>
          </div>

          <div className="buttonContainer--column">
            <button
              className="button nameButton"
              onClick={this.chooseName('Андрей')}
            >
              Андрей
            </button>
            <button
              className="button profButton"
              onClick={this.chooseProf('Врач')}
            >
              Врач
            </button>
          </div>

          <div className="buttonContainer--column">
            <button
              className="button nameButton"
              onClick={this.chooseName('Павел')}
            >
              Павел
            </button>
            <button
              className="button profButton"
              onClick={this.chooseProf('Продавец')}
            >
              Продавец
            </button>
          </div>

          <div className="buttonContainer--column">
            <button
              className="button nameButton"
              onClick={this.chooseName('Олег')}
            >
              Олег
            </button>
            <button
              className="button profButton"
              onClick={this.chooseProf('Бухгалтер')}
            >
              Бухгалтер
            </button>
          </div>
        </div>

        <div className="Analitic--buttonContainer">
          <div className="column--label">Имя:</div>
          <div className="buttonContainer--row">
            <button
              className="button nameButton"
              onClick={this.chooseName('Андрей')}
            >
              Андрей
            </button>
            <button
              className="button nameButton"
              onClick={this.chooseName('Павел')}
            >
              Павел
            </button>
            <button
              className="button nameButton"
              onClick={this.chooseName('Олег')}
            >
              Олег
            </button>
          </div>

          <div className="column--label">Профессия:</div>
          <div className="buttonContainer--row">
            <button
              className="button profButton"
              onClick={this.chooseProf('Врач')}
            >
              Врач
            </button>

            <button
              className="button profButton"
              onClick={this.chooseProf('Продавец')}
            >
              Продавец
            </button>

            <button
              className="button profButton"
              onClick={this.chooseProf('Бухгалтер')}
            >
              Бухгалтер
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (Object.keys(this.props.answer).length > 0) {
      this.setState(state => ({
        ...state,
        choosenName: this.props.answer.name,
        choosenProf: this.props.answer.prof
      }));
    }

    const buttons = this.getAllButton();

    buttons.forEach(collection => {
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].classList.contains('button__selected')) {
          collection[i].classList.remove('button__selected');
        }

        if (
          collection[i].textContent === this.props.answer.name ||
          collection[i].textContent === this.props.answer.prof
        ) {
          collection[i].className += ' button__selected';
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.onSaveAnswer(this.state.choosenName, this.state.choosenProf);
    this.props.onSubmitTask(this.checkResult());
  }
}

export default Analitic;
