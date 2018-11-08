import * as React from 'react';
import { Component } from 'react';
import './Leave.css';
import crown from '../assets/crown.png';

interface ILeaveState {
  position: string;
}

interface ILeaveProps {
  result: ITask;
}

interface ITask {
  programmer: boolean;
  testing: boolean;
  analitic: boolean;
}

class Leave extends Component<ILeaveProps, ILeaveState> {
  constructor(props: ILeaveProps) {
    super(props);
    this.state = {
      position: ''
    };
  }

  generatePosition = (result: ITask): void => {
    console.log(result);
    if (result.programmer === true) {
      this.setState({
        position: 'как отличный Программист!'
      });
    }

    if (result.analitic === true) {
      this.setState({
        position: 'как смышленый Аналитик!'
      });
    }

    if (result.testing === true) {
      this.setState({
        position: 'как дотошный Тестер!'
      });
    }

    if (result.programmer === true && result.testing === true) {
      this.setState({
        position: 'Программист и тестер'
      });
    }

    if (result.programmer === true && result.analitic === true) {
      this.setState({
        position: 'Программист и аналитик'
      });
    }

    if (result.testing === true && result.analitic === true) {
      this.setState({
        position: 'ТЕстировщик и аналитик'
      });
    }

    if (
      result.testing === true &&
      result.programmer === true &&
      result.analitic === true
    ) {
      this.setState({
        position: 'как настоящий Архитектор!'
      });
    }
  };

  componentDidMount() {
    this.generatePosition(this.props.result);
  }

  render() {
    return (
      <div className="Leave">
        <p>
          Поздравляем! В результате тестирования ты проявил себя
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
