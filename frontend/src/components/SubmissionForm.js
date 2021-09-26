import React, {useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {articles, setArticle} from "../dummydata/articles";
import env from "../env";

const SubmissionForm = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  //use memo will be called on first page load,
  //if you haven't left the page and entered it again,
  //this won't be triggered
  //purpose: get the number of articles in db
  let checkEntries = (listStr) => {
      
      var regexDoi = RegExp('/^10.\d{4,9}/[-._;()/:A-Z0-9]+$/i'); //Checks to see if it's in the DOI Format
      var regexYear = RegExp('^(?:19|20)\d{2}$') //Checks to see if it is a year between 1900 and 2099
    
      var regexName = RegExp("^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"); //Not a perfect name checker, but better then nothing.
      console.log("list str = "+ listStr["title"]);
      console.log(listStr);

     if (listStr["doi"].length === 0) {
       console.log("Doi problem");
     }
     if(isNaN(listStr["pubyear"]) && listStr["pubyear"].length === 4)
     {
      console.log("Pub Year problem");
     }
     if((document.getElementById("sePractice") === ""))
     {
      console.log("se practice is wrong");
     }
     if(listStr["title"] === "")
     {
      console.log("Title problem");
     }
     if(listStr["claim"] === "")
     {
      console.log("Claim problem");
     }
     if(listStr["authors"] === "")
     {
      console.log("Author problem");
     }

      if (listStr["doi"].length === ""
        || isNaN(listStr["pubyear"])
        || listStr["pubyear"].length !== 4
        || (document.getElementById("sePractice").value === "")
        || listStr["title"] === ""
        || listStr["claim"] === ""
        || listStr["authors"] === "")
      {
        alert("Invalid entries detected");
        return false;
      } else return true;
      
    }
    console.log("cat " + document.getElementById("sePractice"));
    const onSubmit = (data) => {

      if (!checkEntries(data)){
        return;
      } else alert("success!");

      var placeholder = "None"
      const articleData = {
        cat: document.getElementById("sePractice").value,
        title: data["title"],
        authors: data["authors"],
        source: data["source"],
        pubyear: data["pubyear"],
        doi: data["doi"],
        claim: placeholder,
        evidence: placeholder,
      };
    
      console.log("title " + data.title);
      
      axios
        .post(env.url, articleData)
        .then((res) => {
       
        })
        .catch((err) => {
          console.log("Error submitting!");
          console.log(err);
        });
      //posting to db
    
  };
  const fieldStrings = ["title", "authors", "source", "pubyear", "doi"];
  function highlightIfErroneous(e, idx){
    
    if (e.target.value === ""){
        document.getElementById(idx).style.backgroundColor="red"
        
    } else {
        document.getElementById(idx).style.backgroundColor = "";
    }
  }
  const fields = fieldStrings.map((field, idx) => (
    <p key={idx}>
      <input
        required
        id={idx}
        key={idx}
        {...register(field)}
        placeholder={field}
      />
    
    </p>
  ));
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <select
      required
       
       id="sePractice" {...register("sepractice")}>
         <option value=""> Select an SE practice </option>
        {["TDD", "Mob Programming"].map((value, idx) => <option key={idx} value={value}>{value}</option> )}
        
      </select>
    
      <input type="submit" />
    </form>
  );

}

export default SubmissionForm;
