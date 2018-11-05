import * as React from 'react';
import { Component } from 'react';
import './Testing.css';
import { number } from 'prop-types';

interface ITestingState {
  expression: string;
  result: number | string;
}

class Testing extends Component<any, ITestingState> {
  constructor(props: any) {
    super(props);
    this.state = {
      expression: '',
      result: 0
    };
  }

  checkEnd = (values: string) => {
    if (
      values[values.length - 1] === '+' ||
      values[values.length - 1] === '-'
    ) {
      values = values.slice(0, -1);
      this.checkEnd(values);
    }
    return values;
  };

  calculateResult = () => {
    let result: number = 0;
    let values = this.state.expression
      .replace(/[^-()\d/*+.]/g, '')
      .replace(/-{2,}/g, '-')
      .replace(/\+{2,}/g, '+')
      .replace(/\+-/g, '+') // тут ошибка, должены быть -
      .replace(/-\+/g, '-');

    values = this.checkEnd(values);
    try {
      result = eval(values);
    } catch {
      this.setState({
        result: 'NaN'
      });
      return;
    }
    this.setState({
      result: result
    });
  };

  addToExpression = (value: string) => (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    this.setState(state => {
      return {
        expression: state.expression.concat(value)
      };
    });
  };

  clearExpression = () => {
    this.setState({
      expression: '',
      result: 0
    });
  };

  render() {
    return (
      <div className="Testing">
        <p>Найдите баг в программе</p>
        <div className="Testing--calculator">
          <button onClick={this.addToExpression('3')}>3</button>
          <button onClick={this.addToExpression('2')}>2</button>
          <button onClick={this.addToExpression('+')}>+</button>
          <button onClick={this.addToExpression('-')}>-</button>

          <button onClick={this.calculateResult}>Посчитать</button>
          <button onClick={this.clearExpression}>Очистить</button>

          <div className="calculator--result">{this.state.expression}</div>
          <div>{this.state.result}</div>
        </div>
        <input type="" placeholder="Ваш ответ" />
      </div>
    );
  }
}

export default Testing;
