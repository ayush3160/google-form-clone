import React from "react";
import {useState,useEffect} from "react"
import {decode as atob} from 'base-64'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import ShowResponse from "./ShowResponse";

export default function Dashboard(){

    let history = useHistory();

    const [allforms,setAllforms] = useState([]);

    const [response,setResponse] = useState([]);

    const [question,setQuestion] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
    if(token){
    const user = JSON.parse(atob(token.split('.')[1]));
      if(!user){
        localStorage.removeItem('token')
        console.log(user,"Yo it is not user")
        history.push("/login")
      }else{
        fetch("/getForms",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({id : user.id})
        }).then((res) => {
            return res.json();
        }).then((data) => {
          setAllforms(data.form);
        })
      }
    }else{
        alert("You Are not logged In")
        history.push("/login")
    }    
    },[])


    const handleResponse = (res) => {
      if(res.length == 0){
        alert("It does not have any response")
      }else{
        setResponse(res)
      }
      
    }

    if(response.length === 0){

    return(
      <div className="container-fluid" style={{margin : "0px",padding : "0px",backgroundColor : "#FBEAEB"}}>
        <div style={{width : "100%",backgroundColor : "#2F3C7E"}}>
        <label><h1 className="mx-5" style={{fontSize : "60px",fontFamily : "cursive",color : "#FBEAEB"}}>Create And Fill The Best Forms</h1></label>
        <img src = "./istockphoto-941665020-612x612.jpg" width={"20%"} alt = "This is an image" className="mx-3 my-3"/>
        </div>
        <h1>DashBoard</h1>
        <div className="container-fluid">
        {
          allforms.map((value,index) => {
            return (<div className="row my-3" style={{width : "90%"}}>
              <div className="col-sm-3 mx-auto">
              <label style={{fontSize : "40px",fontWeight : "lighter"}}>{value.formtitle}</label>
              </div>
              <div className="col-sm-3 my-3 mx-auto">
              <Link className="btn btn-secondary dashboard" style={{marginLeft : "20%",textAlign : "left"}} to = {`/fillingform/${value._id}`}>Show Preview<span style={{float : "right"}}>{"->"}</span></Link>
              </div>
              <div className="col-sm-3 my-3 mx-auto">
              <button className="btn btn-secondary dashboard" style={{marginLeft : "20%",textAlign : "left"}} onClick={() => {handleResponse(value.response); setQuestion(value.question)}}>Show Response<span style={{float : "right"}}>{"->"}</span></button>
              </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  } else {
    return <ShowResponse response = {response} question = {question}/>
  }  
}