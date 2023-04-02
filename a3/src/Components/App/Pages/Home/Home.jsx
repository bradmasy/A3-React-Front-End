import React from "react";
import NavBar from "../../../Navigation/NavBar";
import CheckBoxes from "../../../Body/CheckBoxes";
import ImageContainer from "../../../Body/ImageContainer";
import { useState } from 'react';
import PageButtons from "../../../Body/PageButtons"
import { useLocation } from 'react-router-dom';


const Home = ({headers, setHeaders}) => {

    const AMOUNT_OF_POKE = 10;
    const [selection, setSelection] = useState([]);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(10);
    const [current, setCurrent] = useState(1);

    console.log(headers);

    return (
        <div>
            <NavBar/>
            <CheckBoxes selection={selection} setSelection={setSelection}/>
            <ImageContainer headers={headers} start={start} end={end} nImages={AMOUNT_OF_POKE} selection={selection} />
            <PageButtons current={current} setCurrent={setCurrent} amount={AMOUNT_OF_POKE} start={start}  end={end} setStart={setStart} setEnd={setEnd} selection={selection} setSelection={setSelection}/>
        </div>
    )

}

export default Home;