import axios from "axios";
import React, { Component } from "react";
import env from '../env';

class Home extends Component {
  

  render() {
    return (
      <div styles={{FontFace}}>
        <h1> Welcome to the SEPER repository!</h1>
        <p> Please go to the Submitter An Article Page to view articles.
            Alternatively, if you are a Moderator or an Analyst, please 
            head to the Moderator Page or Analyst Page</p> 
      </div>
    );
  }
}
export default Home;
