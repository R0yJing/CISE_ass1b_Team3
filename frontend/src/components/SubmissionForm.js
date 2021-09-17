import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {articles, setArticle} from "../dummydata/articles";
import env from "../env";


const SubmissionForm = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  let nextIdx =-1;
  axios
    .get(env.env)
    .then((res) =>{nextIdx = res.data.length + 1; 
      console.log("sucess from db!")}).catch(err => console.log("error getting from db " + err));
  let onSubmit = (data) => {
    //axios.delete("http://localhost:5555/api/articles").then((res) => console.log("all deleted"));
    // for (let i = 0; i < 10; i++){
    //   axios.delete("http://localhost:5555/api/articles/" + i).then((res)=>console.log("deleted " + i));
    // }
    
    
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
    console.log(JSON.stringify(articleData));
    axios
      .post(env.env, articleData)
      .then((res) => {
        console.log("article posted");
        
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
      <p>{result}</p>
      <input type="submit" />
    </form>
  );
};
export default SubmissionForm;
