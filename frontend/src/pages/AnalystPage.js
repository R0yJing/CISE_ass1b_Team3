import React, { Component } from "react";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import axios from "axios";
import Dropdown from "../components/Dropdown.js";
import env from "../env";
import SEPractices from "../dummydata/SEPractices";
import SEPractice from "../pages/SE-Practice";

class AnalystPage extends Component {
  state = {
    lvlEvidenceDropdownItems : ["Strongly Support", "Weakly Support", "Weakly Against", "Strongly Against"].map((item, idx) => <option  key={idx}>{item}</option>),
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
              onBlur={(e) =>
                (this.state.data[row.row.id]["claim"] = e.target.value)
              }
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
            onChanged={e=>this.state.data[row.row.id]=e.target.value}/>
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
  checkEntriesValid(event, idx) {
    alert("checking " + idx);
  }
  componentDidMount() {
    let shouldTestForAnalysed = true;
    if (this.props.role !== undefined) {
      this.state.role = this.props.role + "/";
      shouldTestForAnalysed = false;
      alert("on moderator");
    }

    axios
      .get(env.url)
      .then((res) => {
        let temp = res.data.filter(
          (queriedItem) =>
            queriedItem["date"] !== null &&
            queriedItem["moderated"] &&
            (!shouldTestForAnalysed ||
              (queriedItem["analysed"] !== null && queriedItem["analysed"]))
        );

        temp.sort((a, b) => a.date > b.date);
        this.setState({ data: temp });
      })
      .catch((err) => console.log("error in analyst page"));
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
        <button
          onClick={(event) => {
            if (
              window.confirm(
                "Are you sure you want to confirm this submission? This action cannot be undone"
              )
            ) {
              let err = "";
              if (this.state.checkboxUnchecked.length !== 0) {
                this.state.checkboxUnchecked.forEach(
                  (item) => (err += item + " ")
                );
                alert("Please check the following before you proceed\n" + err);

                return;
              }
            }

            let dataRef = this.state.data;
            this.state.currentDeletedIdx.forEach((idx) => {
              let evidenceAndClaim = {
                evidence: this.state.data[idx]["evidence"],
                claim: this.state.data["claim"],
              };

              window.alert("posting to analyst" + evidenceAndClaim["evidence"]);
              window.alert(
                env.url + "/" + this.state.role + dataRef[idx]["_id"]
              );
              axios
                .put(
                  env.url + "/" + this.state.role + dataRef[idx]["_id"],
                  evidenceAndClaim
                )
                .then((res) => window.alert("analyst submiisssion successul"))
                .catch((err) => console.error("cannot update"));
              //this.state.deletedItems.push(this.state.data[idx]["_id"]);
              this.removeFromArray(idx, dataRef);
            });
            this.setState({ data: dataRef });
          }}
        >
          Submit all checked items to SEPER
        </button>
      </div>
    );
  }
}
let checkboxWithLabel = ({text, parentState}) =>{
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onClick={(e) => {
            if (e.target.checked) {
              parentState.checkboxUnchecked.splice(text, 1);
            } else parentState.checkboxUnchecked.push(text);
          }}
        >
          {text}
        </input>
      </label>
    </div>
  );
}



export default AnalystPage;
