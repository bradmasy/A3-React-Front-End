import React, { useEffect } from "react"
import { useState } from "react"

import "./PageButtons.css"

const PageButtons = ({ current, setCurrent, amount, start, end, setStart, setEnd, selection, setSelection }) => {

    const [buttons, setButtons] = useState([]);
    const [limit, setLimit] = useState(amount);
    const [buttonStart, setButtonStart] = useState(1);
   // const [current, setCurrent] = useState(start);
    const createButtons = async () => {

        let divs = [];
        console.log(start);
        console.log(end);

        if (start != 1) {
            let div = <div>
                <button className="button-buttons" value="prev" onClick={
                    (e) => {
                        setStart(start - 1);

                    }
                }>prev</button>
            </div>;
            divs.push(div);
        }

        for (let i = start; i <= (parseInt(start) + parseInt(amount) - 1); i++) {

            let div = <div>
                <button className="button-buttons" onClick={
                    (e) => {
                        setStart(e.target.value);

                    }
                } value={i}>{i}</button>
            </div>;

            divs.push(div);
        }



        let div = <div>
            <button className="button-buttons" onClick={
                (e) => {

                    setStart(start + 10);
                }
            } value="next">next</button>
        </div>;
        divs.push(div);
        setButtons(divs);
    }

    useEffect(() => {
        const buttons = async () => {
            await createButtons();
        }
        buttons();
    },[start])


    return (
        <div id="button-paging">
            <div id="button-row">
                <div id="button-column">
                    {
                        buttons.map((button, i) => {
                            const key = `${button}-${i}`;
                            return (
                                <div className="button-buttons" value={i + 1} key={key} >
                                    {button}
                                </div>

                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default PageButtons;