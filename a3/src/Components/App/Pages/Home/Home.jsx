import React from "react";
import NavBar from "../../../Navigation/NavBar";
import CheckBoxes from "../../../Body/CheckBoxes";
import ImageContainer from "../../../Body/ImageContainer";
import { useState } from 'react';
import PageButtons from "../../../Body/PageButtons"

const Home = () => {
    const AMOUNT_OF_POKE = 10;
  const [selection, setSelection] = useState([]);
  const [start,updateStart] = useState(1);
  const [end,updateEnd] = useState(10);

    return (
        <div>
            <NavBar />
            <CheckBoxes selection={selection} setSelection={setSelection} />
            <ImageContainer start={start} end={end} nImages={AMOUNT_OF_POKE} selection={selection} />
            <PageButtons start={start} end={end} nButtons={AMOUNT_OF_POKE}/>
        </div>
    )

}

export default Home;