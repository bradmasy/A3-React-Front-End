import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ImageContainer.css"


const ImageContainer = ({ selection }) => {

    const [imgs, setImgs] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    let images;
    const login = async () => {
        const MY_API = "http://localhost:5000/api/v1/login";
        const userData = {
            username: "keannu",
            password: "1234"
        }

        const headers = {
            "Content-Type": "application/json",
        }

        const loginResponse = await axios.post(MY_API, userData, headers);
        const tokens = loginResponse.data.authorization.split(" ");
        const access = tokens[1];
        const refresh = tokens[3];
        setAccessToken(access);
        setRefreshToken(refresh);
        console.log(access);
        console.log(refresh);
    };

    const fetchImgs = async () => {
        const API_CALL = "http://localhost:5000/api/v1/pokemon-img";
        console.log("access " + accessToken);
        const headers = {
            "authorization": `Bearer ${accessToken} Refresh ${refreshToken}`,
            "Content-Type": "application/json"
        }
        const response = await axios.get(API_CALL, { headers });
        console.log(response);
        const imgPaths = response.data["image-paths"];
        console.log(imgPaths)
        setImgs(imgPaths);
    }


    useEffect(() => {
        const loginAndGetImages = async () => {
            await login();
            //await fetchImgs(); 
        };

        loginAndGetImages();
    }, [])

    useEffect(() => {
        const getImgUrls = async () => {
            await fetchImgs();

        }
        getImgUrls();
    }, [accessToken]) // when access token gets updated this will get called.


    const createImgDivs = async () => {
        let divs = [];
        for (let i = 0; i < imgs.length; i++) {
            let div =
                <div key={imgs[i]}>
                    <label>{i}</label>
                    <img src={imgs[i]}>
                    </img>
                </div>;
            divs.push(div);
            console.log(div);
        }
        return divs;
    }

    // useEffect(() => {
    //     const renderImgContainer = async () => {
    //         images = await createImgDivs();

    //     }

    //     renderImgContainer();
    // }, [imgs]);

    // login();
    // fetchImgs();

    // {imgs.map( (url, i) =>{
    //     //  console.log("URL:" + url);
    //       <div className="poke-img-container">
    //           <img src={url}>
    //           </img>
    //       </div>
    //   })}

    return (



        <div id="imgs-container">
            {
                imgs.map((img, index) => {
                    return (
                        <div key={img}>
                            <label>{}</label>
                            <img src={img}>
                            </img>
                        </div>
                    )

                })
            }


        </div>)


}


export default ImageContainer;