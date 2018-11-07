import * as React from 'react';
import { Component } from 'react';
import './EmailForm.css';
import listPic from '../assets/list.png';

class EmailForm extends Component<any> {
  render() {
    return (
      <div className="EmailForm">
        <img className="EmailForm--img" src={listPic} alt="list" />

        <p>
          Введите регистрационные данные
          <br />
        </p>

        <div className="EmailForm--container">
          <form className="EmailForm--form">
            <label htmlFor="email">E-mail(*):</label>
            <input id="email" type="email" required={true} />
            <label htmlFor="tel">Телефон:</label>
            <input id="tel" type="tel" />
          </form>
          <img className="EmailForm--img__landscape" src={listPic} alt="list" />
        </div>
      </div>
    );
  }
}

export default EmailForm;
