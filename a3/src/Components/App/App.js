
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home"
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {

  const [selection, setSelection] = useState([]);
  const [user, setUser] = useState([]);
  const [accessToken,setAccessToken] =useState("");
  const [refreshToken,setRefreshTokens] =useState("");

  const [headers, setHeaders] = useState({});

  return (
    <div id="body">

      <Router>
        <Routes>
          <Route path="/" element={<Login setHeaders={setHeaders}/>}/>
          <Route path="/home" element={<Home headers={headers}/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
