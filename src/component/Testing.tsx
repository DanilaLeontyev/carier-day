import * as React from 'react';
import { Component } from 'react';
import './Testing.css';

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
    let newValues;
    if (
      values[values.length - 1] === '+' ||
      values[values.length - 1] === '-'
    ) {
      values = values.slice(0, -1);
      this.checkEnd(values);
    } else {
      newValues = values;
    }
    return newValues ? newValues : '0';
  };

  calculateResult = () => {
    let result: number = 0;
    let values = this.state.expression
      .replace(/[^-()\d/*+.]/g, '')
      .replace(/-{2,}/g, '+')
      .replace(/\+{2,}/g, '+')
      .replace(/\+-/g, '+') // тут ошибка, должен быть -
      .replace(/-\+/g, '-');

    values = this.checkEnd(values);
    console.log(values);
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

    if (this.state.expression.length <= 15) {
      this.setState(state => {
        return {
          expression: state.expression.concat(value)
        };
      });
    }
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
          <div className="calculator--result">
            <div className="result--expression">{this.state.expression}</div>
            <div className="result--answer">= {this.state.result}</div>
          </div>

          <div className="calculator--buttonContainer">
            <div className="buttonContainer--column">
              <button className="button" onClick={this.addToExpression('3')}>
                3
              </button>
              <button className="button" onClick={this.addToExpression('2')}>
                2
              </button>
            </div>

            <div className="buttonContainer--column">
              <button className="button" onClick={this.addToExpression('+')}>
                +
              </button>
              <button className="button" onClick={this.addToExpression('-')}>
                -
              </button>
            </div>

            <div className="buttonContainer--column">
              <button className="button" onClick={this.calculateResult}>
                Посчитать
              </button>
              <button className="button" onClick={this.clearExpression}>
                Очистить
              </button>
            </div>
          </div>
        </div>

        <label htmlFor="answer">
          {' '}
          Напишите выражение, которое приводит к ошибке{' '}
        </label>
        <input
          id="answer"
          className="Testing--answer"
          type="tel"
          placeholder="Выражение"
        />
      </div>
    );
  }
}

export default Testing;
