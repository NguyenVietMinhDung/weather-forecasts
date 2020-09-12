import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import WeatherForecasts from './WeatherForecasts';

const DATA_SAMPLE = [
  {
    id: 547,
    weather_state_name: 'Light Cloud',
    weather_state_abbr: 'lc',
    applicable_date: '2020-09-13',
    min_temp: 14.0,
    max_temp: 24.9,
  },
];

it('renders successfully', async () => {
  let component;

  await act(async () => {
    component = mount(
      <WeatherForecasts
        isLoading={false}
        getIcon={jest.fn()}
        forecasts={DATA_SAMPLE}
      />,
    );
  });

  expect(component.find('.card-deck')).toHaveLength(1);
});

it('renders unsuccessfully', async () => {
  let component;

  await act(async () => {
    component = mount(
      <WeatherForecasts
        isLoading
        getIcon={jest.fn()}
        forecasts={DATA_SAMPLE}
      />,
    );
  });

  expect(component.find('.card-deck')).toHaveLength(0);
});
