import React, { Component } from 'react';
import './Greetings.css';
import boyPic from '../assets/boy.png';

class Greetings extends Component<any> {
  render() {
    return (
      <main className="Greetings">
        <img src={boyPic} alt="boy" width="150" />
        <p className="Greetings--text">
          Добро пожаловать! <br />
          Предлагаем тебе пройти тест "Твоя роль в РЦР". Этот тест поможет
          определить твою характерную предрасположенность к одной из
          профессиональных ролей в РЦР "Екатеринбург" Внимательно прочитай
          задания и впиши свой вариант ответа в графу "Ответ" и нажми "Далее"
        </p>
      </main>
    );
  }
}

export default Greetings;
