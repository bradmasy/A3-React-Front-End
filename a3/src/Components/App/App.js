
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {

  const [selection, setSelection] = useState([]);

  const updateSelection = () => {

  }

  return (
    <div id="body">

      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </Router>
      {/* <NavBar />
      <CheckBoxes selection={selection} setSelection={setSelection} />
      <ImageContainer selection={selection}/> */}
    </div>

  );
}

export default App;
