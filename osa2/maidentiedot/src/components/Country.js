import axios from "axios";
import { useState, useEffect } from "react";

const Country = ({ filteredCountries }) => {
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${filteredCountries.capitalInfo.latlng[0]}&lon=${filteredCountries.capitalInfo.latlng[1]}&appid=6efe524091801a72439fc46ae445a5fd`
      )
      .then((response) => {
        setTemp(response.data.main.temp);
        setIcon(
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
        );
        setWind(response.data.wind.speed);
      });
  }, []);

  return (
    <div>
      <h1>{filteredCountries.name.official}</h1>
      capital {filteredCountries.capital}
      <br />
      area {filteredCountries.area}
      <br />
      languages:
      <ul>
        {Object.values(filteredCountries.languages).map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <img src={filteredCountries.flags.png} />
      <h2>Weather in {filteredCountries.capital}</h2>
      <p>temperature {temp} F</p>
      <img src={icon} />
      <p>wind {wind} m/s</p>
    </div>
  );
};

export default Country;
