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
    if (result.programmer === true) {
      this.setState({
        position: 'Поздравляем, ты проявил себя как программист!'
      });
    }

    if (result.analitic === true) {
      this.setState({
        position: 'Поздравляем, ты проявил себя как аналитик!'
      });
    }

    if (result.testing === true) {
      this.setState({
        position: 'Поздравляем, ты проявил себя как тестировщик!'
      });
    }

    if (result.programmer === true && result.testing === true) {
      this.setState({
        position:
          'Поздравляем, ты проявил себя как эксперт в области ИТ-технологий!'
      });
    }

    if (result.programmer === true && result.analitic === true) {
      this.setState({
        position:
          'Поздравляем, ты проявил себя как эксперт в области ИТ-технологий!'
      });
    }

    if (result.testing === true && result.analitic === true) {
      this.setState({
        position:
          'Поздравляем, ты проявил себя как эксперт в области ИТ-технологий!'
      });
    }

    if (
      result.testing === true &&
      result.programmer === true &&
      result.analitic === true
    ) {
      this.setState({
        position: 'Поздравляем, ты проявил себя как настоящий Архитектор!'
      });
    }

    if (
      result.testing === false &&
      result.programmer === false &&
      result.analitic === false
    ) {
      this.setState({
        position: 'Благодарим за проявленный интерес!'
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
          {this.state.position} <br />
          Высылай нам свое резюме, мы рассмотрим тебя в качестве потенциального
          кандидата в нашу команду <br />
          e-mail:{' '}
          <a className="Leave--anchor" href="mailto:65rcr_resume@cbr.ru">
            65rcr_resume@cbr.ru
          </a>{' '}
          <br />
          тел.:{' '}
          <a className="Leave--anchor" href="tel:+73432696797">
            +7(343)269-69-97
          </a>
          ,{' '}
          <a className="Leave--anchor" href="tel:+73432696584">
            +7(343)269-65-87
          </a>
        </p>
        <img className="Leave--pic" src={crown} alt="crown" />
      </div>
    );
  }
}

export default Leave;
