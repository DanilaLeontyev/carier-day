import React, { Component } from 'react';
import './YouWant.css';
import lamp from '../assets/lamp.png';

class YouWant extends Component<any> {
  chooseProf = (e: any) => {
    e.target.className += ' button__selected';

    console.log(e.target.className);
  };

  render() {
    return (
      <div className="YouWant">
        <p>Кем ты хочешь быть?</p>
        <div className="YouWant--choose">
          <div className="choose--column">
            <button className="button" onClick={this.chooseProf}>
              Аналитик
            </button>
            <button className="button" onClick={this.chooseProf}>
              Разработчик
            </button>
          </div>

          <img className="YouWant--pic" src={lamp} alt="lamp" />

          <div className="choose--column">
            <button className="button" onClick={this.chooseProf}>
              Тестировщик
            </button>
            <button className="button" onClick={this.chooseProf}>
              Архитектор
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default YouWant;
