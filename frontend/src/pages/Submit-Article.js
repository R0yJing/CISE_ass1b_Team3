import React from "react";
import SubmissionForm from "../components/SubmissionForm.js";
import {Component} from "react";
import axios from "axios";

class SubmitArticle extends Component{
  
  render(){
    
    return (
    <div>
      <h2>Submit Article</h2>
      <p>
        Please submit your article here.
      </p>
      
      <SubmissionForm/>
    </div>
  );
    }
};

export default SubmitArticle;
