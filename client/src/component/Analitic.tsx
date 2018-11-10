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

  handleSubmitTask = (e: any) => {
    const result = this.checkResult();
    this.props.onSubmitTask(result);
  };

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
  };

  chooseProf = (value: string) => (e: any) => {
    this.setState({
      choosenProf: value
    });
  };

  render() {
    return (
      <div className="Analitic">
        <div className="Analitic--task">
          <img src={chain} alt="chain" className="Analitic--pic" />
          <p className="Analitic--text">
            По подозрению в убийстве Жоржа задержали Олега, Павла и Андрея. Из
            них один врач, другой продавец, третий бухгалтер. <br />В ходе
            следствия выяснили, что продавец всегда лжет, бухгалтер всегда
            говорит правду, а врач лжет через раз. Их утверждения: <br />
            Олег: "Я убил Жоржа, Павлик не виноват!" <br />
            Павел: "Олег никого не убивал. Убийца Андрей!" <br />
            Андрей "Я не виновен. Преступник - Олег!" <br />
            Кто убил Жоржа и какая у него профессия?
          </p>
        </div>

        <div className="Analitic--buttonContainer__landscape">
          <div className="buttonContainer--column__label">
            <div className="column--label">Имя:</div>
            <div className="column--label">Профессия:</div>
          </div>

          <div className="buttonContainer--column">
            <button className="button" onClick={this.chooseName('Андрей')}>
              Андрей
            </button>
            <button className="button" onClick={this.chooseProf('Врач')}>
              Врач
            </button>
          </div>

          <div className="buttonContainer--column">
            <button className="button" onClick={this.chooseName('Павел')}>
              Павел
            </button>
            <button className="button" onClick={this.chooseProf('Продавец')}>
              Продавец
            </button>
          </div>

          <div className="buttonContainer--column">
            <button className="button" onClick={this.chooseName('Олег')}>
              Олег
            </button>
            <button className="button" onClick={this.chooseProf('Бухгалтер')}>
              Бухгалтер
            </button>
          </div>
        </div>

        <div className="Analitic--buttonContainer">
          <div className="column--label">Имя:</div>

          <div className="buttonContainer--row">
            <button className="button" onClick={this.chooseName('Андрей')}>
              Андрей
            </button>
            <button className="button" onClick={this.chooseName('Павел')}>
              Павел
            </button>
            <button className="button" onClick={this.chooseName('Олег')}>
              Олег
            </button>
          </div>

          <div className="column--label">Профессия:</div>
          <div className="buttonContainer--row">
            <button className="button" onClick={this.chooseProf('Врач')}>
              Врач
            </button>

            <button className="button" onClick={this.chooseProf('Продавец')}>
              Продавец
            </button>

            <button className="button" onClick={this.chooseProf('Бухгалтер')}>
              Бухгалтер
            </button>
          </div>
        </div>

        <div className="Analitic--answer">
          Ваш выбор: {this.state.choosenName} {this.state.choosenProf}
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
  }

  componentWillUnmount() {
    this.props.onSaveAnswer(this.state.choosenName, this.state.choosenProf);
  }
}

export default Analitic;
