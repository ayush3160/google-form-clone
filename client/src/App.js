import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import React,{useState} from 'react'
import { BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";
import Register from "./components/Register"
import Login from "./components/Login"
import CreateTest from "./components/CreateTest";
import Form from "./components/Form";

export default function App() {

    const [login,setLogin] = useState(0);
    
    const handleLogin = () => {
      setLogin(login+1)
    }

    return(
      <BrowserRouter>
      <Switch>
          <Route path = "/fillingform/:id"><Form /></Route>
          <div>
          <Navbar login = {login} />  
          <Route exact path = "/"><Home/></Route>
          <Route exact path = "/home"><Dashboard /></Route>
          <Route exact path = "/CreateTest"><CreateTest/></Route>
          <Route exact path = "/login"><Login handleLogin={handleLogin}/></Route>
          <Route exact path = "/register"><Register/></Route>
          </div>
      </Switch>    
      </BrowserRouter>
    )
  }
