import React from "react";
import { useState } from "react";


export default function ShowResponse(props) {

    const [answer,setAnswer] = useState([]);

    const handleAnswer = (ans) => {
        console.log(ans);
        setAnswer(ans);
    }


    return (<div className="container-fluid">
        <div className="row">
        <div className="col-sm-3 mx-auto my-2">    
        <div className="scrolling-area">
            <div className="scrolling-element-inside">
            <h1>Responses</h1> 
             {
            props.response.map((value,index) => {
                return(<button className="btn btn-secondary my-2" onClick={() => {handleAnswer(value.answer)}}>{value.email}</button>)
            })
        } 
            </div>
        </div>
        </div>
        <div className="col-sm-8 mx-auto my-2">
        <div className="scrolling-area-1">
            <div className="scrolling-element-inside">
                <h1>Answers</h1>
             {
                props.question.map((value,index) => {
                    if (value.type == "text") {
                        let ans = " ";
                        
                        if (answer[index] == null){
                            ans = " ";
                        }else{
                            ans = answer[index];
                        }
                        return (
                          <div class="card mx-auto my-3 text-light" style={{ width: "70%" }}>
                            <div class="card-body">
                              <p
                                style={{
                                  fontSize: "25px",
                                  color: "black",
                                  fontWeight: "100",
                                }}
                              >
                                {value.question}
                              </p>
                              <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value = {ans}
                              ></textarea>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div class="card mx-auto my-3 text-light" style={{ width: "60%" }}>
                            <div class="card-body">
                              <div className="my-3">
                                <p
                                  style={{
                                    fontSize: "25px",
                                    color: "black",
                                    fontWeight: "100",
                                  }}
                                >
                                  {value.question}
                                </p>
                              </div>
              
                              {value.options.map((value1, i) => {

                                let checked = false;

                                  if(answer[index] == i && value.type == "radio"){
                                        checked = true;
                                    }
                                
                                if(typeof answer[index] !== "undefined" && value.type == "checkbox" && answer[index] !== null){
                                    let num = i.toString();
                                    if(answer[index].includes(num)){
                                        checked = true;
                                    }
                                }
                                return (
                                  <div className="my-3">
                                    <input type={value.type} name={index} checked = {checked}/>
                                    <label
                                      className="mx-3"
                                      style={{
                                        fontSize: "20px",
                                        color: "black",
                                        fontWeight: "100",
                                      }}
                                    >
                                      {value1}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    })}
            </div>
        </div>
        </div>
        </div>
    </div>
    )
}