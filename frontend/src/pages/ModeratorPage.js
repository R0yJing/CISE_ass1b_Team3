import {Component} from "react";
import axios from 'axios';
import env from "../env";
import TableTemplate from "./TableTemplate";

const ModeratorPage = ()=>{
   
    return (
        
      <div>
        <TableTemplate role={"moderated"} />
      </div>
    ); 

}

export default ModeratorPage;
