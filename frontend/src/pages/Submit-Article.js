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
        This will be a form to allow submitters to submit an article for
        possible inclusion in our SEPER repo.
      </p>
      
      <SubmissionForm/>
    </div>
  );
    }
};

export default SubmitArticle;
