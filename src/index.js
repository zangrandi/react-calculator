import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var safeEval = require('safe-eval')

class Button extends React.Component {
  render() {
    return (
      <button className="btn btn-outline-primary btn-calculator" onClick={() => this.props.onClick()}>
        {this.props.number}
      </button>
    );
  }
}

class Screen extends React.Component {
  render() {
    return (
      <div className="card" id="screen">
        {this.props.value}
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      result: false
    };
  }

  renderButton(digit) {
    return (
      <Button 
        number={digit} 
        onClick={() => this.handleClick(digit)}
      />
    )
  }

  handleClick(digit) {
    const OPERATORS = [".", "√", "%", "±", "/", "*", "-", "+"];

    if((this.state.value && OPERATORS.includes(this.state.value.slice(-1)) && OPERATORS.includes(digit)) || 
      ((!this.state.value || this.state.result) && OPERATORS.includes(digit))) {
      return;
    }

    if(digit === "=") {
      const VALUE = safeEval(this.state.value);
      this.setState({value: VALUE.toString(), result: true});
    } else if(digit === "C") {
      this.setState({value: null, result: false});
    } else if(digit === "√") {
      const VALUE = Math.sqrt(parseFloat(this.state.value));
      this.setState({value: VALUE.toString(), result: true});
    } else if(digit === "x²") {
      const VALUE = this.state.value**2
      this.setState({value: VALUE.toString(), result: true});
    } else if(digit === "x!") {
      const VALUE = factorial(parseFloat(this.state.value));
      this.setState({value: VALUE.toString(), result: true});
    } else if(!this.state.value || this.state.result) {
      this.setState({value: digit, result: false});
    } else {
      this.setState({value: this.state.value + digit, result: false});
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12">
            <Screen value={this.state.value} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xs-12">
            {this.renderButton("√")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("x²")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("x!")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("C")}
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xs-3">
            {this.renderButton("7")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("8")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("9")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("/")}
          </div>
        </div>    

        <div className="row justify-content-center">
          <div className="col-xs-3">
            {this.renderButton("4")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("5")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("6")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("*")}
          </div>
        </div>    

        <div className="row justify-content-center">
          <div className="col-xs-3">
            {this.renderButton("1")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("2")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("3")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("-")}
          </div>
        </div>    

        <div className="row justify-content-center">
          <div className="col-xs-3">
            {this.renderButton("0")}
          </div>
          <div className="col-xs-3">
            {this.renderButton(".")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("=")}
          </div>
          <div className="col-xs-3">
            {this.renderButton("+")}
          </div>
        </div>        
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

function factorial(num) {
  var rval=1;
  for (var i = 2; i <= num; i++)
    rval = rval * i;
  return rval;
}