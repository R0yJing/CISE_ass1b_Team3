import {Component} from "react";
import AnalystPage from "./AnalystPage";
import axios from 'axios';
import env from "../env";

const ModeratorPage = ()=>{
   
    return (
        
      <div>
        <AnalystPage role={"moderated"} />
      </div>
    ); 

}

export default ModeratorPage;
