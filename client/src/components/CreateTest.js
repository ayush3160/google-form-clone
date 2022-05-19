import React from "react";
import { useState,useEffect } from "react";
import Question from "./Question";
import { decode as atob } from "base-64";
import { useHistory } from "react-router-dom";


export default function CreateTest() {

  let history = useHistory();

  const [question, setQuestion] = useState("");

  const [test, setTest] = useState({});

  const [authorid,setAuthorid] = useState(0);

  const [ques, setQues] = useState([]);

  const [type, setType] = useState("radio");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var user = JSON.parse(atob(token.split(".")[1]));
      if (!user) {
        localStorage.removeItem("token");
        console.log(user, "Yo it is not user");
        history.push("/login");
      } else {
        setAuthorid(user.id);
      }
    } else {
      alert("You Are not logged In");
      history.push("/login");
    }
  }, []);

  const handlePublish = () => {
    test.question = ques;
    test.authorid = authorid;
    setTest(test);

    fetch('/addform',{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(test)
    }).then((res) => {
      return res.json()
    }).then((data) => {
      const hostname = window.location.hostname;

      const formlink = `http://${hostname}/fillingform/${data.formid}`

      alert(`Your form is visible at ${formlink} or you can see it at home by doing showpreview`);
    })
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      test.formtitle = e.target.value;
    } else if (e.target.name === "description") {
      test.formdescription = e.target.value;
    }

    setTest(test);
  };

  const handleSave = (option) => {
    if (type == "text") {
      const newQuestion = {
        question: question,
        type: type,
      };

      setQuestion("");
      setQues([...ques, newQuestion]);
    } else {
      const newQuestion = {
        question: question,
        type: type,
        options: option,
      };

      setQuestion("");
      setQues([...ques, newQuestion]);
    }
  };

  const handleDeleteQuestion = (i) => {
    const arr = ques.filter((value, index) => {
      if (index !== i) {
        return value;
      }
    });

    setQues(arr);
  };

  return (
    <>
    <div>
      <div className="container-fluid">
        <h1 className="text-center">Start Creating Your Own Form.</h1>
        <br />
        <div class="card mx-auto my-3 text-light" style={{ width: "60%" }}>
          <div class="card-body">
            <div className="my-3">
              <input
                type="text"
                className="input-question"
                name="title"
                id="inputEmail4"
                placeholder="Form Title"
                style={{
                  border: "none",
                  borderBottom: "1px light black",
                  height: "100px",
                  width: "100%",
                }}
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
            <div className="my-3">
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Form Description"
                name="description"
                style={{ border: "none", borderBottom: "1px light black" }}
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
            </div>
          </div>
        </div>

        {ques.map((value, index) => {
          if (value.type === "text") {
            return (
              <div
                className="card mx-auto my-3 text-light"
                style={{ width: "60%" }}
              >
                <div class="card-body">
                  <div className="my-3">
                    <p
                      className="text-dark"
                      style={{ fontSize: "20px", fontWeight: "lighter" }}
                    >
                      {value.question}
                    </p>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value=""
                    ></textarea>
                    <button
                      className="btn btn-danger my-2"
                      style={{ float: "right" }}
                      onClick={() => {
                        handleDeleteQuestion(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="card mx-auto my-3 text-light"
                style={{ width: "60%" }}
              >
                <div class="card-body">
                  <div className="my-3">
                    <p
                      className="text-dark"
                      style={{ fontSize: "20px", fontWeight: "lighter" }}
                    >
                      {value.question}
                    </p>
                    {value.options.map((newvalue, index) => {
                      return (
                        <div className="my-3">
                          <input type={value.type} name={value.question} />
                          <label
                            className="text-dark mx-2"
                            style={{ fontSize: "20px", fontWeight: "lighter" }}
                          >
                            {newvalue}
                          </label>
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-danger"
                      style={{ float: "right" }}
                      onClick={() => {
                        handleDeleteQuestion(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <div className="card mx-auto my-3 text-light" style={{ width: "60%" }}>
          <div class="card-body">
            <div className="my-3">
              <input
                type="text"
                className="input-form"
                id="inputEmail4"
                placeholder="Question"
                value={question}
                style={{
                  border: "none",
                  borderBottom: "1px light black",
                  height: "50px",
                  width: "70%",
                }}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              ></input>
              <button
                className="btn btn-primary dropdown-toggle mx-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Change Type
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setType("radio");
                  }}
                >
                  Mcq
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setType("text");
                  }}
                >
                  Text Area
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setType("checkbox");
                  }}
                >
                  Checkbox
                </button>
              </div>
            </div>
            <Question type={type} handleSave={handleSave} />
          </div>
        </div>
        <br />
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
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
