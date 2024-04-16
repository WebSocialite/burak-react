//@ts-nocheck
import { log } from "console";
import React, { Component } from "react";

class Test extends Component { // class component o'z ichida 
                            //state componentlarini qamrab olgan ekan

    constructor(props) {
      super(props);
      this.state = {
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }
    changeDetail = () => {
      this.setState({
        color: "blue", 
        brand: "Nexia 2 legenda", 
        model: "1.6 S", 
        year: 2020
    });
    };

    componentDidMount() {
     console.log("componentDidMount");
     //runs after first  render => retrieve data from backend server
    }

    componentWillUnmount() {
     console.log("componentWillUnmount");
    // runs before component unmount
    }

    componentDidUpdate() {

    }


    render() {
      return (
        <div>
          <h1>My {this.state.brand}</h1>
          <p>
            Color: {this.state.color} - 
            Model: {this.state.model} -
            from {this.state.year}.
          </p>
          <button
            type="button"
            onClick={this.changeDetail}
          >Change Detail</button>
        </div>
      );
    }
  }

  export default Test;