
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home"
import Dashboard from './Pages/Dashboard/Dashboard';
import Reports from './Pages/Reports/Reports';

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
          <Route path="/dashboard" element={<Dashboard headers={headers} />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/unique-users" element={<div>Unique Users Report</div>} />
          <Route path="/top-api-users" element={<div>Top API Users Report</div>} />
          <Route path="/top-users-for-each-endpoint" element={<div>Top Users For Each Endpoint Report</div>} />
          <Route path="/400-errors" element={<div>400 Errors Report</div>} />
          <Route path="/recent-errors" element={<div>Recent 400/500 Errors Report</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
