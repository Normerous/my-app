import React from 'react';
//import logo from './logo.svg';
//import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      number: 0
    }
  }
  generate = () => {
    const { number } = this.state;
    if (number !== '') {
      const typeA = this.generateTypeA(parseInt(number));
      const typeB = this.generateTypeB(parseInt(number));
      const typeC = this.generateTypeC(parseInt(number));
      const typeD = this.generateTypeD(parseInt(number));
      const typeE = this.generateTypeE(parseInt(number));

      this.setState({
        data: [typeB, typeC, typeD, typeE, typeA]
      })
    }

  }
  generateTypeA = (number) => {
    let num = number;
    let result = '';
    while (num > 0) {
      result = result.concat('()')
      --num;
    };
    return result;
  }
  generateTypeB = (number) => {
    let open = number;
    let close = number;
    let result = '';
    while (open > 0 || close > 0) {
      if (open !== 0) {
        result = result.concat('(')
        --open;
      } else {
        result = result.concat(')')
        --close;
      }
    }
    return result;
  }
  generateTypeC = (number) => {
    let open = number;
    let close = number;
    let result = '';
    let i = 2;
    if (number >= 2) {
      while (open > 0 || close > 0) {
        if (i > 0) {
          result = result.concat('(');
          --i;
          --open;
        } else if (i === 0) {
          result = result.concat(')')
          --close;
          --i
        } else {
          if (Math.abs(open - close) === 2 || open === 0) {
            result = result.concat(')')
            --close;

          } else {
            result = result.concat('(')
            --open;
          }
        }
      }
    } else if (number === 1) {
      result = '()';
    }
    return result;
  }
  generateTypeD = number => {
    let num = number;
    let open = 1;
    let close = 1;
    let result = '';

    if (num > 0) {
      --num;
      while (close > 0 || open > 0) {
        if (open >= close && open > 0) {
          result = result.concat('(');
          --open;
        } else {
          result = result.concat(')');
          --close;
        }
      }

      if (num > 0)
        result = result.concat(this.generateTypeB(parseInt(num)));

      return result;
    } else {
      return result;
    }
  }
  generateTypeE = number => {
    let num = number;
    let open = 1;
    let close = 1;
    let result = '';

    if (num > 0) {
      --num;
      while (close > 0 || open > 0) {
        if (open >= close && open > 0) {
          result = result.concat('(');
          --open;
        } else {
          result = result.concat(')');
          --close;
        }
      }

      if (num > 0)
        result = this.generateTypeB(parseInt(num)).concat(result);

      return result;
    } else {
      return result;
    }
  }
  changeState = (state, value) => {
    this.setState({
      [state]: value
    })
  }
  render() {
    const { number } = this.state;
    return (
      <div className="container bg-info p-3">

        <div className="card mt-3">
          <div className="card-body">
            <div className='row'>
              <div className="col-12">
                <h2>Given n pairs of parentheses</h2>
              </div>
              <div className="col-6">
                <input className="form-control" value={number} type='number' onChange={e => this.changeState('number', e.target.value)}></input>
              </div>
              <div className="col-6">
                <button onClick={this.generate} type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>

        </div>

        <div className="card mt-3 mb-3">
          <div className="card-body">
            <div className='row'>
              <div className="col-12">
                <h5>
                  Result :
                </h5>
              </div>
              {this.state.data && this.state.data.map((item, i) => (
                <div className="col-12" key={i}>
                  <p>{item === '' ? '-' : item}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
