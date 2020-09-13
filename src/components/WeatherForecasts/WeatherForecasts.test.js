import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import dataSamples from '../../constants/dataSamples';
import WeatherForecasts from './WeatherForecasts';

const { findByWoeidResponse } = dataSamples.API[0];

it('should render correctly', async () => {
  let component;

  await act(async () => {
    component = mount(
      <WeatherForecasts
        isLoading={false}
        getIcon={jest.fn()}
        forecasts={findByWoeidResponse.consolidated_weather}
      />,
    );
  });

  expect(component.find('.card-deck')).toHaveLength(1);
});

it('should show loading icon', async () => {
  let component;

  await act(async () => {
    component = mount(
      <WeatherForecasts
        isLoading
        getIcon={jest.fn()}
        forecasts={findByWoeidResponse.consolidated_weather}
      />,
    );
  });

  expect(component.find('.card-deck')).toHaveLength(0);
});
