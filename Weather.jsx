import axios from "axios";
import { useState } from "react";

export function Weather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = 'ef17ac680567644c8aa4b4e595b72e78';

    const [city, setcity] = useState('')
    const [weather, setweather] = useState({ name: '', main: { temp: 0 }, weather: [{ description: '' }] });

    function inputsection(e) {
        setcity(e.target.value)
    }
    function searchclick() {
        axios.get(url, {
            params: {
                q: city,
                appid: api_key,
                units: 'metric'
            }
        })
            .then(Response => {
                setweather(Response.data)
                console.log(Response.data)
            })

    }
    return (
        <div className="container-fluid">
            <div className="mt-5 d-flex justify-content-center">
                <div className="w-50">
                    <div className="input-group justify-content-center">
                        <input type="text" onChange={inputsection} placeholder="Enter Your City Name" className="form-control" />
                        <button onClick={searchclick} className="bi bi-search btn btn-danger"></button>
                    </div>
                    <div style={{ marginTop: '50px', border: '2px solid black', padding: '30px', boxShadow: '5px 5px 5px grey', textAlign: 'center',backgroundImage:`url(${(weather.weather[0].description==='clear sky')?'Clear-Sky.jpg':'Haze-2.jpg'})`,color:"yellow",backgroundSize:"cover" }}>
                        <h2>{weather.name}-{weather.weather[0].description.toUpperCase()}</h2>
                        <p className="fs-4">{Math.round(weather.main.temp)} &deg; C  <span className="bi bi-sun"></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}