import React, { Component } from "react";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
import axios from "axios";
import Dropdown from "../components/Dropdown.js";
import env from "../env";
import SEPractices from "../dummydata/SEPractices";

const optionItems = SEPractices.map((SEPractice) => (
  <option key={SEPractice.practice}>{SEPractice.practice}</option>
));

//this is the SE table page
class SEPractice extends Component {

    state = {
        //current articles filtered by se practice
        currentArticles:[],
        //all articles in db
        allArticles:[]
    }
    //called every time this page is loaded.
    componentDidMount(){
      
      console.log("heroku @" + env.herokuUrl);
      axios
        .get(env.herokuUrl)
        .then((res) => {
          console.log(res.data);
          this.setState({ allArticles: res.data });
          console.log(this.state.allArticles);

          console.warn("got all arts");
        })
        .catch((e) => console.log("no articles found"));
    }

    handleChange = (e) =>{
        console.log(e.target.value);
          this.state.allArticles.forEach(item => {if (item["cat"].toLowerCase() === e.target.value.toLowerCase()) console.log("yes")});
    let temp =  this.state.allArticles.filter(
       (item) => item["cat"].toLowerCase() === e.target.value.toLowerCase()
     );
     console.log("temp" + temp);
     console.log(temp)
   //set state will automatically render the whole page
   this.setState({
     currentArticles : temp
   });
        console.log("current arts " + this.state.currentArticles);

    }
    render() {
        if (this.state.currentArticles.length !== 0)
          return (
            <div>
              
              <Dropdown title="Select an SE practice" optionItems = {optionItems}  handleChange = {this.handleChange} />
              <Styles>
                <Table
                  data={this.state.currentArticles}
                  columns={tablecolumns}
                  numArticles={this.state.allArticles.length}
                />
                
              </Styles>
            </div>
          );
          
        else
            return (
              <div>
                <h2>
                  Select SE Practice to get evidence for the claimed benefits
                </h2>
                <Dropdown title='Select an SE practice' optionItems = {optionItems} handleChange={this.handleChange} />
              </div>
            );
            
    }
}
export default SEPractice;
