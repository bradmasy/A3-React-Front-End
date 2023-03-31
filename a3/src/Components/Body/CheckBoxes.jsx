
import React, { useState, useEffect } from "react";
import "./CheckBoxes.css";
import axios from "axios";
import { get } from "mongoose";

const POKE_TYPES_URL = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json";

const CheckBoxes = ({ selection, setSelection }) => {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        const getTypes = async () => {
            const response = await axios.get(POKE_TYPES_URL);
            const types = response.data; // array of types

            setTypes(types);
        }
        getTypes();

    }, []);


    const renderBoxes = () => {
        let checkBoxArr = [];

        for (let i = 0; i < types.length; i++) {
            let checkBox = <div className="poke-box-container" key={types[i].english}>
                <div className="checkbox-container">
                    <input type="checkbox" onChange={async (e) => {
                        if (e.target.checked) {
                            await setSelection([...selection, types[i].english]);
                        } else {
                            await setSelection(selection.filter(type => type !== types[i].english));
                        }
                    }
                    } className="poke-box" id={types[i].english} value={types[i].english} name={types[i].english} />
                </div>

                <div className="label-position">
                    <label className="poke-label">{types[i].english}</label>

                </div>
            </div>

            checkBoxArr.push(checkBox);
        }

        return checkBoxArr;
    }

    return (
        <div id="box-container">
            <div id="check-boxes">
                {renderBoxes()}
            </div>
        </div>
    );
}



export default CheckBoxes;