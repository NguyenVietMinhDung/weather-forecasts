import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import WeatherForecasts from './WeatherForecasts';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders successfully', () => {
  act(() => {
    render(
      <WeatherForecasts
        isLoading={false}
        getIcon={jest.fn()}
        forecasts={[
          {
            id: 547,
            weather_state_name: 'Light Cloud',
            weather_state_abbr: 'lc',
            applicable_date: '2020-09-13',
            min_temp: 14.0,
            max_temp: 24.9,
          },
        ]}
      />,
      container,
    );
  });

  expect(container.querySelector('.card-deck')).toBeInTheDocument();
});

it('renders unsuccessfully', () => {
  act(() => {
    render(
      <WeatherForecasts
        isLoading
        getIcon={jest.fn()}
        forecasts={[
          {
            id: 547,
            weather_state_name: 'Light Cloud',
            weather_state_abbr: 'lc',
            applicable_date: '2020-09-13',
            min_temp: 14.0,
            max_temp: 24.9,
          },
        ]}
      />,
      container,
    );
  });

  expect(container.querySelector('.card-deck')).not.toBeInTheDocument();
});
