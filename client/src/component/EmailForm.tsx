import * as React from 'react';
import { Component } from 'react';
import './EmailForm.css';

interface IEmailFormProps {
  email: string;
  tel: string;
  emailIsValid: boolean;
  telIsValid: boolean;
  onFormSubmit(): void;
  onEmailChange(email: string): void;
  onTelChange(tel: string): void;
}

class EmailForm extends Component<IEmailFormProps> {
  constructor(props: IEmailFormProps) {
    super(props);
  }

  handleEmailChange = (e: any) => {
    const reg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    if (!reg.test(e.target.value)) {
      e.target.style.backgroundColor = '#FFC6CE';
    } else e.target.style.backgroundColor = '#C8E6C9';

    if (e.target.value === '') {
      e.target.style.backgroundColor = 'none';
    }

    this.props.onEmailChange(e.target.value);
  };

  handleTelChange = (e: any) => {
    const reg = /^((\+7|7|8)+([0-9]){10})$/gm;
    if (!reg.test(e.target.value)) {
      e.target.style.backgroundColor = '#FFC6CE';
    } else e.target.style.backgroundColor = '#C8E6C9';
    this.props.onTelChange(e.target.value);
  };

  handleSumbit = (e: any) => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  render() {
    return (
      <div className="EmailForm">
        <p>
          Или отправь нам свой e-mail и мы свяжемся с тобой
          <br />
        </p>

        <div className="EmailForm--container">
          <form
            action="/api/people"
            method="post"
            className="EmailForm--form"
            onSubmit={this.handleSumbit}
          >
            <label htmlFor="email">
              E-mail(*):{' '}
              <span className="formLabel__invalid">
                {this.props.emailIsValid ? '' : 'Неверно введен e-mail'}
              </span>
            </label>
            <input
              className="form--input"
              id="email"
              type="email"
              required={true}
              value={this.props.email}
              onChange={this.handleEmailChange}
            />
            <label htmlFor="tel">Телефон:<span className="formLabel__invalid">
                {this.props.telIsValid ? '' : 'Неверно введен телефон'}
              </span></label>
            <input
              className="form--input"
              id="tel"
              type="tel"
              value={this.props.tel}
              onChange={this.handleTelChange}
            />
            <input
              className="button form--submit"
              type="submit"
              value="Отправить"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default EmailForm;
