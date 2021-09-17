import React, { Component } from "react";

class Dropdown extends Component {

  render() {
    
    return (
      <div>
        <select onChange={this.props.handleChange}>
          {<option value="">{this.props.title}</option>}
          {this.props.optionItems}
        </select>
      </div>
    );
  }
}

export default Dropdown;
