import * as React from 'react';
import { Component } from 'react';
import './EmailForm.css';
import listPic from '../assets/list.png';

interface IEmaiForm {
  email: string;
  tel: string;
}

class EmailForm extends Component<any, IEmaiForm> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      tel: ''
    };
  }

  handleEmailChange = (e: any) => {
    const email = e.target.value;
    this.setState({
      email: email
    });
  };

  handleSubmit = (e: any) => {
    fetch('/api/people', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: this.state.email, tel: this.state.tel })
    });
    e.preventDefault();
  };

  render() {
    return (
      <div className="EmailForm">
        <img className="EmailForm--img" src={listPic} alt="list" />

        <p>
          Введите регистрационные данные
          <br />
        </p>

        <div className="EmailForm--container">
          <form
            action="/api/people"
            method="post"
            className="EmailForm--form"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="email">E-mail(*):</label>
            <input
              id="email"
              type="email"
              required={true}
              onChange={this.handleEmailChange}
            />
            <label htmlFor="tel">Телефон:</label>
            <input id="tel" type="tel" />
            <input type="submit" value="Submit" />
          </form>
          <img className="EmailForm--img__landscape" src={listPic} alt="list" />
        </div>
      </div>
    );
  }
}

export default EmailForm;
