import React, { Component } from 'react';
import './Greetings.css';
import boyPic from '../assets/boy.png';

class Greetings extends Component<any> {
  render() {
    return (
      <main className="Greetings">
        <p className="Greetings--text">
          Добро пожаловать! <br />
          Предлагаем тебе пройти тест, который поможет определить твою
          характерную предрасположенность к одной из профессиональных ролей в
          ИТ-ХАБе Банка России.
        </p>
        <img src={boyPic} alt="boy" width="150" />
      </main>
    );
  }
}

export default Greetings;
