/* eslint react-hooks/exhaustive-deps: 'off' */
import React, { useState, useEffect } from 'react';
import { geolocated, geoPropTypes } from 'react-geolocated';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import locations from '../../locations';
import api from '../../api';
import SearchBox from '../SearchBox';
import WeatherForecasts from '../WeatherForecasts';

function App(props) {
  let defaultValue = {
    value: 'Ho Chi Minh City',
    label: 'Ho Chi Minh City',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [forecasts, setForecasts] = useState([]);

  const fetchLocationInfoByWoeid = (woeid) => (
    axios
      .get(api.getLocationInfo(woeid))
      .then((res) => res.data)
  );

  const fetchLocationByName = (locationName) => (
    axios
      .get(api.getLocationsByQuery(locationName))
      .then((res) => res.data[0])
  );

  const getWeatherForecast = (locationName) => (
    fetchLocationByName(locationName)
      .then((value) => fetchLocationInfoByWoeid(value.woeid))
      .then((value) => {
        setForecasts(value.consolidated_weather.slice(0, 5));
        setIsLoading(false);
      })
  );

  useEffect(() => {
    const { coords } = props;
    if (coords) {
      axios
        .get(api.getLocationsByCoords(coords.latitude, coords.longitude))
        .then((res) => {
          getWeatherForecast(res.data[0].title);
          defaultValue = {
            value: res.data[0].title,
            label: res.data[0].title,
          };
        });
    } else {
      getWeatherForecast(defaultValue.value);
    }
  }, [props]);

  const handleChange = (selectedOption) => {
    setIsLoading(true);
    getWeatherForecast(selectedOption.value);
  };

  return (
    <Container className="app">
      <SearchBox
        inputId="location"
        defaultValue={defaultValue}
        options={locations}
        onChange={handleChange}
      />
      <WeatherForecasts
        isLoading={isLoading}
        forecasts={forecasts}
        getIcon={api.getIcon}
      />
    </Container>
  );
}

App.propTypes = { ...App.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
})(App);
