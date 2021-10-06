import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { articles, setArticle } from "../dummydata/articles";
import env from "../env";


const SubmissionForm = () => {

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  //use memo will be called on first page load,
  //if you haven't left the page and entered it again,
  //this won't be triggered
  //purpose: get the number of articles in db

  function checkDOI(string) {
    var regexDoi = RegExp('/^10.\\d{4,9}/[-._;()/:A-Z0-9]+$/i/'); //Checks to see if it's in the DOI Format '/^10.\d{4,9}/[-._;()/:A-Z0-9]+$/i/'
    var regexDOI = RegExp('\\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\\S)+)\\b'); // '\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\S)+)\b'
    var potentialRegexDOI = RegExp('/^10.\\d{4}/\\d+-\\d+X?(\\d+)\\d+<[\\d\\w]+:[\\d\\w]*>\\d+.\\d+.\\w+;\\d$/i'); ///^10.\d{4}/\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d$/i
    var potentialRegexDOI2 = RegExp("/^10.\\d{4,9}/[-._;()/:A-Z0-9]+$/i")  //   /^10.\d{4,9}/[-._;()/:A-Z0-9]+$/i
    var DOIpattern = new RegExp('\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\'<>])\S)+)\b');
    var anotherDOIPattern = new RegExp('10\\.[^/]+/([^(\s\>\\"\\<})])+')

    //Is super basic, but works, so we will stick with it!!!!
    var basicDOIpattern = RegExp("10.(\\d)+/(\\S)+")

    if(basicDOIpattern.test(string)){
      return true;
    }
    else{
      return false;
    }
  }

  let checkAuthors = (authors) => {
    var regexAuthors = RegExp("^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$");

    if (regexAuthors.test(authors)) {
      return true;
    }
    else {
      return false;
    }

  }

  let checkYear = (year) => {
    if (!isNaN(year)) {
      var number = Number(year);
      var yearCurrent = Number(new Date().getFullYear());
      //console.log( year);
      //console.log(number);

      if (number < 1900 || number > yearCurrent) {
        console.log("Invalid year");
        return false;
      } else {
        console.log("Valid year");
        return true;
      }
    }
  }

  let checkEntries = (listStr) => {
    var errorString = "";

    if (!checkAuthors(listStr["authors"])) {
      errorString += "Authors, "
    }
    
    if (!checkYear(listStr["pubyear"])) {
      errorString += "Year, "
    }
  
    if (!checkDOI(listStr["doi"])) {
      errorString += "Doi, "
    }
    
    //if the error string is empty, then no errors have occured
    if (errorString === "") {
      return true
    }
    //if the error string isn't empty, alert the user
    else {
      //The substring makes sure the finaly comma and space is remove from errorString 
      alert("Please fix the following entries: " + errorString.substring(0, errorString.length - 2));
      return false;
    }




    //console.log("type of " + typeof listStr);

    // var regexDOIObj = RegExp(regexDOI);

    // var regexName = RegExp("^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"); //Not a perfect name checker, but better then nothing.
    // console.log("list str = " + listStr["title"]);
    // console.log(listStr);

    //  console.log(/^([a-z0-9]{5,})$/.test('abc1')); // false

    //  var term = "sample1";
    // var re = new RegExp("^([a-z0-9]{5,})$");
    // if (re.test(term)) {
    //     console.log("Valid");
    // } else {
    //     console.log("Invalid");








    // if (listStr["doi"].length === ""
    //   || isNaN(listStr["pubyear"])

    //   || (document.getElementById("sePractice") === "")
    //   || listStr["title"] === ""
    //   || listStr["claim"] === ""
    //   || listStr["authors"] === "")
    // {

    //   alert("Invalid entries detected");
    //   return false;
    // } else return true;

  }




  console.log("cat " + document.getElementById("sePractice"));
  const onSubmit = (data) => {
    console.log("keys = ");


    if (!checkEntries(data)) {
      return;
    } else alert("success!");


    const articleData = {
      cat: document.getElementById("sePractice"),
      title: data["title"],
      authors: data["authors"],
      source: data["source"],
      pubyear: data["pubyear"],
      doi: data["doi"],
      claim: data["claim"],
      evidence: data["evidence"],
    };

    console.log("title " + data.title);

    axios
      .post(env.url, data)
      .then((res) => {
        alert("article posted");
        // res.send({posted: 'posted'});
        res.status(0);


      })
      .catch((err) => {
        console.log("Error submitting!");
        console.log(err);
      });
    //posting to db

  };
  const fieldStrings = ["title", "authors", "source", "pubyear", "doi"];
  function highlightIfErroneous(e, idx, field) {
    if (field === "doi") {
      if (!checkDOI(e.tatget.value))
        alert("DOI is invalid");

    }

    if (field === "pubyear") {
      alert("checking " + field);

      if (!checkYear(e.tatget.value))
        document.getElementById(idx).style.backgroundColor = "red";

    } else
      document.getElementById(idx).style.backgroundColor = "";

    if (e.target.value === "") {
      document.getElementById(idx).style.backgroundColor = "red"

    } else {
      document.getElementById(idx).style.backgroundColor = "";
    }
  }
  const fields = fieldStrings.map((field, idx) =>

  (<p key={idx}>
    <input
      required
      id={idx}
      key={idx}

      onBlur={(evet) => highlightIfErroneous(evet, idx, field)}
      {...register(field)}
      placeholder={field}

    />

  </p>)
  );
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <select
        defaultValue={""}
        id="sePractice" {...register("sepractice")}>
        <option value="">Select SE practice...</option>
        <option value="TDD"> TDD</option>
        <option value="Mob Programming"> Mob Programming</option>

      </select>

      <input type="submit" />
    </form>
  );

}

export default SubmissionForm;
