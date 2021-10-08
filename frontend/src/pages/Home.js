import axios from "axios";
import React, { Component } from "react";
import env from '../env';

class Home extends Component {
  

  render() {
    return (
      <div>
        <h1 color={"green"}> Welcome to the SEPER repository!</h1>
        <h2> Please go to the Submitter An Article Page to view articles</h2>
        <h2> Alternatively, if you are a Moderator or an Analyst, please head to</h2>
        <h2> Moderator Page or Analyst Page</h2> 
      </div>
    );
  }
}
export default Home;
