import { useEffect, useState } from 'react';
import './styles.css'
import logo from "../../assets/olassi.svg"
import Forecast from '../forecast';
import Week from '../week';
import sun from '../../assets/tiempo/sol.svg'
import rain from '../../assets/tiempo/lluvia.svg'
import mist from '../../assets/tiempo/niebla.svg'
import snow from '../../assets/tiempo/nieve.svg'
import oneCloud from '../../assets/tiempo/nube.svg'
import twoCloud from '../../assets/tiempo/dosnubes.svg'
import storm from '../../assets/tiempo/tormenta.svg'
import sunCloud from '../../assets/tiempo/nubesol.svg'
import { Form } from 'react-bootstrap';

const parseTemperature = (kelvin, type) => type === 'C'
    ? Math.round(kelvin - 273.15)
    : Math.round(((kelvin - 273.15) * 1.8) + 32);

function Cards({ geoCode }) {

    const [cities, setCities] = useState({})
    const [temperature, setTemperature] = useState({})
    const [weatherIcon, setWeatherIcon] = useState(null)

    const REACT_API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        if (geoCode[0]) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoCode[0]?.lat}&lon=${geoCode[0]?.lon}&exclude=hourly,daily&appid=${REACT_API_KEY}`)


                .then(res => res.json())
                .then(data => {
                    setCities(data);

                    const { current } = data;
                    setTemperature(prev => ({
                        ...prev,
                        value: current.temp,
                        type: 'C'
                    }))

                    setWeatherIcon(current?.weather[0]?.icon)
                })
        }
    }, [geoCode])

    let date = new Date()
    const today = [date.getDate(), " ", date.getMonth() + 1, " ", date.getFullYear()];

    const getImageWeather = () => {
        switch (weatherIcon) {
            case "01d":
                return sun;
            case "01n":
                return sun;
            case "02d":
                return sunCloud;
            case "02n":
                return sunCloud;
            case "03d":
                return oneCloud;
            case "03n":
                return oneCloud;
            case "04d":
                return twoCloud;
            case "04n":
                return twoCloud;
            case "09d":
                return rain;
            case "09n":
                return rain;
            case "10d":
                return rain;
            case "10n":
                return rain;
            case "11d":
                return storm;
            case "11n":
                return storm;
            case "13d":
                return snow;
            case "13n":
                return snow;
            case "50d":
                return mist;
            case "50n":
                return mist;

            default:
                return sun;

        }
    }

    const handleChangeTemperature = (e) => {
        const value = e.target.checked;
        const type = value ? 'F' : 'C'

        setTemperature(prev => ({
            ...prev,
            type
        }))
    }

    return (

        <>
            <div className='maincomp'>
                <div className='col tempydatos'>
                    <div style={{ width: 558, height: 500 }}>
                        <p className='title'>{geoCode[0]?.name}</p>
                        <p className='today'>{today}</p>
                        <div className='weather-temperature'>

                            <img style={{ width: 200 }} src={getImageWeather()} alt="" />
                            {/* <img style={{ width: 400 }} src={iconWeather} alt="" /> */}

                            <div className='celsius-farenheit'>
                                <p>{parseTemperature(temperature.value, temperature.type)}º{temperature.type}</p>
                                <div className='d-flex text-light'>
                                    <span className='me-2'>ºC</span>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        checked={temperature.type === 'F'}
                                        onChange={handleChangeTemperature}
                                    />
                                    <span className='ms-1'>ºF</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <img style={{ width: 476 }} className='logo' src={logo} alt="" />
                </div>
            </div>
            <div>
                <div className='row justify-content-center'>
                    <Forecast cities={cities} geoCode={geoCode}></Forecast>
                </div>
                <div className='row justify-content-center'>
                    <Week cities={cities}></Week>
                </div>
            </div>
        </>
    )
}

export default Cards;