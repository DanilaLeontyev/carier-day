import React, { Component } from 'react';
import './YouWant.css';
import lamp from '../assets/lamp.png';

class YouWant extends Component<any> {
  render() {
    return (
      <div className="YouWant">
        <p>Кем ты хочешь быть?</p>
        <div className="YouWant--choose">
          <div className="choose--column">
            <button className="button">Аналитик</button>
            <button className="button">Разработчик</button>
          </div>

          <img className="YouWant--pic" src={lamp} alt="lamp" />

          <div className="choose--column">
            <button className="button">Тестировщик</button>
            <button className="button">Архитектор</button>
          </div>
        </div>
      </div>
    );
  }
}

export default YouWant;
