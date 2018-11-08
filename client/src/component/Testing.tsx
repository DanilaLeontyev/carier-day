import * as React from 'react';
import { Component } from 'react';
import './Testing.css';

interface ITestingState {
  expression: string;
  result: number | string;
}

interface ITestingProps {
  onSubmitTask(result: boolean): void;
}

class Testing extends Component<ITestingProps, ITestingState> {
  constructor(props: ITestingProps) {
    super(props);
    this.state = {
      expression: '',
      result: 0
    };
  }

  handleSubmitTask = (e: any) => {
    const result = this.checkResult(this.state.expression);
    this.props.onSubmitTask(result);
  };

  checkResult = (value: string) => {
    let wrongAnswer = value
      .replace(/[^-()\d/*+.]/g, '')
      .replace(/-{2,}/g, '+')
      .replace(/\+{2,}/g, '+')
      .replace(/\+-/g, '+') // тут ошибка, должен быть -
      .replace(/-\+/g, '-');
    wrongAnswer = this.checkEnd(wrongAnswer);

    let rightAnswer = value
      .replace(/[^-()\d/*+.]/g, '')
      .replace(/-{2,}/g, '+')
      .replace(/\+{2,}/g, '+')
      .replace(/\+-/g, '-') // тут ошибка, должен быть -
      .replace(/-\+/g, '-');
    rightAnswer = this.checkEnd(rightAnswer);

    if (rightAnswer === wrongAnswer) {
      return false;
    } else return true;
  };

  checkEnd = (values: string) => {
    while (
      values[values.length - 1] === '+' ||
      values[values.length - 1] === '-'
    ) {
      values = values.slice(0, -1);
    }
    return values;
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
    let exp = this.state.expression;

    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    if (
      (exp[0] === '+' || exp[0] === '-') &&
      (value !== '2' && value !== '3') &&
      exp.length < 2
    ) {
      this.setState(state => {
        return {
          expression: value
        };
      });
    } else {
      if (
        (exp[exp.length - 1] === '+' || exp[exp.length - 1] === '-') &&
        (exp[exp.length - 2] === '+' || exp[exp.length - 2] === '-') &&
        (value !== '2' && value !== '3')
      ) {
        this.setState(state => {
          return;
        });
      } else {
        if (exp.length <= 15) {
          this.setState(state => {
            return {
              expression: state.expression.concat(value)
            };
          });
        }
      }
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
          Напишите выражение, которое приводит к ошибке
        </label>
        <button className="button" onClick={this.handleSubmitTask}>
          Принять ответ
        </button>
      </div>
    );
  }
}

export default Testing;
