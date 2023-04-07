
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home"
import Graph from './Pages/Graph/Graph';
import Reports from './Pages/Reports/Reports';
import Logout from './Pages/Logout/Logout';

function App() {

  const [selection, setSelection] = useState([]);
  const [user, setUser] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshTokens] = useState("");

  const [headers, setHeaders] = useState({});

  return (
    <div id="body">
      <Router>
        <Routes>
          <Route path="/" element={<Login setHeaders={setHeaders} />} />
          <Route path="/home" element={<Home headers={headers} />} />
          <Route path="/logout" element={<Logout headers={headers} />} />
          <Route path="/reports" element={<Reports headers={headers} />} />
          <Route path="/unique-users" element={<Graph headers={headers} type={"unique-users"}/>} />
          <Route path="/top-api-users" element={<Graph headers={headers} type={"top-api-users"}/>} />
          <Route path="/top-users-for-each-endpoint" element={<Graph headers={headers} type={"top-users-for-each-endpoint"}/>} />
          <Route path="/400-errors" element={<Graph headers={headers} type={"400-errors"}/>} />
          <Route path="/recent-errors" element={<Graph headers={headers} type={"recent-errors"}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
