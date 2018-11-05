import * as React from 'react';
import { Component } from 'react';
import chain from '../assets/chain.png';
import './Analitic.css';

interface IAnaliticState {
  choosenName: string;
}

class Analitic extends Component<any, IAnaliticState> {
  constructor(props: any) {
    super(props);
    this.state = {
      choosenName: ''
    };
  }

  chooseName = (value: string) => (e: any) => {
    this.setState({
      choosenName: value
    });
  };

  render() {
    return (
      <div className="Analitic">
        <img src={chain} alt="chain" className="Analitic--pic" />
        <p className="Analitic--text">
          По подозрению в убийстве Жоржа задержали Олега, Павла и Андрея. Из них
          один врач, другой продавец, третий бухгалтер. В ходе следствия
          выяснили, что продавец всегда лжет, бухгалтер всегда говорит правду, а
          врач лжет через раз. Их утверждения: <br />
          Олег: "Я убил Жоржа, Павлик не виноват!" <br />
          Павел: "Олег никого не убивал. Убийца Андрей!" <br />
          Андрей "Я не виновен. Преступник - Олег!" <br />
          Кто убил Жоржа?
        </p>
        <div className="Analitic--buttonContainer">
          <button onClick={this.chooseName('Андрей')}>Андрей</button>
          <button onClick={this.chooseName('Павел')}>Павел</button>
          <button onClick={this.chooseName('Олег')}>Олег</button>
        </div>

        <div className="Analitic--answer">
          Ваш выбор: {this.state.choosenName}
        </div>
      </div>
    );
  }
}

export default Analitic;
