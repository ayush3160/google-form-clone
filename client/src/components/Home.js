import React from "react";

export default function Home(){
    return(
         <div className="container-fluid">
          <h1 className="text-center display-1"><span style={{fontSize : "50px",color : "red"}}>{"<>"}</span>Welcome To the Google-Form<span style={{fontSize : "50px",color : "red"}}>{"</>"}</span></h1>
          <p className="text-center"><i>"Where All The Test & Form Are Created"</i></p>
          <h2 className="text-primary"># What is Google-Form ?</h2>
          <br/>
          <p>{">"}Google-Form is a clone of real google form. Using it you can create you own test and forms and can check the responses.</p>
          <br/>
          <p>{">"}It is designed and developed keeping in mind about the teacher and student comfortability.</p>
          <br/>
          <h2 className="text-primary"># How To Get Started ?</h2>
          <br/>
          <p>{">"}If You have don't have account on google-form, You can start by registering using the name,email and by setting up the password.</p>
          <br/>
          <p>{">"}That's all you are ready to start creating your own test or form. After publishing the test you'll get a test link which you can share to get the responses.</p>
      </div> 
    )
}