import * as React from 'react';
import { Component } from 'react';
import './Leave.css';
import crown from '../assets/crown.png';

interface ILeaveState {
  position: string;
}

class Leave extends Component<any, ILeaveState> {
  constructor(props: any) {
    super(props);
    this.state = {
      position: 'Аналитик'
    };
  }

  render() {
    return (
      <div className="Leave">
        <p>
          Поздравляем! В результате тестирования ты проявил себя как{' '}
          {this.state.position} <br />
          Мы ждем твое резюме по адресу:{' '}
          <a href="mailto:65rcr_resume@cbr.ru">65rcr_resume@cbr.ru</a>
        </p>
        <img className="Leave--pic" src={crown} alt="crown" />
      </div>
    );
  }
}

export default Leave;
