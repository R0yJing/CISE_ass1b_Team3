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

class SEPractice extends Component {

    state = {
        currentArticles: [],
        allArticles: []
    }
    //called every time this page is loaded.
    componentDidMount(){
      console.log("prcess env" + env.env);

      axios.get(env.env).then(res => {
        this.setState({allArticles : res.data});
        console.log(">>>>>>>>>>>" + this.state.allArticles.length);
      }).catch((e)=> console.log("no articles found"));

      

    }

    handleChange = (e) =>{
        console.log(e.target.value);
       
        this.setState({
          currentArticles: this.state.allArticles.filter(
            (item) => item.cat.toLowerCase() === e.target.value.toLowerCase()
          ),
        });
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
