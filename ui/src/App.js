import './App.css';
import {useEffect, useState} from "react";
import {Avatar, Button} from "@mui/material";
import Cookies from "js-cookie"

function App() {

    const [authenticated,setAuthenticated] = useState(false);

    const [data,setData] = useState({
        text : '',
        picture : ''
    });

    const getMessage = () => {
        fetch("http://localhost:8080/hello",{
            credentials : "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
                setAuthenticated(true);
            })
    }

    const logout = () => {
        fetch("http://localhost:8080/logout",{
            method : 'POST',
            credentials : "include",
            headers : {
                "X-XSRF-TOKEN" : Cookies.get("XSRF-TOKEN")
            }
        })
        window.location.replace("/");
        setAuthenticated(false);
    }


  return (
    <div className="App">
        <div className="main">
            <Button variant="contained" onClick={getMessage}>Get Data</Button>
            <h2>Text from back end : <span className="text">{data.text} </span> </h2>
            <img src={data.picture} />
        </div>
        {!authenticated && (
            <div>
                <br />
                <Button href="http://localhost:8080/oauth2/authorization/google">Login using google</Button>
            </div>

        )}
        {authenticated && (
            <div>
                <br />
                <Button onClick={logout}>Logout</Button>
            </div>
        )}
    </div>
  );
}

export default App;
