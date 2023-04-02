import React, { useEffect } from "react"
import { useState } from "react"

import "./PageButtons.css"

const PageButtons = ({current, setCurrent, amount, start, end, setStart, setEnd, selection, setSelection }) => {

    const [buttons, setButtons] = useState([]);
    const [limit, setLimit]= useState(amount);
    const [buttonStart, setButtonStart] = useState(1);

    const createButtons = async () => {

        let divs = [];
        console.log(start);
        console.log(end);
        console.log()
        if (start != 1) {
            let div = <div>
                <button className="button-buttons" value="prev" onClick={
                    (e) => {
                        const newStart = start - amount <= 1? 1: (start - amount);
                        const newEnd = start + amount;
                        setButtonStart(start - 1);
                        setLimit(limit - 1);
                        console.log("newstart: " + newStart)
                        console.log("button clicked: " + e.target.value);
                        setStart(newStart);
                        setEnd(newEnd);
                    }
                }>prev</button>
            </div>;
            divs.push(div);
        }

        for (let i = buttonStart; i <= limit; i++) {

            let div = <div>
                <button className="button-buttons" onClick={
                    (e) => {

                        const newEnd = e.target.value + amount;
                        const newStart = e.target.value
                        setButtonStart(e.target.value);
                        setLimit((parseInt(e.target.value) + 9));
                        console.log("newstart: " + newStart)
                        console.log("button clicked: " + e.target.value);
                        setStart(newStart);
                        setEnd(newEnd);
                        setCurrent(newStart);
                    }
                } value={i}>{i}</button>
            </div>;

            divs.push(div);
        }


        if (end <= amount) {
            let div = <div>
                <button className="button-buttons"  onClick={
                    (e) => {

                        const newEnd = e.target.value * amount;
                        const newStart = newEnd - amount;
                        setLimit(end+10);
                        setButtonStart(end + 1);
                        console.log("newstart: " + newStart)
                        console.log("button clicked: " + e.target.value);
                        setStart(newStart);
                        setEnd(newEnd);
                    }
                } value="next">next</button>
            </div>;
            divs.push(div);
        }


        setButtons(divs);
    }

    useEffect(() => {
        const buttons = async () => {
            await createButtons();
        }
        buttons();
    }, [start])


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
                                // <div className="button-buttons" value={i + 1} key={key} >
                                //     <button value={i + 1} onClick={
                                //         (e) => {

                                //             const newEnd = e.target.value * amount;
                                //             const newStart = newEnd - amount;


                                //             console.log("newstart: " + newStart)
                                //             console.log("button clicked: " + e.target.value);
                                //             setStart(newStart);
                                //             setEnd(newEnd);
                                //         }
                                //     }>
                                //         {i + 1}
                                // </button>
                                // </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default PageButtons;