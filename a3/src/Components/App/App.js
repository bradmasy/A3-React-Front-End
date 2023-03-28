
import './App.css';
import NavBar from "../Navigation/NavBar";
import CheckBoxes from '../Body/CheckBoxes';
import { useState } from 'react';
import ImageContainer from '../Body/ImageContainer';

function App() {

  const [selection, setSelection] = useState([]);

  const updateSelection = () => {

  }

  return (
    <div id="body">
      <NavBar />
      <CheckBoxes selection={selection} setSelection={setSelection} />
      <ImageContainer selection={selection}/>
    </div>

  );
}

export default App;
