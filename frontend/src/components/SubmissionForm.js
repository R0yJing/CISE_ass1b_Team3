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
   
    const onSubmit = (data) => {
      const articleData = {
        //idx is decided by the db, not here.
        //_id: nextIdx,
        cat: document.getElementById("sePractice").value,
        title: data["title"],
        authors: data["authors"],
        source: data["source"],
        pubyear: data["pubyear"],
        doi: data["doi"],
        claim: data["claim"],
        evidence: data["evidence"],
      };
      alert("submitting " + Object.values(data));

      console.log("title " + data.title);
      
      Object.values(data).every(value => {
        if (value === "") return false;
        return true;
      });
      
      axios
        .post(env.url, articleData)
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
