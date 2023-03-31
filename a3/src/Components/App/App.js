
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home"

function App() {

  const [selection, setSelection] = useState([]);
  const [user, setUser] = useState([]);


  return (
    <div id="body">

      <Router>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser}/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
      {/* <NavBar />
      <CheckBoxes selection={selection} setSelection={setSelection} />
      <ImageContainer selection={selection}/> */}
    </div>

  );
}

export default App;
