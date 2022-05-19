import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import validator from "validator";
import ReactLoading from "react-loading";

 const Form = () => {
  const { id } = useParams();

  const [responses,setResponses] = useState([]);

  const [email,setEmail] = useState("");

  const [loading,setLoading] = useState(true);

  const [form, setForm] = useState({});

  const handleSubmit = () => {
    if(validator.isEmail(email)){
      fetch('/submitAnswers',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({id : id,response : {email : email,answer : responses}})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                alert("your response has been submitted");
            })
    }else {
      const error = document.getElementById("error")
      error.style.display = "block";
    }
  }

  useEffect(() => {
     fetch("/fillform",{
       method : "POST",
       headers : {
         "Content-Type" : "application/json"
       },
       body : JSON.stringify({id : id})
     }).then((res) => {
         return res.json();
     }).then((data) => {
          setForm(data.form)
          setLoading(false)    
     })
  },[])

  const handleResponse = (value,index,type) => {
    if(type === "checkbox"){
        if(typeof(responses[index]) == "undefined"){
          responses[index] = [value]

          setResponses(responses)

          console.log(responses)
        }else{
        if(responses[index].includes(value)){
            const i = responses[index].indexOf(value);

            const newarray = responses[index].splice(i,1);

            responses[index] = newarray;

            setResponses(responses);

            console.log(responses)
        }else{
            responses[index].push(value);

            setResponses(responses)

            console.log(responses)
        }
      }
    }else{
        responses[index] = value;

    setResponses(responses);

    console.log(responses);
    }
  }
  if(loading){
      return(
        <div className="container-fluid">
          <ReactLoading type="spin" color="#0000FF"
          height={100} width={50}/>
          <h1>Loading...</h1>
        </div>
      )
  }else{
  return (
    <div className="container-fluid">
      <div class="card mx-auto my-3 text-light" style={{ width: "60%" }}>
        <div class="card-body">
          <div className="my-3">
            <p style={{ fontSize: "65px", color: "black", fontWeight: "100" }}>
              {form.formtitle}
            </p>
          </div>
          <div className="my-3">
            <p style={{ fontSize: "20px", color: "black", fontWeight: "100" }}>
              {form.formdescription}
            </p>
          </div>
        </div>
      </div>

      <div class="card mx-auto my-3 text-light" style={{ width: "60%" }}>
        <div class="card-body">
          <div className="my-3">
            <p style={{ fontSize: "20px", color: "black", fontWeight: "100" }}>
              Email Id <span style={{ color: "red" }}>*</span>
            </p>
            
            <p id="error" style={{display : "none",fontSize: "15px", color: "red", fontWeight: "100" }}>
              Fill A valid email id .......
            </p>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="John@example.com"
              name="description"
              style={{
                border: "1px solid black",
                borderBottom: "1px light black",
              }}
              onChange = {(e) => {setEmail(e.target.value)}}
            ></input>
          </div>
        </div>
      </div>

      {form.question.map((value, index) => {
        if (value.type === "text") {
          return (
            <div class="card mx-auto my-3 text-light" style={{ width: "60%" }}>
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
                  onChange = {(e) => handleResponse(e.target.value,index,value.type)}
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
                  return (
                    <div className="my-3">
                      <input type={value.type} name={index} value = {i} onClick = {(e) => handleResponse(e.target.value,index,value.type)}/>
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
      <br/>
      <div
          className="card mx-auto my-3 text-light"
          style={{
            width: "60%",
            backgroundColor: "rgb(232, 232, 255)",
            border: "none",
          }}
        >
          <button
            className="btn btn-primary mx-auto"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
    </div>
  );
}
}


export default Form