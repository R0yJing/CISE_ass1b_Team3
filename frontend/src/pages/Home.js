import axios from "axios";
import React, { Component } from "react";
import env from '../env';
class Home extends Component {
  
  render() {
    return (
      <div>
        <h2> How to use SEPER</h2>   
        <button onClick={() => axios.delete(env.url)} />   
      </div>
    );
  }
}
export default Home;
