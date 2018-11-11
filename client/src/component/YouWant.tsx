import React, { Component } from 'react';
import './YouWant.css';
import lamp from '../assets/lamp.png';

interface IYouWantState {
  choosenProf: string;
}

interface IYouWantPrps {
  onSubmitTask(result: string): void;
  answer: string;
}

class YouWant extends Component<IYouWantPrps, IYouWantState> {
  constructor(props: IYouWantPrps) {
    super(props);
    this.state = {
      choosenProf: ''
    };
  }

  chooseProf = (e: any) => {
    const choosenProf = e.target.textContent;
    const profButtons = this.getAllButton();
    for (let i = 0; i < profButtons.length; i++) {
      if (profButtons[i].classList.contains('button__selected')) {
        profButtons[i].classList.remove('button__selected');
      }
    }
    e.target.className += ' button__selected';
    this.setState({
      choosenProf: choosenProf
    });

    this.props.onSubmitTask(choosenProf);
  };

  getAllButton = () => {
    let buttons: HTMLCollection = document.getElementsByClassName('profbutton');
    return buttons;
  };

  render() {
    return (
      <div className="YouWant">
        <p>Кем ты хочешь быть?</p>
        <div className="YouWant--choose">
          <div className="choose--column">
            <button className="button profbutton" onClick={this.chooseProf}>
              Аналитик
            </button>
            <button className="button profbutton" onClick={this.chooseProf}>
              Разработчик
            </button>
          </div>

          <img className="YouWant--pic" src={lamp} alt="lamp" />

          <div className="choose--column">
            <button className="button profbutton" onClick={this.chooseProf}>
              Тестировщик
            </button>
            <button className="button profbutton" onClick={this.chooseProf}>
              Архитектор
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.answer) {
      const profButtons = this.getAllButton();
      for (let i = 0; i < profButtons.length; i++) {
        if (profButtons[i].classList.contains('button__selected')) {
          profButtons[i].classList.remove('button__selected');
        }

        if (profButtons[i].textContent === this.props.answer) {
          profButtons[i].className += ' button__selected';
        }
      }
    }
  }
}

export default YouWant;
