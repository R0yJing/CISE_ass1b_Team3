import React, { Component } from "react";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import tablecolumns from "../components/tablecolumns.js";
import articles from "../dummydata/articles";
import axios from "axios";
import Dropdown from "../components/Dropdown.js";

class SEPractice extends Component {
    state = {
        currentArticles: [],
        allArticles: []
    }
    componentDidMount(){
      axios.get('http://localhost:5555/api/articles').then(res => {
        this.state.allArticles = res.data.articles;
        console.log("got all articles");
      })

      
    }

    handleChange = (e) =>{
        console.log(e.target.value);

        let temp = this.state.allArticles.filter((item) => item.cat === e.target.value);
        temp.forEach(i => console.log(i.title));

        this.setState({
            currentArticles: temp
        });
    }
    render() {
        if (this.state.currentArticles.length !== 0)
          return (
            <div>
              
              <Dropdown handleChange = {this.handleChange} />
              <Styles>
                <Table
                  data={this.state.currentArticles}
                  columns={tablecolumns}
                />
                <button del onClick = {() => axios.delete(
            "http://localhost:" + 5555 + "/api/articles/dsf"
          )} />
              </Styles>
            </div>
          );
          
        else
            return (
              <div>
                <h2>
                  Select SE Practice to get evidence for the claimed benefits
                </h2>
                <Dropdown handleChange={this.handleChange} />
              </div>
            );
            
    }
}
export default SEPractice;
