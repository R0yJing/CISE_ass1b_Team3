import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {articles, setArticle} from "../dummydata/articles";
import env from "../env";


const SubmissionForm = () => {
  const { register, handleSubmit } = useForm();
  const [nextIdx, setResult] = useState("");

  //use memo will be called on first page load,
  //if you haven't left the page and entered it again,
  //this won't be triggered
  //purpose: get the number of articles in db
  useMemo( ()=>{

    axios
      .get(env.url)
      .then((res) => {
        setResult(res.data.length + 1);
        console.log("first render!")
      })
      .catch((e) => console.log("error getting from db"))
      
    },
    []
  );


    let onSubmit = (data) => {
    
    const articleData = {
      _id: nextIdx,
      cat: document.getElementById("sePractice").value,
      title: data.title,
      authors: data.authors,
      source: data.source,
      pubyear: data.pubyear,
      doi: data.doi,
      claim: data.claim,
      evidence: data.evidence,
    };
    //posting to db
    axios
      .post(env.url, articleData)
      .then((res) => {
        alert("article posted");
        //update the next article index
        setResult(Number(nextIdx) + 1);
        console.log("next idx" + nextIdx);
      })
      .catch((err) => {
        console.log("Error submitting!");
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <input {...register("title")} placeholder="Title" />
      <p>
        <input {...register("authors")} placeholder="Authors" />
      </p>
      <p>
        <input {...register("source")} placeholder="Source" />
      </p>
      <p>
        <input {...register("pubyear")} placeholder="Publication Year" />
      </p>
      <p>
        <input {...register("doi")} placeholder="DOI" />
      </p>
      <select id="sePractice" {...register("sepractice")}>
        <option value="">Select SE practice...</option>
        <option value="TDD"> TDD</option>
        <option value="Mob Programming"> Mob Programming</option>
      </select>
    
      <input type="submit" />
    </form>
  );
};
export default SubmissionForm;
