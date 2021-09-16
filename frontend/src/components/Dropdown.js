import React, { Component } from "react";
import SEPractices from "../dummydata/SEPractices";

const optionItems = SEPractices.map((SEPractice) => (
  <option key={SEPractice.practice}>{SEPractice.practice}</option>
));

class Dropdown extends Component {
  render() {
    return (
      <div>
        <select onChange={this.props.handleChange}>
          {<option value="">Select an SE Practice</option>}
          {optionItems}
        </select>
      </div>
    );
  }
}

export default Dropdown;
