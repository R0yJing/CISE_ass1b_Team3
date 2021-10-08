import React, { Component } from "react";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import axios from "axios";
import Dropdown from "../components/Dropdown.js";
import env from "../env";
import SEPractices from "../dummydata/SEPractices";
import SEPractice from "./SE-Practice";

/*
  *the purpose of TableTemplate is to act as a default template to build pages with tables.
  *the table can be modified into a queue by sorting the table at runtime (so it becomes a FIFO queue)
  *after retrieve the date information from the backend MongoDB
*/

class TableTemplate extends Component {
  state = {
    checkedRole: false,
    lvlEvidenceDropdownItems: [
      "Strongly Support",
      "Weakly Support",
      "Weakly Against",
      "Strongly Against",
    ].map((item, idx) => <option key={idx}>{item}</option>),
    deleleteButton:null,
    role: "",
    checkboxUnchecked: ["Claim", "Evidence"],
    data: [],
    deletedItems: [],
    currentDeletedIdx: [],
    columnsAnalyst: [
      {
        Header: "Checkbox",
        access: "checkbox",
        Cell: (row) => {
          return (
            <input
              type="checkbox"
              defaultChecked={row.value === "Yes" ? true : false}
              onClick={(event) => {
                if (event.target.checked) {
                  console.log("checked row = " + row.row.id);
                  this.clearRows(parseInt(row.row.id));
                } else this.unclearRows(parseInt(row.row.id));
              }}
            />
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
        sortType: "alphanumeric",
      },
      {
        Header: "Authors",
        accessor: "authors",
        sortType: "alphanumeric",
      },
      {
        Header: "Source",
        accessor: "source",
        sortType: "alphanumeric",
      },
      {
        Header: "Pub. Year",
        accessor: "pubyear",
        sortType: "alphanumeric",
      },
      {
        Header: "DOI",
        accessor: "doi",
        sortType: "alphanumeric",
      },
      ,
      {
        Header: "Claimed Benefit",
        accessor: "claim",
        Cell: (row) => {
          return (
            <input
              defaultValue={"Type claimed benefit"}
              onKeyDown={(e) =>{
                if (e.key==='Enter'){
                  this.state.data[row.row.id]["claim"] = e.target.value;
                  
                }
              }}
            />
          );
        },
        sortType: "alphanumeric",
      },
      {
        Header: "Level of Evidence",
        accessor: "evidence",
        Cell: (row) => {
          return (
            <Dropdown
              optionItems={this.state.lvlEvidenceDropdownItems}
              title={"Select Level of Evidence"}
              handleChange={(e) => {
          
                this.state.data[row.row.id]["evidence"] = e.target.value
              }}
            />
          );
        },
        sortType: "alphanumeric",
      },
    ],
  };

  clearRows(idx) {
    console.log("clearRows called");
    this.state.currentDeletedIdx.push(idx);
  }

  removeFromArray(idx, arr) {
    arr.splice(idx, 1);
  }
  unclearRows(idx) {
    console.log("unclearRows called");
    this.removeFromArray(idx, this.state.currentDeletedIdx);
  }
  
  getFields(idx) {
    alert("called getFields");
    if (this.props.role !== undefined){
     
        return [ {"evidence" : this.state.data[idx]["evidence"],
                  "claim" : this.state.data[idx]["claim"]}]
                            

    }
    else return { analysed: true };
  }

  componentDidMount() {
    if (!this.state.checkedRole) {
      this.state.checkedRole = true;
      if (this.props.role !== undefined) {
        this.state.role = this.props.role + "/";
        
      } else {
    
        this.state.columnsAnalyst.splice(0, 1);
        this.modifyColumns();
        this.setState({
          columnsAnalyst:this.state.columnsAnalyst});
        document.getElementById("deleteBtn").style.visibility = "hidden";
      }
    }

    if (this.props.role === undefined) {
      let tempData = [];
      
      axios
        .get(env.url)
        .then((res) => {
          tempData = res.data;
          this.setState({data:tempData.filter(elem => elem["moderated"] && !elem["analysed"] )})
        })
        .catch((err) => console.log("something bad happend"));
      
      
    } else {
      this.receiveDataModerator();
    }
  }
  modifyColumns(){
    this.state.columnsAnalyst = this.state.columnsAnalyst.slice(
      0,
      this.state.columnsAnalyst.length - 2
    );
    this.state.columnsAnalyst.push({
      Header:"Claimed Benefit",
      accessor:"claim"}
    );
    this.state.columnsAnalyst.push({
      Header:"Level of Evidence",
      accessor:"evidence"
    });
    this.setState({columnsAnalyst:this.state.columnsAnalyst});

  }
  receiveDataModerator() {

    let tempData = [];
    axios
      .get(env.url)
      .then((res) => {
        
        tempData = res.data.filter(
          (item) => item["moderated"] === false && item["analysed"] === false
        );
        this.setState({ data: tempData });
      })
      .catch((err) => console.log(err));
  }
  askForConfirm() {
    return window.confirm(
      "Are you sure you want to confirm this submission? This action cannot be undone"
    );
  }
  discard(event) {
    if (this.askForConfirm())
      this.state.currentDeletedIdx.forEach((idx) =>
        axios
          .delete(env.url + "/" + this.state.data[idx]["_id"])
          .then((res) => {
            let temp = this.state.data;
            this.removeFromArray(idx, this.state.data);
            alert("article successfully discarded");
            this.setState({ data: temp });
          })
          .catch((err) => console.log("something bad happened!"))
      );
      
  }

  update(event) {
  
    if (this.askForConfirm()) {
      let err = "";
      if (this.state.checkboxUnchecked.length !== 0) {
        this.state.checkboxUnchecked.forEach((item) => (err += item + " "));
        alert("Please check the following before you proceed\n" + err);

        return;
      }
    } else return;

    let dataRef = this.state.data;

    this.state.currentDeletedIdx.forEach((idx) => {
      let fieldsToUpdate = this.getFields(idx);
      axios
        .put(
          env.url + "/" + this.state.role + dataRef[idx]["_id"],
          fieldsToUpdate
        )
        .then((res) => window.alert("analyst submiisssion successul"))
        .catch((err) => console.error("cannot update"));
      //this.state.deletedItems.push(this.state.data[idx]["_id"]);
      this.removeFromArray(idx, dataRef);
    });
    this.setState({ data: dataRef });
  }

  render() {
    return (
      <div>
        <SEPractice
          data={this.state.data}
          columns={this.state.columnsAnalyst}
        />

        <span>
          <label id={1} defaultValue={"Claim"}>
            <input
              type="checkbox"
              onClick={(e) => {
                if (e.target.checked) {
                  this.state.checkboxUnchecked.splice("Claim", 1);
                } else this.state.checkboxUnchecked.push("Claim");
              }}
            />
            claim is valid
          </label>

          <label key={"Evidence Checkbox"}>
            <input
              type="checkbox"
              onClick={(e) => {
                if (e.target.checked) {
                  this.state.checkboxUnchecked.splice("Evidence", 1);
                } else this.state.checkboxUnchecked.push("Evidence");
              }}
            />
            evidence is sound
          </label>
        </span>
        <span>
          <button onClick={(e) => this.update(e)}>
            Submit all checked items to SEPER
          </button>
          <button id={"deleteBtn"} onClick={(e) => this.discard(e)}> Discard this item </button>
        </span>
      </div>
    );
  }
}




export default TableTemplate;
