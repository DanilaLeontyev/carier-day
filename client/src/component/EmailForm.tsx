import * as React from 'react';
import { Component } from 'react';
import './EmailForm.css';
import listPic from '../assets/list.png';

interface IEmailFormProps {
  email: string;
  tel: string;
  onFormSubmit(): void;
  onEmailChange(email: string): void;
  onTelChange(tel: string): void;
}

class EmailForm extends Component<IEmailFormProps> {
  constructor(props: IEmailFormProps) {
    super(props);
  }

  handleEmailChange = (e: any) => {
    this.props.onEmailChange(e.target.value);
  };

  handleTelChange = (e: any) => {
    this.props.onTelChange(e.target.value);
  };

  handleSumbit = (e: any) => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  render() {
    return (
      <div className="EmailForm">
        {/* <img className="EmailForm--img" src={listPic} alt="list" /> */}

        <p>
          Введите регистрационные данные
          <br />
        </p>

        <div className="EmailForm--container">
          <form
            action="/api/people"
            method="post"
            className="EmailForm--form"
            onSubmit={this.handleSumbit}
          >
            <label htmlFor="email">E-mail(*):</label>
            <input
              className="form--input"
              id="email"
              type="email"
              required={true}
              onChange={this.handleEmailChange}
            />
            <label htmlFor="tel">Телефон:</label>
            <input
              className="form--input"
              id="tel"
              type="tel"
              onChange={this.handleTelChange}
            />
            {/* <input
              className="button form--submit"
              type="submit"
              value="Продолжить"
            /> */}
          </form>
        </div>
      </div>
    );
  }
}

export default EmailForm;
