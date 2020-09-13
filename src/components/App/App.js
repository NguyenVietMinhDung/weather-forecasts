/* eslint react-hooks/exhaustive-deps: 'off' */
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import defaultValues from '../../constants/defaultValues';
import locations from '../../constants/locations';
import api from '../../api';
import SearchBox from '../SearchBox';
import WeatherForecasts from '../WeatherForecasts';
import ErrorFallback from '../ErrorFallback';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [forecasts, setForecasts] = useState([]);

  const findByWoeid = (woeid) => (
    axios
      .get(api.getLocationByWoeid(woeid))
      .then((res) => res.data)
      .catch(() => setIsError(true))
  );

  const findByName = (name) => (
    axios
      .get(api.getLocationsByQuery(name))
      .then((res) => res.data[0])
      .catch(() => setIsError(true))
  );

  const fetchWeatherForecasts = (name) => {
    setIsLoading(true);
    findByName(name)
      .then((value) => findByWoeid(value.woeid))
      .then((value) => {
        setForecasts(value.consolidated_weather.slice(0, 5));
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  };

  useEffect(() => {
    fetchWeatherForecasts(defaultValues.DEFAULT_LOCATION);
  }, []);

  const handleChange = (selectedOption) => {
    if (!selectedOption) {
      return;
    }
    fetchWeatherForecasts(selectedOption.value);
  };

  return (
    <Container className="app">
      {isError ? (
        <ErrorFallback />
      ) : (
        <>
          <SearchBox
            inputId="location"
            defaultValue={defaultValues.DEFAULT_OPTION}
            options={locations}
            onChange={handleChange}
          />
          <WeatherForecasts
            isLoading={isLoading}
            forecasts={forecasts}
            getIcon={api.getIcon}
          />
        </>
      )}
    </Container>
  );
}

export default App;
