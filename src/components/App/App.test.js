import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import defaultValues from '../../constants/defaultValues';
import dataSamples from '../../constants/dataSamples';
import App from './App';
import WeatherForecasts from '../WeatherForecasts';
import SearchBox from '../SearchBox';
import ErrorFallback from '../ErrorFallback';

const mock = new MockAdapter(axios);

it('should render correctly', async () => {
  const { findByQueryRequest, findByQueryResponse, findByWoeidResponse } = dataSamples.API[0];

  mock
    .onGet(api.getLocationsByQuery(findByQueryRequest.title))
    .reply(200, findByQueryResponse);

  mock
    .onGet(api.getLocationByWoeid(findByQueryResponse[0].woeid))
    .reply(200, findByWoeidResponse);

  let component;
  await act(async () => {
    component = mount(<App />);
  });
  component.update();

  expect(component.find(WeatherForecasts)).toHaveLength(1);
  expect(component.find(WeatherForecasts).prop('forecasts')).toEqual(findByWoeidResponse.consolidated_weather);
  expect(component.find(WeatherForecasts).prop('isLoading')).toBe(false);

  expect(component.find(SearchBox)).toHaveLength(1);
  expect(component.find(SearchBox).prop('defaultValue')).toEqual(defaultValues.DEFAULT_OPTION);

  expect(component.find(ErrorFallback)).toHaveLength(0);
});

it('should trigger handleChange event', async () => {
  const { findByQueryRequest, findByQueryResponse, findByWoeidResponse } = dataSamples.API[1];

  mock
    .onGet(api.getLocationsByQuery(findByQueryRequest.title))
    .reply(200, findByQueryResponse);

  mock
    .onGet(api.getLocationByWoeid(findByQueryResponse[0].woeid))
    .reply(200, findByWoeidResponse);

  let component;
  await act(async () => {
    component = mount(<App />);
  });
  component.update();

  await act(async () => {
    component.find(SearchBox).prop('onChange')({ value: 'London', label: 'London' });
  });
  component.update();
  expect(component.find(WeatherForecasts).prop('forecasts')).toEqual(findByWoeidResponse.consolidated_weather);
  expect(component.find(WeatherForecasts).prop('isLoading')).toBe(false);

  await act(async () => {
    component.find(SearchBox).prop('onChange')();
  });
  component.update();

  await act(async () => {
    component.find(SearchBox).prop('onChange')({ value: 'Wrong Location', label: 'Wrong Location' });
  });
  component.update();
});
