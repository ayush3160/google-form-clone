import React from "react";
import { useState, useEffect } from "react";

export default function Question(props) {
  const [option, setOption] = useState("");

  const [alloption, setAllOption] = useState([]);

  const [checkbox, setCheckbox] = useState("");

  const [allcheckbox, setAllCheckbox] = useState([]);

  const handleDeleteOption = (i) => {
    if (props.type == "radio") {
      const arr = alloption.filter((value, index) => {
        if (index !== i) {
          return value;
        }
      });

      setAllOption(arr);
    } else {
      const arr = allcheckbox.filter((value, index) => {
        if (index !== i) {
          return value;
        }
      });

      setAllCheckbox(arr);
    }
  };

  if (props.type === "radio") {
    return (
      <>
        {alloption.map((value, index) => {
          return (
            <>
              <div className="my-3">
                <input type={"radio"} />
                <input
                  type="text"
                  className="input-form mx-3"
                  id="inputEmail4"
                  placeholder="Option"
                  style={{
                    border: "none",
                    borderBottom: "1px light black",
                    width: "60%",
                  }}
                  value={value}
                ></input>
                <button
                  style={{
                    color: "red",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => {
                    handleDeleteOption(index);
                  }}
                >
                  X
                </button>
              </div>
            </>
          );
        })}
        <div className="my-3">
          <input type={"radio"} />
          <input
            type="text"
            className="input-form mx-3"
            id="inputEmail4"
            placeholder="Option"
            value={option}
            style={{
              border: "none",
              borderBottom: "1px light black",
              width: "60%",
            }}
            onChange={(e) => {
              setOption(e.target.value);
            }}
          ></input>
          <br />
          <button
            className="btn text-primary my-2"
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              setAllOption([...alloption, option]);
              setOption("");
            }}
          >
            + Save Option
          </button>
        </div>
        <button
          style={{
            float: "right",
            backgroundColor: "transparent",
            border: "none",
            color: "blue",
            fontSize: "20px",
          }}
          onClick={() => {
            props.handleSave(alloption);
            setOption("");
            setAllOption([]);
          }}
        >
          + Add Question
        </button>
      </>
    );
  } else if (props.type === "text") {
    return (
      <>
        <div className="my-3">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value=""
          ></textarea>
          <button
            style={{
              float: "right",
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              fontSize: "20px",
            }}
            onClick={() => {
              props.handleSave([]);
            }}
          >
            + Add Question
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {allcheckbox.map((value, index) => {
        return (
          <>
            <div className="my-3">
              <input type={"checkbox"} />
              <input
                type="text"
                className="input-form mx-3"
                id="inputEmail4"
                placeholder="Option"
                style={{
                  border: "none",
                  borderBottom: "1px light black",
                  width: "60%",
                }}
                value={value}
              ></input>
              <button
                style={{
                  color: "red",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                onClick={() => {
                  handleDeleteOption(index);
                }}
              >
                X
              </button>
            </div>
          </>
        );
      })}
      <div className="my-3">
        <div className="my-3">
          <input type={"checkbox"} />
          <input
            type="text"
            className="input-form mx-3"
            id="inputEmail4"
            placeholder="Option"
            value={checkbox}
            style={{
              border: "none",
              borderBottom: "1px light black",
              width: "60%",
            }}
            onChange={(e) => {
              setCheckbox(e.target.value);
            }}
          ></input>
          <br />
          <button
            className="btn text-primary my-2"
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => {
              setAllCheckbox([...allcheckbox, checkbox]);
              setCheckbox("");
            }}
          >
            + Save Checkbox
          </button>
          <br />
          <button
            style={{
              float: "right",
              backgroundColor: "transparent",
              border: "none",
              color: "blue",
              fontSize: "20px",
            }}
            onClick={() => {
              props.handleSave(allcheckbox);
              setAllCheckbox([]);
              setCheckbox("");
            }}
          >
            + Add Question
          </button>
        </div>
      </div>
    </>
  );
}
