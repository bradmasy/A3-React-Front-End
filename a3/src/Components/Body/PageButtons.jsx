import React, { useEffect } from "react"
import { useState } from "react"

import "./PageButtons.css"

const PageButtons = ({start,end, nButtons }) => {

    const [buttons, setButtons] = useState([]);

    const createButtons = async () => {

        let divs = [];
        console.log(start);
        console.log(end);
        
        for (let i = start; i < end; i++) {
            let div = <div>
                <button class="page-buttons" value={i} onClick={(e) => {

                }}>
                    {i}
                </button>
            </div>;
            divs.push(div);
        }

        // condition for next or back here...
        divs.push(
            <div>
                <button>next</button>
            </div>
        );

        setButtons(divs);
    }

    useEffect(() => {
        const buttons = async () => {
            await createButtons();
        }
        buttons();
    }, [])


    return (
        <div id="button-paging">
            {
                buttons.map((button, i) => {
                    return (
                        <div key={button}>
                            <button>
                                {i + 1}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PageButtons;